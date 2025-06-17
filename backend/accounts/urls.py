from django.urls import path

from . import views

urlpatterns = [
    path('signup', views.sign_up, name='signup'),
    path('signin', views.sign_in, name='signin'),
    path('signout', views.sign_out, name='signout'),
    path('users/<uuid:id>', views.get_user_by_id, name='get_user_by_id'),
    path('users', views.get_users, name='get_users'),
    path('me', views.get_current_user, name='get_current_user'),
]