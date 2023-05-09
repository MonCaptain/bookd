from django.db import models

# Create your models here.


class Book(models.Model):
    """
    Book Model

    Parameters
    ----------
    models : _type_
        _description_
    """
    title = models.CharField(max_length=200, null=False)
    page_count = models.PositiveSmallIntegerField()
    publication_date = models.DateField()
    cover_image = models.URLField()
