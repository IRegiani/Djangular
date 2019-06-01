from rest_framework.generics import ListAPIView
from rest_framework import viewsets, generics
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import *
from .models import *

## API de Serializers Normais ###############

class PessoaAPI(generics.ListAPIView):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer

class PessoaUniqueAPI(generics.RetrieveAPIView):
    serializer_class = PessoaSerializer
    queryset = Pessoa.objects.all()

class CursoAPI(generics.ListAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer
    

class TurmaAPI(generics.ListAPIView):
    queryset = Turma.objects.all()
    serializer_class = GetTurmaSerializer
    
class AulaAPI(generics.ListAPIView):
    queryset = Aula.objects.all()
    serializer_class = GetAulaSerializer

class AulaUniqueAPI(generics.RetrieveAPIView):
    queryset = Aula.objects.all()
    serializer_class = GetAulaSerializer

class PessoaAulaAllAPI(generics.ListAPIView):
    queryset = PessoaAula.objects.all()
    serializer_class = GetPessoaAulaSerializer

class PessoaAulaUniqueAPI(generics.RetrieveAPIView):
    queryset = PessoaAula.objects.all()
    serializer_class = GetPessoaAulaSerializer

## API de Serializers Relacionais ###############

class ColaboradorTurmaAPIALL(generics.ListAPIView):
    queryset = ColaboradorTurma.objects.all()
    serializer_class = ColaboradorTurmaSerializer

class ColaboradorTurmaAPI(generics.ListAPIView):
    # queryset = ColaboradorTurma.objects.filter(Colaborador__id=6)
    queryset = ColaboradorTurma.objects.filter(Colaborador__id=6)
    serializer_class = ColaboradorTurmaSerializer
    print('***************')
    print(queryset)
    print('***************')
    def get_serializer_class(self):
        idProf = self.kwargs['id']      
        print(idProf)                     
        return queryset

    #filter_backends = (DjangoFilterBackend,)
    #filterset_fields = ('id',)
    
class PessoaAulaAPI(generics.ListAPIView):
    queryset = PessoaAula.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('id',)

    def get_serializer_class(self):
        metodo = self.request.method
        if metodo == 'PUT' or metodo == 'POST':
            return PessoaAulaSerializer
        else:
            return GetPessoaAulaSerializer

class TurmaProfessorAPI(generics.ListAPIView):
    queryset = Turma.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('id',)
    serializer_class = GetTurmaSerializer