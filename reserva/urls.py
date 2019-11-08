from django.urls import path
from . import views


app_name = 'reserva'

urlpatterns = [
    path('reserva/', views.ReservaView.as_view(), name='reserva'),
    path('', views.HoraView.as_view(), name='index'),

]