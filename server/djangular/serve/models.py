from django.db import models
from datetime import date

## MODELS NORMAIS ######################

class Administrador(models.Model):
    Name = models.CharField(max_length=120)
    Email = models.CharField(max_length=50)
    Phone = models.CharField(max_length=14)
    Password = models.CharField(max_length=50)
    def __str__(self):
        return "ADM: {}".format(self.Name)

class Pessoa(models.Model):
    Name = models.CharField(max_length=120)
    Email = models.CharField(max_length=50)
    Phone = models.CharField(max_length=14)
    Password = models.CharField(max_length=50)
    UserType = models.IntegerField(default=0)
    StartDate = models.DateField(default=date.today)
    EndDate = models.DateField(null=True)
    Ativo = models.BooleanField(default=False)
    def __str__(self):
        return "Pessoa: {}".format(self.Name)

class Curso(models.Model):
    Name = models.CharField(max_length=50)
    Description = models.TextField(null=True)
    StartDate = models.DateField(null=True)
    EndDate = models.DateField(null=True)
    def __str__(self):
        return "Curso: {}".format(self.Name)

class Aula(models.Model):
    Assunto = models.TextField(null=True)
    Data = models.DateField(null=True)
    Curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    def __str__(self):
        return "Aula: {}".format(self.Assunto)

class Turma(models.Model):
    Name = models.CharField(max_length=50)
    Place = models.CharField(max_length=50)
    Description = models.TextField(null=True)
    WeekDay = models.IntegerField(null=True)
    StartTime = models.TimeField(null=True)
    EndTime = models.TimeField(null=True)
    Alunos = models.ManyToManyField(Pessoa)
    Cursos = models.ForeignKey(Curso, on_delete=models.CASCADE)
    Aulas = models.ManyToManyField(Aula)
    def __str__(self):
        return "Turma: {}".format(self.Name)

## MODELS DE RELACIONAMENTO ##################

class ColaboradorTurma(models.Model):
    Description = models.TextField(null=True)
    Colaborador = models.ForeignKey(Pessoa, on_delete=models.CASCADE)
    Turma = models.ForeignKey(Turma, on_delete=models.CASCADE)
    def __str__(self):
        return "Colaborador {} na Turma {}".format(self.Colaborador, self.Turma)

class PessoaAula(models.Model):
    Contador = models.IntegerField(default=0)
    Pessoas = models.ForeignKey(Pessoa, on_delete=models.CASCADE)
    Aulas = models.ForeignKey(Aula, on_delete=models.CASCADE)
    def __str__(self):
        return "Pessoa {} na aula {} com presença {}".format(self.Pessoas, self.Aulas, self.Contador)
