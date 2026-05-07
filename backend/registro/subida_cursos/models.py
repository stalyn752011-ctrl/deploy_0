import os
from django.db import models
from django.conf import settings
from api.models import Registro


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
    video = models.FileField(upload_to=video_upload_path)
    video_url = models.URLField(blank=True, default='')
    author = models.ForeignKey(Registro, on_delete=models.SET_NULL, null=True, blank=True)

    def save(self, *args, **kwargs):
        upload_dir = os.path.join(settings.MEDIA_ROOT, 'videos_cursos')
        os.makedirs(upload_dir, exist_ok=True)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
