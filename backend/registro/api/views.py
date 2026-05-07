from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Registro, Cursos
from .serializers import RegistroSerializer, UserProfileSerializer, CursosSerializer

from django.http import HttpResponse

class MainPageView(APIView):
    def get(self, request):
        return HttpResponse('<h1>hola stalyn</h1>', content_type='text/html')

class RegistroCreateView(generics.CreateAPIView):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Registro.objects.get(email=email, password=password)
            return Response({'message': 'Login exitoso', 'nombre': user.nombre, 'email': user.email, 'language': user.language})
        except Registro.DoesNotExist:
            return Response({'error': 'Credenciales inválidas'}, status=401)


class UserProfileView(APIView):
    def get(self, request, email):
        try:
            user = Registro.objects.get(email=email)
            serializer = UserProfileSerializer(user)
            return Response(serializer.data)
        except Registro.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=404)

    def put(self, request, email):
        try:
            user = Registro.objects.get(email=email)
            serializer = UserProfileSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Registro.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=404)


class CursosListView(generics.ListAPIView):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer