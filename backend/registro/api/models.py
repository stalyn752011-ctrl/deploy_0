from django.db import models

class Registro(models.Model):
    LENGUAJES = [
        ('en', 'English'),
        ('es', 'Español'),
        ('fr', 'Français'),
        ('pt', 'Português'),
    ]

    nombre = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    language = models.CharField(max_length=2, choices=LENGUAJES, default='en')

    def __str__(self):
        return self.nombre


class Cursos(models.Model):
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

    def __str__(self):
        return self.name