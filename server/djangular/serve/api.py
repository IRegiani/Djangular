from rest_framework.generics import ListAPIView
from rest_framework import viewsets, generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import *
from .models import *

## API de Serializers Normais ###############

class PessoaAPI(generics.ListCreateAPIView):
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
    serializer_class = ColaboradorOnlyTurmaSerializer
    
    def get_queryset(self):
        idPessoa = self.kwargs['idPessoa']
        queryset = ColaboradorTurma.objects.filter(Colaborador_id=idPessoa)
        return queryset
class newPessoaAulaAPI(viewsets.ModelViewSet):
    queryset = PessoaAula.objects.all(),
    #filter_backends = (DjangoFilterBackend,)
    #filterset_fields = ('id', )
    def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'POST':
            return PessoaAulaSerializer
        else:
            return GetPessoaAulaSerializer





    #@api_view(['GET','POST'])
    #def post(self, request):
    #    pessoaId = request.data.get("pessoaId", "")
    #    aula = request.data.get("aulaId", "")
    #    print('*******************')
    #    print(pessoaId, aula)
    #    if not (pessoa and aula):
    #        return Response(data={
    #            "message": "Verique se foi passado pessoaId e aulaId"
    #        }, status=status.HTTP_400_BAD_REQUEST)       
       # pessoa = Pessoa.objects.filter(id=pessoaId)
       # if not (pessoa):
       #     return Response(data={
       #         "message": "Pessoa nao encontrada"
       #     }, status=status.HTTP_404_NOT_FOUND)
        #class_group = PessoaAula.objects.create(
        #    title=title, classroom=classroom)

class GetAulasdaPessoaAPI(generics.ListAPIView):
    serializer_class = GetPessoaAulaSerializer

    def get_queryset(self):
        idPessoa = self.kwargs['idPessoa']
        queryset = PessoaAula.objects.filter(Pessoas=idPessoa)
        return queryset

class TurmaProfessorAPI(generics.ListAPIView):
    queryset = Turma.objects.all()
    filter_backends = (DjangoFilterBackend,)
    filterset_fields = ('Aluno.id',)
    serializer_class = GetTurmaSerializer