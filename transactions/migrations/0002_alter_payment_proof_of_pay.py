# Generated by Django 3.2.11 on 2023-10-28 05:56

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('transactions', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='proof_of_pay',
            field=cloudinary.models.CloudinaryField(default=None, max_length=255, verbose_name='image'),
        ),
    ]
