# Generated by Django 4.2 on 2023-11-09 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companies',
            name='slug',
            field=models.SlugField(blank=True, editable=False, null=True, unique=True),
        ),
    ]
