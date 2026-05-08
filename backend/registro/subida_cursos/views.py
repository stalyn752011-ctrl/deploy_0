import os
import logging
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status as http_status
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from api.models import Registro
from .models import SubidaCurso, ContactMessage
from .serializers import SubidaCursoSerializer, ContactMessageSerializer

logger = logging.getLogger(__name__)


@method_decorator(csrf_exempt, name='dispatch')
class CursoCreateView(generics.CreateAPIView):
    queryset = SubidaCurso.objects.all()
    serializer_class = SubidaCursoSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            logger.info(f'Received upload request: {request.data.get("name")}')
            logger.info(f'Video file: {request.FILES.get("video")}')
            # Build mutable dict without deep-copying file objects
            data = {key: request.data[key] for key in request.data.keys()}
            author_email = data.get('author')
            if author_email:
                try:
                    author = Registro.objects.get(email=author_email)
                    data['author'] = author.pk
                except Registro.DoesNotExist:
                    data.pop('author', None)
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=http_status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f'Upload failed: {str(e)}', exc_info=True)
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)

    def perform_create(self, serializer):
        instance = serializer.save()
        base_url = getattr(settings, 'BASE_URL', '')
        if base_url and instance.video:
            instance.video_url = f'{base_url}{instance.video.url}'
            instance.save(update_fields=['video_url'])


class CursoListView(generics.ListAPIView):
    serializer_class = SubidaCursoSerializer

    def get_queryset(self):
        qs = SubidaCurso.objects.all()
        author_email = self.request.query_params.get('author_email')
        if author_email:
            qs = qs.filter(author__email=author_email)
        return qs

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        base_url = getattr(settings, 'BASE_URL', 'http://localhost:8000')
        for item in data:
            if item.get('video') and not item.get('video_url'):
                item['video_url'] = f"{base_url}{item['video']}"
        return Response(data)


class CursoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SubidaCurso.objects.all()
    serializer_class = SubidaCursoSerializer
    lookup_field = 'courseID'

    def perform_destroy(self, instance):
        if instance.video and os.path.isfile(instance.video.path):
            os.remove(instance.video.path)
        instance.delete()


class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer


class ContactMessageListView(generics.ListAPIView):
    serializer_class = ContactMessageSerializer

    def get_queryset(self):
        qs = ContactMessage.objects.select_related('course').all()
        author_email = self.request.query_params.get('author_email')
        if author_email:
            qs = qs.filter(course__author__email=author_email)
        return qs.order_by('-created_at')
