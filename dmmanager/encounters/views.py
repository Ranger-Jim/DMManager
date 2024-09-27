import requests
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.
from rest_framework import generics
from .models import Encounter, Character
from .serializers import EncounterSerializer, CharacterSerializer

# List all encounters or create a new one
class EncounterList(generics.ListCreateAPIView):
    queryset = Encounter.objects.all()
    serializer_class = EncounterSerializer

# Retrieve, update or delete a specific encounter
class EncounterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Encounter.objects.all()
    serializer_class = EncounterSerializer

# List all characters or create a new one
class CharacterList(generics.ListCreateAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

# Retrieve, update or delete a specific character
class CharacterDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class MonsterSearch(APIView):
    def get(self, request, *args, **kwargs):
        query = request.GET.get('query', '')
        if query:
            url = f"https://www.dnd5eapi.co/api/monsters/{query.lower()}"
            try:
                response = requests.get(url)
                response.raise_for_status()
                data = response.json()

                 # Loop through armor_class array to find the correct "value"
                ac_value = None
                for ac_item in data.get('armor_class', []):
                    if 'value' in ac_item:
                        ac_value = ac_item['value']
                        break  # Stop when we find the first 'value' key

                weapons = []
                for action in data.get('actions', []):
                    if 'name' in action and 'desc' in action:
                        weapons.append(f"{action['name']}: {action['desc']}")

                spells_abilities = []
                for ability in data.get('special_abilities', []):
                    if 'name' in ability and 'desc' in ability:
                        spells_abilities.append(f"{ability['name']}: {ability['desc']}")


                return Response({
                    'name': data['name'],
                    'curr_hp': data['hit_points'],
                    'max_hp': data['hit_points'],
                    'ac': ac_value,
                    'attack': weapons,
                    'spells/abilities': spells_abilities,
                    'speed': data['speed'].get('walk', 0),
                    
                    # Add any other fields you may need
                })
            except requests.exceptions.RequestException as e:
                return Response({'error': str(e)}, status=500)
        return Response({'error': 'Query parameter is missing'}, status=400)
