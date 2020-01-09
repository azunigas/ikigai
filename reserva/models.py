from django.db import models
from ikigai.models import Box
from django.contrib.auth.models import User

# Create your models here.


class Reserva(models.Model):
    idreserva = models.AutoField(primary_key=True)
    fecha = models.DateTimeField()
    #fechaReserva = models.DateField()
    ano = models.IntegerField()
    mes = models.IntegerField()
    dia = models.IntegerField()
    idbox = models.ForeignKey(Box, on_delete=models.SET_NULL, null= True)
    idusuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)


class Horario(models.Model):
    idhorario = models.AutoField(primary_key=True)
    horario = models.CharField(max_length=2)
    valor = models.IntegerField()


class Hora(models.Model):
    idhora = models.AutoField(primary_key=True)
    hora = models.CharField(max_length=13)
    idhorario = models.ForeignKey(Horario, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.hora


class HorasReserva(models.Model):
    idreserva = models.ForeignKey(Reserva, on_delete=models.CASCADE)
    idhora = models.ForeignKey(Hora, on_delete=models.SET_NULL, null=True)


class HorasReservadas(models.Model):
    id = models.BigIntegerField (primary_key=True)
    idbox = models.ForeignKey(Box, on_delete=models.DO_NOTHING, blank=True, null=True)
    ano = models.IntegerField()
    mes = models.IntegerField()
    dia = models.IntegerField()
    idhora = models.ForeignKey(HorasReserva, on_delete=models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'reserva_horasreservadas'

