# Generated by Django 4.2 on 2023-12-20 10:45

import apps.projects.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('companies', '__first__'),
    ]

    operations = [
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('project_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=256)),
                ('description', models.TextField()),
                ('phase', models.TextField(choices=[('I', 'Initiation'), ('P', 'Planning'), ('E', 'Execution'), ('C', 'Closed')], default='I')),
                ('start_date', models.DateField()),
                ('finish_date', models.DateField()),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='companies.companies')),
            ],
            options={
                'db_table': 'projects',
            },
        ),
        migrations.CreateModel(
            name='ProjectDivision',
            fields=[
                ('division', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=256)),
                ('description', models.TextField()),
                ('file', models.FileField(null=True, upload_to=apps.projects.models.get_upload_path)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.projects')),
            ],
            options={
                'db_table': 'project_divisions',
            },
        ),
    ]
