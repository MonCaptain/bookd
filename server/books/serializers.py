from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Book, BookEntry
from .models import Collection
from .models import Profile


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for general user type
    """
    class Meta:
        """
        Fields
        ------
        model : django Model
            User model
        fields : tuple[str]
            Tuple of every field to be serialized
        """
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
        )


class BookSerializer(serializers.ModelSerializer):
    """
    Serializer for Book model
    """
    class Meta:
        """
        Metadata class
        """
        model = Book
        fields = '__all__'


class BookEntrySerializer(serializers.ModelSerializer):
    """
    Serializer for Book Entry model
    """

    book = BookSerializer()

    class Meta:
        """
        Metadata class
        """
        model = BookEntry
        exclude = (
            'profile',
            'datetime_added'
        )


class CollectionSerializer(serializers.ModelSerializer):
    """
    Serializer for Collection model
    """

    books = BookSerializer(many=True)

    class Meta:
        """
        Metadata class
        """
        model = Collection
        exclude = (
            'profile'
        )


class PublicProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for public profiles
    """

    user = UserSerializer()
    favorite_book = BookSerializer()
    book_list = BookEntrySerializer(many=True)

    class Meta:
        """
        Metadata class
        """
        model = Profile
        fields = '__all__'


class PrivateProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for private profiles
    """

    user = UserSerializer()

    class Meta:
        """
        Metadata class
        """
        model = Profile
        fields = (
            'user',
            'private',
        )
