import uuid
from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


def upload_to(instance, filename):
    """
    Formats the image path
    """
    return f'images/{filename}'


class Book(models.Model):
    """
    Book Model

    Fields
    ----------
    title : CharField
        Title of book
    author : CharField
        Book author
    isbn: Charfield
        ISBN code for book
    page_count : PositiveSmallIntegerField
        Total number of pages in the book
    publication_date : DateField
        Date the book was published
    cover_image : URLField
        Image URL for book cover
    """
    title = models.CharField(max_length=200, null=False)
    author = models.CharField(max_length=100, null=False)
    isbn = models.CharField(max_length=21)
    page_count = models.PositiveSmallIntegerField()
    publication_date = models.DateField()
    cover_image = models.URLField()

    objects = models.Manager()

    def __str__(self) -> str:
        return f"{self.title} by {self.author}"


class Profile(models.Model):
    """
    Profile Model

    Fields
    ----------
    user : OneToOneField
        User the profile is connected to
    private : BooleanField
        Privacy of the profile
    favorite_book : ForeignKey
        Favorite Book
    book_list : ManyToManyField
        List of Books in the profile
    book_list_length : int
        Length of book list
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=False)
    private = models.BooleanField(default=False)
    profile_picture = models.ImageField(
        upload_to=upload_to, blank=True, null=True)
    favorite_book = models.ForeignKey(
        Book, on_delete=models.SET_NULL, null=True, related_name="favorite_book")

    book_list = models.ManyToManyField(
        Book, through='BookEntry', through_fields=('profile', 'book'))

    objects = models.Manager()

    @property
    def book_list_length(self):
        """
        Returns the length of the book list
        """
        return len(self.book_list.all())

    def __str__(self) -> str:
        return self.user.username


class BookEntry(models.Model):
    """
    BookEntry Model

    Fields
    ----------
    book : ForeignKey
        Book the entry is related to
    profile : ForeignKey
        Profile the entry is related to
    current_page : PositiveSmallIntegerField
        Current page
    status : CharField
        Status of the reading
    last_updated : DateTimeField
        Datetime the entry is last updated
    datetime_added : DateTimeField
        Datetime the entry is added
    """
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    current_page = models.PositiveSmallIntegerField(default=0)

    class Progress(models.TextChoices):
        """
        Categories of status
        """
        NOT_STARTED = "Not Started", "Not Started"
        IN_PROGRESS = "In Progress", "In Progress"
        COMPLETED = "Completed", "Completed"
        DROPPED = "Dropped", "Dropped"

    class Rating(models.IntegerChoices):
        """
        Book Ratings
        """
        ONE = 1, '1'
        TWO = 2, '2'
        THREE = 3, '3'
        FOUR = 4, '4'
        FIVE = 5, '5'

    status = models.CharField(
        max_length=12, choices=Progress.choices, default=Progress.NOT_STARTED)
    rating = models.IntegerField(
        null=True, choices=Rating.choices, default=None)
    last_updated = models.DateTimeField(auto_now=True)
    datetime_added = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()

    class Meta:
        """
        Metadata class
        """
        ordering = (
            '-datetime_added',
        )

    def __str__(self) -> str:
        return f"{self.user.username} - {self.book.title}"


class Collection(models.Model):
    """
    Collection Model

    Fields
    ----------
    profile : Foreign Key
        Profile the collection is connected to
    title : CharField
        Title of the collection
    description : CharField
        Description of the collection
    books : ManyToManyField
        Books in the collection
    """
    uuid = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    profile = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name="collections")
    title = models.CharField(max_length=50, null=False)
    description = models.CharField(max_length=255, null=True)

    books = models.ManyToManyField(Book)

    objects = models.Manager()

    def __str__(self) -> str:
        return self.title
