from django.db import models
from django.contrib.auth.models import User

#basically structure of our view
class Note(models.Model): 
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True) #amkes it automatically populate whenever a new instance of note is created
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")#we use foreign key when we want to link pieces of data together

    def __str__(self):
        return self.title

# Create your models here.
