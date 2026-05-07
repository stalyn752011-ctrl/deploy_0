from rest_framework import serializers
from .models import SubidaCurso


class SubidaCursoSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = SubidaCurso
        fields = '__all__'
        read_only_fields = ('video_url',)

    def get_author_name(self, obj):
        if obj.author:
            return obj.author.nombre
        return None
