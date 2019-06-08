from rest_framework.generics import ListAPIView
from rest_framework import viewsets, generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import api_view

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
    
#class PessoaAulaAPI(generics.ListAPIView):
#    queryset = PessoaAula.objects.all()
#    filter_backends = (DjangoFilterBackend,)
#    filterset_fields = ('id',)
#
#    def get_serializer_class(self):
#        metodo = self.request.method
#        if metodo == 'PUT' or metodo == 'POST':
#            return PessoaAulaSerializer
#        else:
#            return GetPessoaAulaSerializer
#
class newPessoaAulaAPI(viewsets.ModelViewSet):
    queryset = PessoaAula.objects.all()
    serializer_class = GetPessoaAulaSerializer

    # queryset = PessoaAula.objects.all(),
    # #filter_backends = (DjangoFilterBackend,)
    # #filterset_fields = ('id', )

    def get_serializer_class(self):
        method = self.request.method
        if method == 'PUT' or method == 'POST':
            return PessoaAulaSerializer
        else:
            # return PessoaAulaSerializer
            return GetPessoaAulaSerializer

    # queryset = PessoaAula.objects.all()
    # serializer_class = GetPessoaAulaSerializer





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

        return Response(data={"message": "Entrada criada com sucesso"
            }, status = status.HTTP_201_CREATED)

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