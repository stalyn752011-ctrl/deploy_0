from rest_framework import serializers
from .models import SubidaCurso, ContactMessage


class SubidaCursoSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_email = serializers.SerializerMethodField()

    class Meta:
        model = SubidaCurso
        fields = '__all__'
        read_only_fields = ('video_url',)

    def get_author_name(self, obj):
        if obj.author:
            return obj.author.nombre
        return None

    def get_author_email(self, obj):
        if obj.author:
            return obj.author.email
        return None


class ContactMessageSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)

    class Meta:
        model = ContactMessage
        fields = '__all__'
