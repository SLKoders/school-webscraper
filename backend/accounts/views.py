from django.shortcuts import render, redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token

from .models import User
from .decorators import staff_required, sign_in_required
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
@permission_classes([AllowAny])
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
@permission_classes([AllowAny])
def sign_in(request):
    print(request.data)
    print('signin')
    if request.method == 'POST':
        form = SignInForm(request.data)
        
        if form.is_valid():
            email = request.data.get('email')
            password = request.data.get('password')
            
            user = authenticate(username=email, password=password)
            
            if user is not None:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({
                    'user': UserSerializer(user).data,
                    'token': token.key,
                })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def sign_out(request):
    logout(request)
    
    return Response({'message': 'Successfully signed out'}, status=status.HTTP_200_OK)

# @signin_required
@api_view(['GET'])
@staff_required
def get_user_by_id(request, id):
    user = User.objects.get(id=id)
    
    if user:
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    
    return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@staff_required
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@sign_in_required
def get_current_user(request):
    return Response({
        'isAuthenticated': True,
        'user': UserSerializer(request.user).data})
    
@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf(request):
    from django.middleware.csrf import get_token
    
    return Response({'csrfToken': get_token(request)})