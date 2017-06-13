from django.contrib import admin


# Register your models here.

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from facebook.models import UserProfile

class UserProfileInline(admin.StackedInline):
    model= UserProfile
    can_delete= True
    verbose_name_plural ='profile'

class UserAdmin(BaseUserAdmin):
    inlines= (UserProfileInline,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
