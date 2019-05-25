from django.conf.urls import url
from .api import AdministradorAPI, PessoaAPI, CursoAPI, TurmaAPI, AulaAPI, PessoaAulaAPI, ColaboradorTurmaAPI, AulasDaTurmaAPI, TurmasDoAlunoAPI, FaltaAPI, AulaIdAPI, FaltasTotaisAPI


urlpatterns = [
    url(r'^adm$', AdministradorAPI.as_view()),
    url(r'^pessoas$', PessoaAPI.as_view()),
    url(r'^aulasTurma/(?P<id>.+)$', AulasDaTurmaAPI.as_view()),
    url(r'^aulas/(?P<id>.+)$', AulaIdAPI.as_view()),
    url(r'^turmasAluno/(?P<id>.+)$', TurmasDoAlunoAPI.as_view()),
    url(r'^presencaAula/(?P<idAluno>.+)/(?P<idAula>.+)$', FaltaAPI.as_view()),
    url(r'^faltasTotais/(?P<idAluno>.+)$', FaltasTotaisAPI.as_view()),
    url(r'^cadastroUsuario$', ),
    url(r'^cursos$', CursoAPI.as_view()),
    url(r'^turmas$', TurmaAPI.as_view()),
    url(r'^aulas$', AulaAPI.as_view()),
    url(r'^pa$', PessoaAulaAPI.as_view()),
    url(r'^ct$', ColaboradorTurmaAPI.as_view()),
]