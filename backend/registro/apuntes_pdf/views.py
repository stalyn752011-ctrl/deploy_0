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
from .models import ApuntesPDF, ContactMessagePDF
from .serializers import ApuntesPDFSerializer, ContactMessagePDFSerializer

logger = logging.getLogger(__name__)


@method_decorator(csrf_exempt, name='dispatch')
class ApuntesPDFCreateView(generics.CreateAPIView):
    queryset = ApuntesPDF.objects.all()
    serializer_class = ApuntesPDFSerializer
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        try:
            logger.info(f'Received PDF upload request: {request.data.get("name")}')
            logger.info(f'PDF file: {request.FILES.get("pdf")}')
            data = {key: request.data[key] for key in request.data.keys()}
            author_email = data.get('author')
            if author_email:
                author = Registro.objects.filter(email=author_email).first()
                if author:
                    data['author'] = author.pk
                else:
                    data.pop('author', None)
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=http_status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f'PDF upload failed: {str(e)}', exc_info=True)
            return Response({'error': str(e)}, status=http_status.HTTP_500_INTERNAL_SERVER_ERROR)

    def perform_create(self, serializer):
        instance = serializer.save()
        base_url = getattr(settings, 'BASE_URL', '')
        if base_url and instance.pdf:
            instance.pdf_url = f'{base_url}{instance.pdf.url}'
            instance.save(update_fields=['pdf_url'])


class ApuntesPDFListView(generics.ListAPIView):
    serializer_class = ApuntesPDFSerializer

    def get_queryset(self):
        qs = ApuntesPDF.objects.all()
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
            if item.get('pdf') and not item.get('pdf_url'):
                item['pdf_url'] = f"{base_url}{item['pdf']}"
        return Response(data)


class ApuntesPDFDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ApuntesPDF.objects.all()
    serializer_class = ApuntesPDFSerializer
    lookup_field = 'id'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        if data.get('pdf') and not data.get('pdf_url'):
            base_url = getattr(settings, 'BASE_URL', 'http://localhost:8000')
            data['pdf_url'] = f"{base_url}{data['pdf']}"
        return Response(data)

    def perform_destroy(self, instance):
        if instance.pdf and os.path.isfile(instance.pdf.path):
            os.remove(instance.pdf.path)
        instance.delete()


class ContactMessagePDFCreateView(generics.CreateAPIView):
    queryset = ContactMessagePDF.objects.all()
    serializer_class = ContactMessagePDFSerializer


class ContactMessagePDFListView(generics.ListAPIView):
    serializer_class = ContactMessagePDFSerializer

    def get_queryset(self):
        qs = ContactMessagePDF.objects.select_related('apunte').all()
        author_email = self.request.query_params.get('author_email')
        if author_email:
            qs = qs.filter(apunte__author__email=author_email)
        return qs.order_by('-created_at')
