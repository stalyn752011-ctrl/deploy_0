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
        user = Registro.objects.filter(email=email, password=password).first()
        if not user:
            return Response({'error': 'Credenciales inválidas'}, status=401)
        return Response({'message': 'Login exitoso', 'nombre': user.nombre, 'email': user.email, 'language': user.language})


class UserProfileView(APIView):
    def get_user(self, email):
        return Registro.objects.filter(email=email).first()

    def get(self, request, email):
        user = self.get_user(email)
        if not user:
            return Response({'error': 'Usuario no encontrado'}, status=404)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)

    def put(self, request, email):
        user = self.get_user(email)
        if not user:
            return Response({'error': 'Usuario no encontrado'}, status=404)
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CursosListView(generics.ListAPIView):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer