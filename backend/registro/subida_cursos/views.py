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
from .models import SubidaCurso
from .serializers import SubidaCursoSerializer

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
    queryset = SubidaCurso.objects.all()
    serializer_class = SubidaCursoSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        # Ensure video_url is absolute
        base_url = getattr(settings, 'BASE_URL', 'http://localhost:8000')
        for item in data:
            if item.get('video') and not item.get('video_url'):
                item['video_url'] = f"{base_url}{item['video']}"
        return Response(data)


class CursoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SubidaCurso.objects.all()
    serializer_class = SubidaCursoSerializer
    lookup_field = 'courseID'
