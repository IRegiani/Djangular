from rest_framework.generics import ListAPIView
from rest_framework import viewsets, generics
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import *
from .models import *

## API de Serializers Normais ###############

class AdministradorAPI(generics.ListAPIView):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer
    
class PessoaAPI(generics.ListAPIView):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer

    #def get_queryset(self):
    #    pessoas = list(Pessoa.objects.filter(groups__in=[1]).values())
    #    return pessoas

class CursoAPI(generics.ListAPIView):
    queryset = Curso.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('Name',)
    serializer_class = CursoSerializer
    

class TurmaAPI(generics.ListAPIView):
    queryset = Turma.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('Name',)

    def get_serializer_class(self):
        metodo = self.request.method
        if metodo == 'PUT' or metodo == 'POST':
            return TurmaSerializer
        else:
            return GetTurmaSerializer
    
class AulaAPI(generics.ListAPIView):
    queryset = Aula.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('Assunto',)

    def get_serializer_class(self):
        metodo = self.request.method
        if metodo == 'PUT' or metodo == 'POST':
            return AulaSerializer
        else:
            return GetAulaSerializer

## API de Serializers Relacionais ###############

class ColaboradorTurmaAPI(generics.ListAPIView):
    queryset = ColaboradorTurma.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('Description',)

    def get_serializer_class(self):
        metodo = self.request.method
        if metodo == 'PUT' or metodo == 'POST':
            return ColaboradorTurmaSerializer
        else:
            return GetColaboradorTurmaSerializer

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