from django.urls import path
from django.conf.urls import url
from .api import *

urlpatterns = [
 path('pessoa/', PessoaAPI.as_view()), #TODO:should receive a new person as well
 path('alunos/', AlunosAPI.as_view()),
 path('pessoa/<int:pk>', PessoaUniqueAPI.as_view()),
 path('curso/', CursoAPI.as_view()),
 path('turma/', TurmaAPI.as_view()),
 path('aulas/', AulaAPI.as_view()),
 path('aulas/<int:pk>', AulaUniqueAPI.as_view()),
    # path('pessoaAula/', PessoaAulaAllAPI.as_view()),
 #path('pessoaAula/<int:pk>', PessoaAulaUniqueAPI.as_view()),
 #id pessoa, id aula -> PessoaAula POST
 path('pessoaAula/', newPessoaAulaAPI.as_view({'post':'create', 'get':'list'})),
 path('updatePessoaAula/<int:pk>', UpdatePessoaAulaAPI.as_view()),
 url(r'^pessoaAula/(?P<idPessoa>.+)/(?P<idAula>.+)$', GetAulasdaPessoaAPI.as_view()),
 url(r'^alunosDaAula/(?P<idAula>.+)$', GetAlunosDaAulaAPI.as_view()),
#  url(r'^updatePessoaAula/(?P<idPessoa>.+)/(?P<idAula>.+)/(?P<Contador>.+)$', UpdatePessoaAulaAPI.as_view()),
 path('colaboradorTurma/', ColaboradorTurmaAPIALL.as_view()),
 url(r'^colaboradorTurma/(?P<idPessoa>.+)$', ColaboradorTurmaAPI.as_view()),     
]
