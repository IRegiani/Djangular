from django.db import models

# Create your models here.
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
    UserType = models.IntegerField()
    StartDate = models.DateField()
    EndDate = models.DateField()
    Ativo = models.BooleanField(default=False)
    def __str__(self):
        return "Pessoa: {}".format(self.Name)

class Aula(models.Model):
    Data = models.DateField()
    Assunto = models.TextField()
    def __str__(self):
        return "Aula: {}".format(self.Data)

class Curso(models.Model):
    Name = models.CharField(max_length=50)
    Description = models.TextField()
    StartDate = models.DateField()
    EndDate = models.DateField()
    def __str__(self):
        return "Curso: {}".format(self.Name)

class Turma(models.Model):
    Name = models.CharField(max_length=50)
    Place = models.CharField(max_length=50)
    Description = models.TextField()
    WeekDay = models.IntegerField()
    StartTime = models.TimeField()
    EndTime = models.TimeField()
    Alunos = models.ManyToManyField(Pessoa)
    #Colaboradores = models.ManyToManyField(Pessoa, through='ColaboradorTurma')
    Cursos = models.ForeignKey(Curso, on_delete=models.CASCADE)
    Aulas = models.ManyToManyField(Aula)
    def __str__(self):
        return "Turma: {}".format(self.Name)

class ColaboradorTurma(models.Model):
    Description = models.TextField()
    Colaborador = models.ForeignKey(Pessoa, on_delete=models.CASCADE)
    Turma = models.ForeignKey(Turma, on_delete=models.CASCADE)
    def __str__(self):
        return "Colaborador {} na Turma {}".format(self.Colaborador, self.Turma)


# class Curso(models.Model):
#     Name = models.CharField(max_length=50)
#     Description = models.TextField()
#     StartDate = models.DateField()
#     EndDate = models.DateField()
#     def __str__(self):
#         return "Curso: {}".format(self.Name)


class PessoaAula(models.Model):
    Contador = models.IntegerField()
    Pessoas = models.ForeignKey(Pessoa, on_delete=models.CASCADE)
    Aulas = models.ManyToManyField(Aula)
    def __str__(self):
        return "Pessoa {} na aula {} com presença {}".format(self.Pessoas, self.Aulas, self.Contador)
