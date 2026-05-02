from django.urls import path
from .views import CursoCreateView, CursoListView, CursoDetailView

urlpatterns = [
    path('subida-cursos/', CursoCreateView.as_view(), name='curso-create'),
    path('subida-cursos/list/', CursoListView.as_view(), name='curso-list'),
    path('subida-cursos/<int:courseID>/', CursoDetailView.as_view(), name='curso-detail'),
]
