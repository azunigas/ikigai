from django.db import models
from ikigai.models import Box
from django.contrib.auth.models import User

# Create your models here.


class Reserva(models.Model):
    idReserva = models.AutoField(primary_key=True)
    fecha = models.DateTimeField()
    fechaReserva = models.DateField()
    idBox = models.ForeignKey(Box, on_delete=models.SET_NULL, null= True)
    idUsuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class Horario(models.Model):
    idhorario = models.AutoField(primary_key=True)
    horario = models.CharField(max_length=2)
    valor = models.IntegerField()


class Hora(models.Model):
    idHora = models.AutoField(primary_key=True)
    hora = models.CharField(max_length=13)
    idhorario = models.ForeignKey(Horario, on_delete=models.SET_NULL, null=True)


class HorasReserva(models.Model):
    idReserva = models.ForeignKey(Reserva, on_delete=models.CASCADE)
    idHora = models.ForeignKey(Hora, on_delete=models.SET_NULL, null=True)
