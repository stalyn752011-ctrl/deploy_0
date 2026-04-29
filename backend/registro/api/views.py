from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Registro, Cursos
from .serializers import RegistroSerializer, CursosSerializer

class MainPageView(APIView):
    def get(self, request):
        return Response({'message': 'holaputita'})

class RegistroCreateView(generics.CreateAPIView):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user = Registro.objects.get(email=email, password=password)
            return Response({'message': 'Login exitoso', 'nombre': user.nombre})
        except Registro.DoesNotExist:
            return Response({'error': 'Credenciales inválidas'}, status=401)


class CursosListView(generics.ListAPIView):
    queryset = Cursos.objects.all()
    serializer_class = CursosSerializer