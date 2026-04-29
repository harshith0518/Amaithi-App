from django.urls import path
from .views import ForgotPasswordView, RegisterUserView, LoginUserView, getUserDetailsView, ResetPasswordView


urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('check/', getUserDetailsView.as_view(), name='check-user'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
]