from django.urls import path

from .views import CreateBook, BookDetail
from .views import ManageUserProfiles
from .views import ManageUserBookEntries, ManageBookEntryDetail
from .views import ManageUserCollections, ManageUserCollectionDetail

urlpatterns = [
    # Book URLs
    path('', CreateBook.as_view()),
    path('<int:book_id', BookDetail.as_view()),

    # Profile URLs
    path('<str:username>', ManageUserProfiles.as_view()),

    # Book Entry URLs
    path('<str:username>/entries', ManageUserBookEntries.as_view()),
    path('<str:username>/entries/<int:entry_id>',
         ManageBookEntryDetail.as_view()),

    # Collection URLs
    path('<str:username>/collections', ManageUserCollections.as_view()),
    path('<str:username>/collections/<int:collection_id>',
         ManageUserCollectionDetail.as_view()),
]
