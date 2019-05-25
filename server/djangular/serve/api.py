from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django.http import HttpResponse

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import PessoaSerializer, AdministradorSerializer, CursoSerializer, TurmaSerializer, AulaSerializer, PessoaAulaSerializer, ColaboradorTurmaSerializer
from .models import Administrador, Pessoa, Curso, Aula, Turma, ColaboradorTurma, PessoaAula

from rest_framework.decorators import api_view
import datetime

class AdministradorAPI(ListAPIView):
    queryset = Administrador.objects.all()
    serializer_class = AdministradorSerializer


class PessoaAPI(ModelViewSet):
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
        # This is filtering only the  values between 0 and 1 in the field "Contador", since 2 means the attendance was filled!
        queryset = queryRelations.filter(Contador__range=(0, 1))
        return queryset

class FaltasTotaisAPI(ListAPIView):
    serializer_class = AulaSerializer

    def get_queryset(self):
        idAluno = self.kwargs['idAluno']
        queryPresenca = PessoaAula.objects.filter(Pessoas_id=idAluno)
        # This is filtering only the  values between 0 and 1 in the field "Contador", since 2 means the attendance was filled!
        queryFaltas = queryPresenca.filter(Contador__range=(0, 1)).values("Aulas").all()
        queryset = Aula.objects.filter(id__in=queryFaltas)
        return queryset

# class CadastroUsuario(ListAPIView):
#     serializer_class = AulaSerializer

#     def get_queryset(self):
#         idAluno = self.kwargs['idAluno']
#         queryPresenca = PessoaAula.objects.filter(Pessoas_id=idAluno)
#         # This is filtering only the  values between 0 and 1 in the field "Contador", since 2 means the attendance was filled!
#         queryFaltas = queryPresenca.filter(Contador__range=(0, 1)).values("Aulas").all()
#         queryset = Aula.objects.filter(id__in=queryFaltas)
#         return queryset
    
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


class AddPessoaAPI(ModelViewSet):
    serializerPessoa = PessoaSerializer
    
    def create(self, request):
        
        nome = request.POST['nome'] #Pegar o URL Boddy
        senha = request.POST['senha'] #Pegar o URL Boddy
        email = request.POST['email']
        telefone = request.POST['telefone']
        
        #QUERY para pegar Pessoa com o email correspondente
        existPessoa = Pessoa.objects.filter(Email=email)
        if existPessoa.count() > 0:
            reponse = HttpResponse("Email já utilizado", status=409)
            return reponse
        p = Pessoa.objects.create(Name=nome, Email=email, Password=senha, Phone=telefone, UserType=0)
        p.save()
        reponse = HttpResponse("Cadastro Efetuado", status=201)
        return reponse

# class POST detalhe para adicionar um novo aluno em uma aula específica
class AddPessoaAulaAPI(ModelViewSet):
    serializer_class = PessoaAulaSerializer
    serializerPessoa = PessoaSerializer
    serializerAula = AulaSerializer
    
    def create(self, request):
        
        pessoa = request.POST['pessoa'] #Pegar o URL Boddy
        aula = request.POST['aula'] #Pegar o URL Boddy
        print(pessoa, aula)
        
        #QUERY para pegar Pessoa com o id correspondente
        existPessoa = Pessoa.objects.filter(id=pessoa)
        #QUERY para pegar Aula com o id correspondente
        existAula = Aula.objects.filter(id=aula)
        if existAula.count() == 0:
            return Response("Aula Não Encontrada")
        if existPessoa.count() == 0:
            return Response("Pessoa Não Encontrada")
        id = existPessoa.values('id')[0]['id']
        
        p = Pessoa.objects.get(id=id)
        a = Aula.objects.get(id=existAula.values('id')[0]['id'])
        PessoaAula.objects.create(Pessoas=p, Aulas=a, Contador=111).save()
        
        return Response("Sucesso, 200")

    # def get_queryset(self, request):
    #      if request.method == 'GET':
    #         queryset = PessoaAula.objects.all()
    #          return queryset
    #      if request.method == 'PUT':
    #          data = request.data
    #          print(data)
    #          queryset = data
    #     #    return data
