# Generated by Django 2.0.dev20170314235856 on 2017-06-05 15:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('facebook', '0010_auto_20170602_1535'),
    ]

    operations = [
        migrations.CreateModel(
            name='Dietdata',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('height', models.IntegerField()),
                ('weight', models.IntegerField()),
                ('step', models.IntegerField()),
                ('calrorie', models.IntegerField()),
                ('author', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='dietdata', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('created', 'author', 'height', 'weight', 'step', 'calrorie'),
            },
        ),
    ]