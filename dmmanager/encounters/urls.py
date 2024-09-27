from django.urls import path
from .views import EncounterList, EncounterDetail, CharacterList, CharacterDetail, MonsterSearch

urlpatterns = [
    path('encounters/', EncounterList.as_view(), name='encounter-list'),
    path('encounters/<int:pk>/', EncounterDetail.as_view(), name='encounter-detail'),
    path('characters/', CharacterList.as_view(), name='character-list'),
    path('characters/<int:pk>/', CharacterDetail.as_view(), name='character-detail'),
    path('monster-search/', MonsterSearch.as_view(), name='monster-search'),  # New route for monster search
]