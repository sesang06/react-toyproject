# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-06-02 15:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facebook', '0009_auto_20170602_1337'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagearticle',
            name='image',
            field=models.ImageField(max_length=255, upload_to='uploads/%Y/%m/%d/'),
        ),
    ]