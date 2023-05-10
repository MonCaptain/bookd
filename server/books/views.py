from django.contrib.auth import get_user_model
from django.apps import apps
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .models import Book, BookEntry
from .models import Collection
from .models import Profile

from .serializers import BookSerializer, BookEntrySerializer
from .serializers import CollectionSerializer
from .serializers import PublicProfileSerializer, PrivateProfileSerializer


User = get_user_model()
Profile = apps.get_model('books', 'Profile')


class ManageUserProfiles(APIView):
    """
    An API View class for retrieving user profile

    Methods
    -------
    get(request, username)
        Receives a GET request to retrieve a user profile
    """

    def get(self, request, username):
        """
        Handles a GET request to retrieve a user profile
        """
        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, user=user)

        if user_profile.private:
            serializer = PrivateProfileSerializer(user_profile)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        serializer = PublicProfileSerializer(user_profile)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def patch(self, request, username):
        """
        Handles a PATCH request to edit user profile
        """
        requester = request.user
        if requester.username != username:
            return Response(
                {'error': 'Only users who owns this profile can edit it'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, user=user)

        data = request.data

        private = data.get('private')
        favorite_book_id = data.get('favorite_book_id')

        if not (isinstance(private, bool) and isinstance(private, int)):
            return Response(
                {'error': 'There is an error parsing the private and favorite_book_id fields'},
                status=status.HTTP_400_BAD_REQUEST
            )

        favorite_book = Book.objects.get(id=favorite_book_id)

        if private is not None:
            user_profile.private = private
            user_profile.save()
        if favorite_book is not None:
            user_profile.favorite_book = favorite_book
            user_profile.save()

        return Response(status=status.HTTP_200_OK)


class ManageUserCollections(APIView):

    def get(self, request, username, **kwargs):
        pass


class ManageBooks(APIView):
    pass
