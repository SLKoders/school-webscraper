from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def staff_required(view_func):
    @wraps(view_func)
    @signin_required
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_staff:
            return Response(
                {"message": "Forbidden - Staff access required"},
                status=status.HTTP_403_FORBIDDEN
            )
        return view_func(request, *args, **kwargs)
    return _wrapped_view

def signin_required(view_func):
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(
                {"message": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )
        return view_func(request, *args, **kwargs)
    return _wrapped_view