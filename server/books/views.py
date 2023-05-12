from django.contrib.auth import get_user_model
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


class ManageUserProfiles(APIView):
    """
    An API View class for managing user profiles

    Methods
    -------
    get
        Retrieve a user profile
    patch
        Edit a user profile
    """

    def get(self, request, username):
        """
        Handles a GET request to retrieve a user profile
        """
        requester = request.user
        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, user=user)

        if requester.username == username or not user_profile.private:
            serializer = PublicProfileSerializer(user_profile)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        serializer = PrivateProfileSerializer(user_profile)
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


class ManageUserBookEntries(APIView):
    """
    An API View class for managing book entries

    Methods
    -------
    get
        Retrieve book entries from a user
    post
        Create a new book entry
    """

    def get(self, request, username):
        """
        Handles a GET request to retrieve a book entry
        """
        requester = request.user
        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, user=user)

        if not user_profile.private or requester.username == username:
            book_list = user_profile.book_list.all()
            serializer = BookEntrySerializer(book_list, many=True)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        return Response(
            {'Detail': 'This profile is private'},
            status=status.HTTP_403_FORBIDDEN
        )

    def post(self, request, username):
        """
        Handle a POST request to create a new book entry
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

        book_id = data.get('book_id')

        if not book_id:
            return Response(
                {'error': 'Please enter the book_id'},
                status=status.HTTP_400_BAD_REQUEST
            )

        book = get_object_or_404(Book, id=book_id)
        book_entry = BookEntry.objects.create(
            book=book,
            profile=user_profile
        )

        serializer = BookEntrySerializer(book_entry)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


class ManageUserCollections(APIView):
    """
    An API View class for managing a user collection

    Methods
    -------
    get
        Retrieve a list of collections from someone's profile
    post
        Create a new collection
    """

    def get(self, request, username):
        """
        Handles a GET request for getting all user collections
        """
        requester = request.user
        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, user=user)

        if not user_profile.private or requester.username == username:
            collections = user_profile.collections.all()
            serializer = CollectionSerializer(collections, many=True)

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        return Response(
            {'Detail': 'This profile is private'},
            status=status.HTTP_403_FORBIDDEN
        )

    def post(self, request, username):
        """
        Handles a POST request to create a user collection
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

        title = data.get('title')
        description = data.get('description')

        if not (title and description):
            return Response(
                {'error': 'At least one of the fields is missing'},
                status=status.HTTP_400_BAD_REQUEST
            )

        duplicate = Collection.objects.filter(title=title)
        if duplicate.exists():
            title = title + f"({duplicate.count() + 1})"

        collection = Collection.objects.create(
            profile=user_profile,
            title=title,
            description=description
        )

        user_profile.collections.add(collection)
        serializer = CollectionSerializer(collection)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


class ManageBookEntryDetail(APIView):
    """
    An API View class for managing book entry details

    Methods
    -------
    get
        Retrieve a user entry detail
    patch
        Edit a user entry detail
    delete
        Deletes a user entry detail
    """

    def get(self, request, username, entry_id):
        """
        Handles a GET request to retrieve a user entry detail
        """
        requester = request.user
        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, user=user)

        if not user_profile.private or requester.username == username:
            book_entry = get_object_or_404(
                BookEntry, id=entry_id, profile=user_profile)
            serializer = BookEntrySerializer(book_entry)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        return Response(
            {'Detail': 'This profile is private'},
            status=status.HTTP_403_FORBIDDEN
        )

    def patch(self, request, username, entry_id):
        """
        Handles a PATCH request for editing a user entry detail
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

        current_page = data.get('current_page')
        book_status = data.get('status')
        book_rating = data.get('rating')

        if current_page:
            BookEntry.objects.filter(id=entry_id, profile=user_profile).update(
                current_page=current_page)
        if book_status:
            BookEntry.objects.filter(
                id=entry_id, profile=user_profile).update(status=book_status)
        if book_rating:
            BookEntry.objects.filter(
                id=entry_id, profile=user_profile).update(rating=book_rating)

        book_entry = BookEntry.objects.get(id=entry_id, profile=user_profile)
        serializer = BookEntrySerializer(book_entry)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def delete(self, request, username, entry_id):
        """
        Handles a DELETE request for deleting a user entry detail
        """
        requester = request.user
        if requester.username != username:
            return Response(
                {'error': 'Only users who owns this profile can edit it'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, user=user)
        book_entry = get_object_or_404(
            BookEntry, id=entry_id, profile=user_profile)

        book_entry.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ManageUserCollectionDetail(APIView):
    """
    An API View class for managing user collection details

    Methods
    -------
    get
        Retrieve a user collection detail
    patch
        Edit a user collection detail
    delete
        Delete a user collection detail
    """

    def get(self, request, username, collection_id):
        """
        Handles a GET request for retrieving a user collection
        """
        requester = request.user
        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, user=user)

        if not user_profile.private or requester.username == username:
            collection = get_object_or_404(
                Collection, id=collection_id, profile=user_profile)

            serializer = CollectionSerializer(collection)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        return Response(
            {'Detail': 'This profile is private'},
            status=status.HTTP_403_FORBIDDEN
        )

    def patch(self, request, username, collection_id):
        """
        Handles a PATCH request for editing a user collection
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

        title = data.get('title')
        description = data.get('description')

        if title:
            Collection.objects.filter(
                id=collection_id, profile=user_profile).update(title=title)
        if description:
            Collection.objects.filter(id=collection_id, profile=user_profile).update(
                description=description)

        collection = Collection.objects.get(
            id=collection_id, profile=user_profile)
        serializer = BookEntrySerializer(collection)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def delete(self, request, username, collection_id):
        """
        Handles a DELETE request for deleting a user collection
        """
        requester = request.user
        if requester.username != username:
            return Response(
                {'error': 'Only users who owns this profile can edit it'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user = get_object_or_404(User, username=username)
        user_profile = get_object_or_404(Profile, user=user)
        collection = get_object_or_404(
            BookEntry, id=collection_id, profile=user_profile)

        collection.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CreateBook(APIView):
    """
    An API View class for creating a book

    Methods
    -------
    post
        Creates/get a book object
    """

    def post(self, request):
        """
        Handles a POST request for creating/getting a new book object
        """
        data = request.data

        title = data.get('title')
        author = data.get('author')
        page_count = data.get('page_count')
        publication_date = data.get('publication_date')
        cover_image = data.get('cover_image')

        if not (title and author and page_count and publication_date and cover_image):
            return Response(
                {'error': 'At least one of the fields is missing'},
                status=status.HTTP_400_BAD_REQUEST
            )

        book = Book.objects.get_or_create(
            title=title,
            author=author,
            page_count=page_count,
            publication_date=publication_date,
            cover_image=cover_image
        )

        serializer = BookSerializer(book)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


class BookDetail(APIView):
    """
    An API View class for retrieving a book detail

    Methods
    -------
    get
        Retrieve a book detail
    """

    def get(self, request, book_id):
        """
        Handles a POST request for retrieving a book detail
        """
        book = get_object_or_404(Book, id=book_id)
        serializer = BookSerializer(book)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
