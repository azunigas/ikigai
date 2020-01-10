from rest_framework import serializers
from .models import Hora, HorasReservadas


class HoraSerializers(serializers.ModelSerializer):
    class Meta:
        model = Hora
        fields = ('idhora', 'hora')


class ReservaSerializers(serializers.ModelSerializer):
    class Meta:
        model = HorasReservadas
        fields = ('idbox', 'ano', 'mes', 'dia', 'idhora_id')
