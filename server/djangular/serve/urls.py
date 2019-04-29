from django.conf.urls import url
from .api import AdministradorAPI, PessoaAPI, CursoAPI, TurmaAPI, AulaAPI, PessoaAulaAPI, ColaboradorTurmaAPI

urlpatterns = [
    url(r'^adm$', AdministradorAPI.as_view()),
    url(r'^pessoas$', PessoaAPI.as_view()),
    url(r'^cursos$', CursoAPI.as_view()),
    url(r'^turmas$', TurmaAPI.as_view()),
    url(r'^aulas$', AulaAPI.as_view()),
    url(r'^pa$', PessoaAulaAPI.as_view()),
    url(r'^ct$', ColaboradorTurmaAPI.as_view()),
]