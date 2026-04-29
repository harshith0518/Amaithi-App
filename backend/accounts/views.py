from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterUserSerializer,LoginUserSerializer,ForgotPasswordSerializer,ResetPasswordSerializer


class getUserDetailsView(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            user_data = {
                "email": user.email,
                "user_name": user.user_name,
                "first_name": user.first_name,
                "middle_name": user.middle_name,
                "last_name": user.last_name,
                "dob": user.dob,
                "phone_number": user.phone_number,
                "password": user.password,
            }
            return Response(user_data, status=status.HTTP_200_OK)
        return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
    
    def post(self, request):
        data = request.data
        return Response({"message": "POST request received", "data": data}, status=status.HTTP_200_OK)



class RegisterUserView(APIView):
    permission_classes = [] # Allow any user (authenticated or not) to access this view
    authentication_classes = [] # Disable authentication for this view since it's for registration
    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user_data = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    permission_classes = [] # Allow any user (authenticated or not) to access this view
    authentication_classes = [] # Disable authentication for this view since it's for login
    def post(self, request):
        serializer = LoginUserSerializer(
            data=request.data,
            context={'request': request}
        )
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)

        if serializer.is_valid():
            response = serializer.save()
            return Response(response, status=200)

        return Response(serializer.errors, status=400)


class ResetPasswordView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)

        if serializer.is_valid():
            response = serializer.save()
            return Response(response, status=200)

        return Response(serializer.errors, status=400)