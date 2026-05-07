from rest_framework import serializers
from .models import Registro, Cursos

class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        fields = ['nombre', 'email', 'language']


class CursosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cursos
        fields = '__all__'