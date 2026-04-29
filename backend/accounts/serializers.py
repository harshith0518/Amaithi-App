from django.db import IntegrityError
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from django.contrib.auth import authenticate, get_user_model 
from django.core.exceptions import ValidationError as DjangoValidationError 
from django.core.validators import validate_email 
from rest_framework_simplejwt.tokens import RefreshToken 
from .models import PasswordResetOTP
from external_services.utils import send_mail_through_django
import pyotp


User = get_user_model() # [or] from .models import User

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email', 'user_name', 'password',
            'first_name', 'middle_name', 'last_name',
            'dob', 'phone_number',
            'sex', 'marital_status'
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        value = value.lower().strip()
        try:
            validate_email(value)
        except DjangoValidationError:
            raise ValidationError("Invalid email format")
        if User.objects.filter(email__iexact=value).exists():
            raise ValidationError("Email already exists")
        return value

    def validate_user_name(self, value):
        value = value.strip().lower()
        if User.objects.filter(user_name__iexact=value).exists():
            raise ValidationError("Username already exists")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise ValidationError("Password must be at least 8 characters long")
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data['email'] = validated_data['email'].lower()
        validated_data['user_name'] = validated_data['user_name'].lower()

        try:
            user = User(**validated_data)
            user.set_password(password)
            user.save()
        except IntegrityError:
            raise ValidationError("User with this email or username already exists")

        refresh = RefreshToken.for_user(user)
        user.access_token = str(refresh.access_token)
        user.refresh_token = str(refresh)

        return user

    def to_representation(self, user_instance):
        return {
            "access": user_instance.access_token,
            "refresh": user_instance.refresh_token,
            "user": {
                "email": user_instance.email,
                "username": user_instance.user_name
            }
        }


class LoginUserSerializer(serializers.Serializer):
    user_identifier_key = serializers.CharField(required=True) # the new field that can accept either email or username
    password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        identifier = attrs.get("user_identifier_key")
        password = attrs.get("password")

        if not identifier or not password:
            raise ValidationError("Username/email and password are required")
        elif '@' in identifier:
            try:
                user_obj = User.objects.get(email__iexact=identifier)
                username = user_obj.user_name
            except User.DoesNotExist:
                raise ValidationError("Invalid credentials")
        else:
            username = identifier.lower()

        user = authenticate(
            request=self.context.get('request'),
            username=username,
            password=password
        )

        if not user:
            raise ValidationError("Invalid credentials")
        elif not user.is_active:
            raise ValidationError("User account is disabled")
        
        refresh = RefreshToken.for_user(user)
        user.access_token = str(refresh.access_token)
        user.refresh_token = str(refresh)
        
        return user
    
    def to_representation(self, user_instance):
        return {
            "access": user_instance.access_token,
            "refresh": user_instance.refresh_token,
            "user": {
                "email": user_instance.email,
                "username": user_instance.user_name
            }
        }



class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        data['email'] = data['email'].lower()
        return data

    def save(self):
        email = self.validated_data['email']
        try:
            user = User.objects.get(email__iexact=email)
            PasswordResetOTP.objects.filter(user=user, is_used=False).update(is_used=True)
            secret = pyotp.random_base32()
            otp_obj = PasswordResetOTP.objects.create(
                user=user,
                secret=secret
            )
            otp = otp_obj.generate_otp()

            send_mail_through_django(
                subject="Password Reset OTP",
                message=f"Your OTP is {otp}. Valid for 5 minutes.",
                recipient_list=[email],
            )

        except User.DoesNotExist:
            pass

        return {"message": "If email exists, OTP sent"}


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        data['email'] = data['email'].lower()
        return data

    def save(self):
        email = self.validated_data['email']
        otp_input = self.validated_data['otp']
        new_password = self.validated_data['new_password']

        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            raise ValidationError("Invalid email or OTP")

        otp_obj = (
            PasswordResetOTP.objects
            .filter(user=user, is_used=False)
            .order_by('-created_at')
            .first()
        )

        if not otp_obj:
            raise ValidationError("Invalid or expired OTP")

        if otp_obj.attempts >= 3:
            otp_obj.is_used = True
            otp_obj.save()
            raise ValidationError("Too many attempts. Request a new OTP")

        if not otp_obj.verify_otp(otp_input):
            otp_obj.attempts += 1
            otp_obj.save()
            raise ValidationError("Invalid OTP")

        otp_obj.is_used = True
        otp_obj.save()

        user.set_password(new_password)
        user.save()

        return {"message": "Password reset successful"}