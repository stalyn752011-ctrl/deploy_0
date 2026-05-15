import os
from django.db import models
from api.models import Registro
from cloudinary.models import CloudinaryField


def video_upload_path(instance, filename):
    return os.path.join('videos_cursos', filename)


class SubidaCurso(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending to Start'),
        ('in_progress', 'In Progress'),
        ('finished', 'Finished'),
    ]

    courseID = models.AutoField(primary_key=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=100)
    video = CloudinaryField('video', folder='videos_cursos', blank=True, null=True, resource_type='auto')
    video_url = models.URLField(blank=True, default='')
    author = models.ForeignKey(Registro, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class ContactMessage(models.Model):
    course = models.ForeignKey(SubidaCurso, on_delete=models.CASCADE, related_name='messages')
    sender_email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message about {self.course.name} from {self.sender_email}'
