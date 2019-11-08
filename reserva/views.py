from django.shortcuts import render
from django.views import generic
from ikigai.models import Box
from .models import Hora


class ReservaView(generic.ListView):
    template_name = 'reserva/reserva.html'
    context_object_name = 'box'

    def get_queryset(self):
        return Box.objects.all()


class HoraView(generic.ListView):
    template_name = 'reserva/reserva.html'
    context_object_name = 'hora'

    def get_queryset(self):
        return Hora.objects.all()
