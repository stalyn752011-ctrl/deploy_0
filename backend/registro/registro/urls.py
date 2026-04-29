from django.contrib import admin
from django.urls import path, include
from api.views import MainPageView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', MainPageView.as_view()),
    path('api/', include('api.urls')),
]