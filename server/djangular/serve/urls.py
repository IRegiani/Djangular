from django.urls import path
from .api import *

urlpatterns = [
 path('pessoa/', PessoaAPI.as_view()), #TODO:should receive a new person as well
 path('pessoa/<int:pk>', PessoaUniqueAPI.as_view()),
 path('curso/', CursoAPI.as_view()),
 path('turma/', TurmaAPI.as_view()),
 path('aulas/', AulaAPI.as_view()),
 path('aulas/<int:pk>', AulaUniqueAPI.as_view()),
 #path('pessoaAula/', PessoaAulaAllAPI.as_view()),
 #path('pessoaAula/<int:pk>', PessoaAulaUniqueAPI.as_view()),
 #id pessoa, id aula -> PessoaAula POST
 path('pessoaAula/', newPessoaAulaAPI.as_view({'post':'create',})),
 path('colaboradorTurma/', ColaboradorTurmaAPIALL.as_view()),
 path('colaboradorTurma/<int:fk>', ColaboradorTurmaAPI.as_view()),
]
