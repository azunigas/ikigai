from django.contrib import admin
from .models import Profile
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

# Register your models here.


class CustomProfile(admin.StackedInline):
    model = Profile
    can_delete = False


class UserAdmin(BaseUserAdmin):
    inlines = (CustomProfile,)


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
