from rest_framework import serializers
from .models import Encounter, Character

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ['id', 'name', 'current_hp', 'max_hp', 'ac', 'attack', 'status_effect', 'spells_abilities', 'initiative_order', 'spell_slots', 'speed']

class EncounterSerializer(serializers.ModelSerializer):
    characters = CharacterSerializer(many=True, read_only=True)

    class Meta:
        model = Encounter
        fields = ['id', 'name', 'date', 'characters']