# Generated by Django 3.2.11 on 2023-10-27 22:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CardRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_type', models.CharField(choices=[('China Union Pay', 'China Union Pay'), ('Dollar Card', 'Dollar Card'), ('Master Card', 'Master Card'), ('Visa Card', 'Visa Card')], max_length=20)),
                ('is_approved', models.BooleanField(default=False)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Card Request',
                'verbose_name_plural': 'Card Request',
            },
        ),
        migrations.CreateModel(
            name='CardDetails',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_type', models.CharField(choices=[('V', 'Visa'), ('M', 'Mastercard'), ('D', 'Discover'), ('A', 'American Express')], max_length=255)),
                ('card_number', models.SlugField(max_length=255)),
                ('expiry_date', models.DateField()),
                ('cvv', models.CharField(max_length=3)),
                ('card_owner', models.CharField(blank=True, max_length=255)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Card Credentials',
                'verbose_name_plural': 'Card Credentials',
            },
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('card_type', models.CharField(choices=[('China Union Pay', 'China Union Pay'), ('Dollar Card', 'Dollar Card'), ('Master Card', 'Master Card'), ('Visa Card', 'Visa Card')], max_length=20)),
                ('card_number', models.CharField(max_length=16, unique=True)),
                ('expire_date', models.DateField()),
                ('cvv', models.CharField(max_length=3)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-date_created',),
            },
        ),
    ]
