from rest_framework.generics import ListAPIView

from .serializers import PessoaSerializer, AdministradorSerializer, CursoSerializer, TurmaSerializer, AulaSerializer, PessoaAulaSerializer, ColaboradorTurmaSerializer
from .models import Administrador, Pessoa, Curso, Aula, Turma, ColaboradorTurma, PessoaAula

class AdministradorAPI(ListAPIView):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer

class PessoaAPI(ListAPIView):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer

class AulasDaTurmaAPI(ListAPIView):
    # queryset = Pessoa.objects.all()
    serializer_class = AulaSerializer

    def get_queryset(self):
        idTurma = self.kwargs['id']
        queryset = Aula.objects.filter(turma=idTurma)
        return queryset

class TurmasDoAlunoAPI(ListAPIView):
    serializer_class = TurmaSerializer

    def get_queryset(self):
        idAluno = self.kwargs['id']
        queryset = Turma.objects.filter(Alunos=idAluno)
        return queryset


class FaltaAPI(ListAPIView):
    serializer_class = PessoaAulaSerializer

    def get_queryset(self):
        idAluno = self.kwargs['idAluno']
        queryPresenca = PessoaAula.objects.filter(Pessoas_id=idAluno)
        idAula = self.kwargs['idAula']
        queryRelations = queryPresenca.filter(Aulas=idAula)
        queryset = queryRelations.filter(Contador__range=(0, 1))
        # queryset = queryRelations
        # if queryset:
        #     # return True
        #     return ((True,))
        # else:
        #     # return False
        #     return ((False,))

        return queryset

    
class CursoAPI(ListAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    
class TurmaAPI(ListAPIView):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer
    
class AulaAPI(ListAPIView):
    queryset = Aula.objects.all()
    serializer_class = AulaSerializer

class ColaboradorTurmaAPI(ListAPIView):
    queryset = ColaboradorTurma.objects.all()
    serializer_class = ColaboradorTurmaSerializer

class PessoaAulaAPI(ListAPIView):
    queryset = PessoaAula.objects.all()
    serializer_class = PessoaAulaSerializer
   