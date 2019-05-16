from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import PessoaSerializer, AdministradorSerializer, CursoSerializer, TurmaSerializer, AulaSerializer, PessoaAulaSerializer, ColaboradorTurmaSerializer
from .models import Administrador, Pessoa, Curso, Aula, Turma, ColaboradorTurma, PessoaAula

from rest_framework.decorators import api_view


class AdministradorAPI(ListAPIView):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer


class PessoaAPI(ModelViewSet):
    queryset = Pessoa.objects.all()
    serializer_class = PessoaSerializer
    print("FUNCIONA!!!")

# class de GET detalhe da Pessoa


class DetalhePessoaAPI(ListAPIView):
    serializer_class = PessoaSerializer

    def get_queryset(self):
        idpessoa = self.kwargs['id']
        print("Id Pessoa = ", idpessoa)
        queryset = Pessoa.objects.filter(id=idpessoa)
        return queryset


class CursoAPI(ListAPIView):
    queryset = Curso.objects.all()
    serializer_class = CursoSerializer


# class de GET detalhe do Curso
class DetalheCursoAPI(ListAPIView):
    serializer_class = CursoSerializer

    def get_queryset(self):
        idcurso = self.kwargs['id']
        queryset = Curso.objects.filter(id=idcurso)
        return queryset


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


# class POST detalhe para adicionar aluno X na aula Y
class AddPessoaAulaAPI(ModelViewSet):
    serializer_class = PessoaAulaSerializer
    serializerPessoa = PessoaSerializer
    serializerAula = AulaSerializer
    
    def create(self, request):
        pessoa = request.POST['pessoa']
        aula = request.POST['aula']
        print(pessoa, aula)
        existPessoa = Pessoa.objects.filter(id=pessoa)
        existAula = Aula.objects.filter(id=aula)
        if existAula.count() > 0 and existPessoa.count() > 0:
            print("yes")
            p = PessoaAula(Contador=0, Pessoas=pessoa, Aulas=aula)
            p.save()
            return Response(queryset.data)
        print("no")
        return Response()
    # def get_queryset(self, request):
    #      if request.method == 'GET':
    #         queryset = PessoaAula.objects.all()
    #          return queryset
    #      if request.method == 'PUT':
    #          data = request.data
    #          print(data)
    #          queryset = data
    #     #    return data
