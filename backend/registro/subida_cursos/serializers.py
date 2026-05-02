from rest_framework import serializers
from .models import SubidaCurso


class SubidaCursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubidaCurso
        fields = '__all__'
        read_only_fields = ('video_url',)
