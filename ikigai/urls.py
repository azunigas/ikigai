from django.urls import path
from . import views


app_name = 'ikigai'

urlpatterns = [
    path('', views.IkigaiView.as_view(), name='index'),
    path('consulta/', views.consulta, name='consulta'),
]
