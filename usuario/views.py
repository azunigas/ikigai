from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import RegistroUsuario, UserUpdateForm, ProfileUpdateForm, RegisterProfile
from django.contrib.auth.decorators import login_required
from .models import Profile


def register(request):
    if request.method == 'POST':
        form = RegistroUsuario(request.POST)
        profile_form = RegisterProfile(request.POST)
        if form.is_valid() and profile_form.is_valid():
            user = form.save()
            user_profile = profile_form.save(commit=False)
            user_profile.user = user
            user_profile.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Registro realizado correctamente! Ahora puede iniciar sesion {username}!')
            return redirect('login')
    else:
        form = RegistroUsuario()
        profile_form = RegisterProfile()
    return render(request, 'usuario/register.html', {'form': form,
                                                     'profile_form': profile_form})


@login_required
def profile(request):
    if request.method == 'POST':
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST,
                                   request.FILES,
                                   instance=request.user.profile)
        if u_form.is_valid() and p_form.is_valid():
            u_form.save()
            p_form.save()
            messages.success(request, f'Perfil actualizado correctamente!')
            return redirect('profile')

    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'u_form': u_form,
        'p_form': p_form
    }
    return render(request, 'usuario/profile.html', context)


