from django.conf.urls import url
from .api import *


# TODO: precisa corrigir os url para que o Django possa usar o ModelViewSet corretamente
# Na compilação, o django reclama que precisa argumentar os 'as_view()' como:
#   API.as_view({'get': 'lists'})
# Porem, se lembro bem, o Pedro Cotta fez de um jeito que não precisava argumentar os 'as_view()'
urlpatterns = [
    url(r'^adm$', AdministradorAPI.as_view()),
    url(r'^pessoas$', PessoaAPI.as_view()),
    url(r'^cursos$', CursoAPI.as_view()),
    url(r'^turmas$', TurmaAPI.as_view()),
    url(r'^aulas$', AulaAPI.as_view()),
    url(r'^pa$', PessoaAulaAPI.as_view()),
    url(r'^ct$', ColaboradorTurmaAPI.as_view()),
]
