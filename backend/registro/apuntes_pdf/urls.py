from django.urls import path
from .views import ApuntesPDFCreateView, ApuntesPDFListView, ApuntesPDFDetailView, ContactMessagePDFCreateView, ContactMessagePDFListView

urlpatterns = [
    path('apuntes-pdf/', ApuntesPDFCreateView.as_view(), name='apuntes-pdf-create'),
    path('apuntes-pdf/list/', ApuntesPDFListView.as_view(), name='apuntes-pdf-list'),
    path('apuntes-pdf/<int:id>/', ApuntesPDFDetailView.as_view(), name='apuntes-pdf-detail'),
    path('contact-messages-pdf/', ContactMessagePDFCreateView.as_view(), name='contact-message-pdf-create'),
    path('contact-messages-pdf/list/', ContactMessagePDFListView.as_view(), name='contact-message-pdf-list'),
]
