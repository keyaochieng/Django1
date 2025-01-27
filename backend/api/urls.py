from django.urls import path
from . import views

#urls for creating&listing and deleting NOTES
urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"), #<int:pk>=PRIMARY KEY
]

#Now that we have our urls, we need to link the URLs from our MAIN url file to this file