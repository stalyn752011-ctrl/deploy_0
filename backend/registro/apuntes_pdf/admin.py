from django.contrib import admin
from .models import ApuntesPDF


@admin.register(ApuntesPDF)
class ApuntesPDFAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'pdf_url')
    search_fields = ('name', 'description')
