from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer


User = get_user_model()


class RegisterUser(APIView):
    """
    An API View class for registering a UserAccount.

    Attributes
    ----------
    permission_classes : tuple
        Different permission classes that can access the APIView

    Methods
    -------
    post(request)
        Receives a POST request to register a user
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """
        Receives a POST request to register a user
        """

        data = request.data

        # Form Details
        username = data.get('username')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        password = data.get('password')
        re_password = data.get('password')

        if not (username and first_name and last_name and password and re_password):
            return Response(
                {'error': 'There are missing fields in your request'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if password != re_password:
            return Response(
                {'error': 'Passwords do not match'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {'error': 'User with this username already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )

        User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password
        )

        return Response(
            {'success': 'User account created successfully'},
            status=status.HTTP_201_CREATED
        )


class LogoutUser(APIView):
    """
    An API View class for logging out a UserAccount.

    Methods
    -------
    post(request)
        Handles a POST request to logout a user
    """

    def post(self, request):
        """
        Handles a POST request to logout a user
        """
        try:
            refresh_token = request.data['refresh']
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {'success': 'User has been logged out'},
                status=status.HTTP_205_RESET_CONTENT
            )
        except Exception:
            return Response({'error': 'Bad request'}, status=status.HTTP_400_BAD_REQUEST)


class RetrieveCurrentUser(APIView):
    """
    Retrieves the current user details
    """

    def get(self, request):
        """
        Retrieves the current user details and will serialize by their user type
        """
        user = request.user

        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)
