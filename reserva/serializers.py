from rest_framework import serializers
from .models import Hora


class HoraSerializers(serializers.ModelSerializer):
    class Meta:
        model = Hora
        fields = ('idHora', 'hora')
