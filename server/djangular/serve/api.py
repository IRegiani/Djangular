from rest_framework.generics import ListAPIView

from .serializers import PessoaSerializer, AdministradorSerializer, CursoSerializer, TurmaSerializer, AulaSerializer, PessoaAulaSerializer, ColaboradorTurmaSerializer
from .models import Administrador, Pessoa, Curso, Aula, Turma, ColaboradorTurma, PessoaAula

class AdministradorAPI(ListAPIView):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer

class PessoaAPI(ListAPIView):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer
    
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
   