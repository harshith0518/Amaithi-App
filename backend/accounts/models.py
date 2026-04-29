from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin
from .manager import UserManager
from .choices import SexChoices, MaritalStatusChoices
from datetime import date
from django.core.validators import MaxValueValidator, RegexValidator
from django.utils import timezone
import pyotp


OTP_EXPIRY_TIME = 300  # in seconds

username_validator = RegexValidator(
    regex=r'^[a-z0-9_]+$',
    message="Username can only contain lower letters, numbers, and underscores."
)
phone_validator = RegexValidator(
    regex=r'^\+\d{1,4}-\d{7,15}$',
    message="Phone number must be in format +<code>-<number>"
)


class User(AbstractBaseUser,PermissionsMixin):
    # note that password field is inherited from AbstractBaseUser, so we don't need to define it here
    # also it is under the one way hashing => we cant retrieve the original password, we can only verify it using the check_password(comparing_password_string:string) method provided by AbstractBaseUser
    
    email = models.EmailField(unique=True,db_index=True)
    user_name = models.CharField(max_length=30,unique=True,db_index=True, validators=[username_validator])
    first_name = models.CharField(max_length=255)
    middle_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255)
    
    phone_number = models.CharField(max_length=20, blank=True, null=True, validators=[phone_validator]) # [+code]-[number] e.g, +91-9876543210
    sex = models.CharField(max_length=1, choices=SexChoices.choices, blank=True, null=True)
    marital_status = models.CharField(max_length=1, choices=MaritalStatusChoices.choices, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    
    about = models.TextField(blank=True, null=True, max_length=500)
    
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  
    
    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['email']
    objects = UserManager()

    def __str__(self):
        return self.email or self.user_name
    
    def get_full_name(self):
        return " ".join(filter(None, [self.first_name, self.middle_name, self.last_name])) or self.email
    
    def get_age(self):
        if not self.dob: 
            return None

        today = date.today()
        return today.year - self.dob.year - (
            (today.month, today.day) < (self.dob.month, self.dob.day)
        )


class PasswordResetOTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    secret = models.CharField(max_length=32)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)
    attempts = models.IntegerField(default=0,validators=[MaxValueValidator(3)])
    # totp is Time-based One Time Password
    
    def generate_otp(self):
        totp = pyotp.TOTP(self.secret, interval=OTP_EXPIRY_TIME)
        return totp.now()

    def verify_otp(self, otp):
        totp = pyotp.TOTP(self.secret, interval=OTP_EXPIRY_TIME)
        return totp.verify(otp, valid_window=1)