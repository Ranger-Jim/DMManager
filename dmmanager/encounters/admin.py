from django.contrib import admin
from .models import Character

# Register your models here.
class CharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'current_hp', 'max_hp', 'ac', 'initiative_order', 'spell_slots', 'speed')

admin.site.register(Character, CharacterAdmin)