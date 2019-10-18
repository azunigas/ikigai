from django.shortcuts import render
from django.views import generic
from ikigai.models import Box


class ReservaView(generic.ListView):
    template_name = 'reserva/reserva.html'
    context_object_name = 'box'

    def get_queryset(self):
        return Box.objects.all()
