# Generated by Django 2.0.dev20170314235856 on 2017-05-29 04:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('facebook', '0005_follow'),
    ]

    operations = [
        migrations.AlterField(
            model_name='follow',
            name='follow',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='follow_follow', to=settings.AUTH_USER_MODEL),
        ),
    ]
