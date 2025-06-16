from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import UserCreationForm
from .models import User

class SignUpForm(UserCreationForm):
    
    class Meta:
        model = User
        fields = ('email', 'password1', 'password2')
        
class SignInForm(forms.Form):
    class Meta:
        model = User,
        fields = ('email', 'password')