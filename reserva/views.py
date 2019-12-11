from django.shortcuts import render
from django.views import generic
from ikigai.models import Box
from .models import Hora
from rest_framework import viewsets
from .serializers import HoraSerializers


class ReservaView(generic.ListView):
    template_name = 'reserva/reserva.html'
    context_object_name = 'boxes'

    def get_queryset(self):
        return Box.objects.all()


class HoraView(viewsets.ModelViewSet):
    queryset = Hora.objects.all()
    serializer_class = HoraSerializers
