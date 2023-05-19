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
            'datetime_added',
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
            'profile',
        )


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for public profiles
    """

    user = UserSerializer(read_only=True)
    favorite_book = BookSerializer(required=False)
    book_list = BookEntrySerializer(
        source='bookentry_set', many=True, read_only=True)
    collections = CollectionSerializer(many=True)

    private = serializers.BooleanField(required=False)
    profile_picture = serializers.ImageField(
        max_length=None,
        use_url=True,
        required=False
    )

    class Meta:
        """
        Metadata class
        """
        model = Profile
        exclude = ('id',)

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.private = validated_data.get('private', instance.private)
        instance.profile_picture = validated_data.get(
            'profile_picture', instance.profile_picture)

        if validated_data.get('favorite_book'):
            print(validated_data['favorite_book'])
            favorite_book = Book.objects.filter(
                title=validated_data['favorite_book']['title'],
                author=validated_data['favorite_book']['author'],
                isbn=validated_data['favorite_book']['isbn'],
                cover_image=validated_data['favorite_book']['cover_image']
            ).first()
        else:
            favorite_book = None

        instance.favorite_book = favorite_book
        instance.save()
        return instance


class PrivateProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for private profiles
    """

    user = UserSerializer(read_only=True)
    private = serializers.BooleanField(required=False)
    favorite_book = serializers.IntegerField(required=False)
    profile_picture = serializers.ImageField(
        max_length=None,
        use_url=True,
        required=False
    )

    class Meta:
        """
        Metadata class
        """
        model = Profile
        fields = (
            'user',
            'private',
            'profile_picture',
        )
