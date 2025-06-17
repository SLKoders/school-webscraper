from typing import Any, Optional, Self
import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager['User']):  # Note the generic type
    def create_superuser(self, email: str, password: Optional[str] = None, **extra_fields: Any) -> 'User':
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
            
        return self._create_user(email, password, **extra_fields)

    def _create_user(self, email: str, password: Optional[str], **extra_fields: Any) -> 'User':
        if not email:
            raise ValueError('The Email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        unique=True
    )
    
    username = None
    email = models.EmailField(unique=True)  # Ensure emails are unique
    # is_admin = models.BooleanField(default=False) use if staff
    
    USERNAME_FIELD = 'email'  # Use email as the login field
    REQUIRED_FIELDS = []      # Remove username from required fields
    
    objects = UserManager() # type: ignore
    
    def __str__(self):
        return self.email