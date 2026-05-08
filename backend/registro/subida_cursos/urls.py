from django.urls import path
from .views import CursoCreateView, CursoListView, CursoDetailView, ContactMessageCreateView, ContactMessageListView

urlpatterns = [
    path('subida-cursos/', CursoCreateView.as_view(), name='curso-create'),
    path('subida-cursos/list/', CursoListView.as_view(), name='curso-list'),
    path('subida-cursos/<int:courseID>/', CursoDetailView.as_view(), name='curso-detail'),
    path('contact-messages/', ContactMessageCreateView.as_view(), name='contact-message-create'),
    path('contact-messages/list/', ContactMessageListView.as_view(), name='contact-message-list'),
]
