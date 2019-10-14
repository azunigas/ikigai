from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile


class RegistroUsuario(UserCreationForm):
    esp = forms.CharField(max_length=50)
    cel = forms.IntegerField()
    rut = forms.CharField(max_length=9)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'rut', 'cel', 'esp', 'username', 'password1', 'password2']


class UserUpdateForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ['username', 'email']


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['image']
