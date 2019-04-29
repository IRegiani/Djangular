# Generated by Django 2.2 on 2019-04-22 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('serve', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Administrador',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=120)),
                ('Email', models.CharField(max_length=50)),
                ('Phone', models.CharField(max_length=14)),
                ('Password', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='pessoa',
            name='Ativo',
            field=models.BooleanField(default=False),
        ),
    ]