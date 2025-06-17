import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

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
    
    USERNAME_FIELD = 'email'  # Use email as the login field
    REQUIRED_FIELDS = []      # Remove username from required fields
    
    def __str__(self):
        return self.email