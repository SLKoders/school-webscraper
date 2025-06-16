from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .forms import SignUpForm, SignInForm
from .serializers import SignInSerializer, UserSerializer, SignUpSerializer

@swagger_auto_schema(
    method='post',
    request_body=SignUpSerializer,
    responses={
        201: UserSerializer,
        400: openapi.Response('Bad Request', openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'field_name': openapi.Schema(type=openapi.TYPE_STRING, description='Error description'),
                # Add other fields as needed
            }
        ))
    },
    operation_description="User sign up endpoint"
)
@api_view(['POST'])
def sign_up(request):
    if request.method == "POST":
        form = SignUpForm(request.data)
        
        if form.is_valid():
            user = form.save()
            login(request, user)
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
    
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='post',
    request_body=SignInSerializer,
    responses={
        201: UserSerializer,
        400: openapi.Response('Bad Request', openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'field_name': openapi.Schema(type=openapi.TYPE_STRING, description='Error description'),
                # Add other fields as needed
            }
        ))
    },
    operation_description="User sign up endpoint"
) 
@api_view(['POST'])
def sign_in(request):
    print(request.data)
    if request.method == 'POST':
        form = SignInForm(request.data)
        
        if form.is_valid():
            email = request.data.get('email')
            password = request.data.get('password')
            
            user = authenticate(username=email, password=password)
            
            if user is not None:
                login(request, user)
                return Response(UserSerializer(user).data)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)