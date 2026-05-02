from django.contrib import admin
from .models import SubidaCurso


@admin.register(SubidaCurso)
class SubidaCursoAdmin(admin.ModelAdmin):
    list_display = ('courseID', 'name', 'category', 'status', 'video_url')
    list_filter = ('status', 'category')
    search_fields = ('name', 'description')
