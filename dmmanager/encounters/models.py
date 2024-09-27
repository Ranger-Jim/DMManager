from django.db import models

# Create your models here.

# Model for the Player/User
class Player(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Model for Encounters
class Encounter(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
    players = models.ManyToManyField(Player)  # A many-to-many relationship with Players

    def __str__(self):
        return self.name

# Model for Characters/NPCs
class Character(models.Model):
    encounter = models.ForeignKey(Encounter, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    current_hp = models.IntegerField()
    max_hp = models.IntegerField()
    ac = models.IntegerField()  # Armor Class
    attack = models.CharField(max_length=200)  # Attack description
    status_effect = models.CharField(max_length=100, null=True, blank=True)
    spells_abilities = models.CharField(max_length=300, null=True, blank=True)
    initiative_order = models.IntegerField()
    spell_slots = models.CharField(max_length=100, null=True, blank=True)
    speed = models.IntegerField()
    is_monster = models.BooleanField(default=False) # New field to indicate if this is a monster

    def __str__(self):
        return self.name
