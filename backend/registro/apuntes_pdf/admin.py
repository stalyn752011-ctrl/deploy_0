from django.contrib import admin
from .models import ApuntesPDF, ContactMessagePDF


@admin.register(ApuntesPDF)
class ApuntesPDFAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'pdf_url')
    search_fields = ('name', 'description')


@admin.register(ContactMessagePDF)
class ContactMessagePDFAdmin(admin.ModelAdmin):
    list_display = ('apunte', 'sender_email', 'created_at')
    list_filter = ('created_at',)
