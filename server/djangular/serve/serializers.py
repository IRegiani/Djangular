from rest_framework import serializers

from .models import Administrador, Pessoa, Curso, Aula, Turma, ColaboradorTurma, PessoaAula

class PessoaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pessoa
        fields = '__all__'

class AdministradorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrador
        fields = '__all__'

class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curso
        fields = '__all__'

class AulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aula
        fields = '__all__'

class TurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turma
        fields = '__all__'

class ColaboradorTurmaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColaboradorTurma
        fields = '__all__'

class PessoaAulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PessoaAula
        fields = '__all__'
