from django.conf.urls import url
from .api import AdministradorAPI, PessoaAPI, CursoAPI, TurmaAPI, AulaAPI, PessoaAulaAPI, ColaboradorTurmaAPI, DetalhePessoaAPI, DetalheCursoAPI, AddPessoaAulaAPI

from rest_framework.routers import DefaultRouter



urlpatterns = [
    url(r'^adm$', AdministradorAPI.as_view()),
    url(r'^pessoas/$', PessoaAPI.as_view({'get': 'list', 'post': 'create'})),
    url(r'^pessoas/(?P<pk>.+)/', PessoaAPI.as_view({'get': 'retrieve', 'put': 'update'})),
    url(r'^detalhePessoa/(?P<id>.+)$', DetalhePessoaAPI.as_view()),
    url(r'^cursos$', CursoAPI.as_view()),
    url(r'^detalheCurso/(?P<id>.+)$', DetalheCursoAPI.as_view()),
    url(r'^turmas$', TurmaAPI.as_view()),
    url(r'^aulas$', AulaAPI.as_view()),
    url(r'^pa$', PessoaAulaAPI.as_view()),
    url(r'^ct$', ColaboradorTurmaAPI.as_view()),
    url(r'^addPA/$', AddPessoaAulaAPI.as_view({'post': 'create'})),
    
]
