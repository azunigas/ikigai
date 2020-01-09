from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'horas', views.HoraView)
router.register(r'reservas', views.ReservaHoraView)


app_name = 'reserva'

urlpatterns = [
    path('', include(router.urls)),
    path('reserva/', views.ReservaView.as_view(), name='reserva'),
]
