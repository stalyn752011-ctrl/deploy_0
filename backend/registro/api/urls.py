from django.urls import path
from .views import RegistroCreateView, LoginView, UserProfileView, CursosListView

urlpatterns = [
    path('registro/', RegistroCreateView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/<str:email>/', UserProfileView.as_view()),
    path('cursos/', CursosListView.as_view()),
]