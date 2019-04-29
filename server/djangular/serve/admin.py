from django.contrib import admin

from .models import Administrador, Pessoa, Curso, Aula, Turma, ColaboradorTurma, PessoaAula

# Register your models here.
admin.site.register(Administrador)
admin.site.register(Pessoa)
admin.site.register(Curso)
admin.site.register(Aula)
admin.site.register(Turma)
admin.site.register(ColaboradorTurma)
admin.site.register(PessoaAula)