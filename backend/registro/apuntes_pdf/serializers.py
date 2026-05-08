from rest_framework import serializers
from .models import ApuntesPDF


class ApuntesPDFSerializer(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    author_email = serializers.SerializerMethodField()

    class Meta:
        model = ApuntesPDF
        fields = '__all__'
        read_only_fields = ('pdf_url',)

    def get_author_name(self, obj):
        if obj.author:
            return obj.author.nombre
        return None

    def get_author_email(self, obj):
        if obj.author:
            return obj.author.email
        return None
