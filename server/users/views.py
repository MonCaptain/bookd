from django.contrib.auth import get_user_model
from django.apps import apps
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from books.serializers import PublicProfileSerializer
from .serializers import UserSerializer


User = get_user_model()
Profile = apps.get_model('books', 'Profile')


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

        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password
        )

        Profile.objects.create(user=user)

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


class RetrieveUserProfiles(APIView):
    """
    Retrieves all user profiles
    """

    def get(self, request):
        """
        Retrieves all user profiles
        """
        profiles = Profile.objects.all()
        serializer = PublicProfileSerializer(profiles, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class EditPrivacy(APIView):
    """
    Edits the privacy of a user profile
    """

    def post(self, request, username):
        """
        Handles a POST request for editing the privacy of a user profile
        """
        requester = request.user
        if requester.username != username:
            return Response(
                {'error': 'Only users who owns this profile can edit it'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = get_object_or_404(User, username=username)

        privacy = request.data['privacy']
        if privacy is None:
            return Response(
                {'error': 'Please provide a privacy setting'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not isinstance(privacy, bool):
            return Response(
                {'error': 'Privacy value should be a boolean'},
                status=status.HTTP_400_BAD_REQUEST
            )

        Profile.objects.filter(user=user).update(privacy=privacy)
        return Response(
            {'success': 'User profile privacy has been updated'},
            status=status.HTTP_200_OK
        )
