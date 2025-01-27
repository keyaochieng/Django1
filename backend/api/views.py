from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note


# Create your views here.
class NoteListCreate(generics.ListCreateAPIView):#ListCreate here will list all the notes a user has created and also create
    serializer_class = NoteSerializer #specifiy the serilizer class
    permission_classes = [IsAuthenticated] #you cannot call this root unless you are autheniticated and pass a valid JWT token

    def get_queryset(self):
        user = self.request.user #gives us a user object 
        return Note.objects.filter(author=user) #gives us note by specific user // you could use different filters

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class= NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):    #so this basically provides us with a note we want to delete
        user = self.request.user #gives us a user object 
        return Note.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView): #generic view built into django that will automatically handle creating a new user/object
    queryset = User.objects.all() #list of all objects we will look at when creating a new one to avoid repetition
    serializer_class = UserSerializer #tells the view what kind of data to accept in order to create a new user
    permission_classes = [AllowAny]#determines who can actually call this(make a new user)


    #now that we have the views we need to setup some URLs for them API not backend URLs