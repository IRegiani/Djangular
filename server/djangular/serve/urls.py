from django.urls import path
from .api import *


# TODO: precisa corrigir os url para que o Django possa usar o ModelViewSet corretamente
# Na compilação, o django reclama que precisa argumentar os 'as_view()' como:
#   API.as_view({'get': 'lists'})
# Porem, se lembro bem, o Pedro Cotta fez de um jeito que não precisava argumentar os 'as_view()'
urlpatterns = [
 path('pessoas/', PessoaAPI.as_view()),
 path('curso/', CursoAPI.as_view()),
 path('turma/', TurmaAPI.as_view()),
 path('aulas/', AulaAPI.as_view()),
 path('pessoaAula/', PessoaAulaAPI.as_view()),
 path('colaboradorTurma/', ColaboradorTurmaAPI.as_view()),
]
