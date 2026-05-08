from django.urls import path
from .views import ApuntesPDFCreateView, ApuntesPDFListView, ApuntesPDFDetailView

urlpatterns = [
    path('apuntes-pdf/', ApuntesPDFCreateView.as_view(), name='apuntes-pdf-create'),
    path('apuntes-pdf/list/', ApuntesPDFListView.as_view(), name='apuntes-pdf-list'),
    path('apuntes-pdf/<int:id>/', ApuntesPDFDetailView.as_view(), name='apuntes-pdf-detail'),
]
