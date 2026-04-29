from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError("Email is required")
        email=self.normalize_email(email)   
        user=self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)

        if (extra_fields.get('is_staff') or extra_fields.get('is_superuser')) is not True:
            raise ValueError("Superuser must have is_staff=True.")
        
        try:
            return self.create_user(email,password,**extra_fields)
        except Exception as e:
            raise ValueError(f"Error creating superuser with the given fields: {e}")