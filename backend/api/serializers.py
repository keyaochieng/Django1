from django.contrib.auth.models import User
from rest_framework import serializers #this will allow us to take some json data and convert that into python equivalent and vice versa
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"] #fields we want to serialize when we are accepting and returning a new user
        extra_kwargs = {"password":{"write_only": True}}#accepts password when creating but does not return password when asked for user information

    def create(self, validated_data): #this method is called when we want to create a new version of this user by accepting the validated data
        user = User.objects.create_user(**validated_data)#validated date has been looked at by the serializer
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}} #allows us to see the author but not add an author