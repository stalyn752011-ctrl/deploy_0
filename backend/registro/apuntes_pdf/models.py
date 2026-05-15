import os
from django.db import models
from api.models import Registro
from cloudinary.models import CloudinaryField


def pdf_upload_path(instance, filename):
    return os.path.join('pdfs_apuntes', filename)


class ApuntesPDF(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    pdf = CloudinaryField('pdf', folder='pdfs_apuntes', blank=True, null=True, resource_type='raw')
    pdf_url = models.URLField(blank=True, default='')
    author = models.ForeignKey(Registro, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class ContactMessagePDF(models.Model):
    apunte = models.ForeignKey(ApuntesPDF, on_delete=models.CASCADE, related_name='messages')
    sender_email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message about {self.apunte.name} from {self.sender_email}'
