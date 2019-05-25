from django.conf.urls import url
from .api import AdministradorAPI, PessoaAPI, CursoAPI, TurmaAPI, AulaAPI, PessoaAulaAPI, ColaboradorTurmaAPI

urlpatterns = [
    url(r'^adm$', AdministradorAPI.as_view()),
    url(r'^pessoas$', PessoaAPI.as_view()),
    url(r'^aulasTurma/(?P<id>.+)$', AulasDaTurmaAPI.as_view()),
    url(r'^aulas/(?P<id>.+)$', AulaIdAPI.as_view()),
    url(r'^turmasAluno/(?P<id>.+)$', TurmasDoAlunoAPI.as_view()),
    url(r'^presencaAula/(?P<idAluno>.+)/(?P<idAula>.+)$', FaltaAPI.as_view()),
    url(r'^faltasTotais/(?P<idAluno>.+)$', FaltasTotaisAPI.as_view()),
    url(r'^cadastroUsuario$', ),
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
    url(r'^cadastroUsuario/$', AddPessoaAPI.as_view({'post': 'create'}))
]
