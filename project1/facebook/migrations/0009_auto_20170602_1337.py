# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-06-02 13:37
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('facebook', '0008_auto_20170602_0620'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='imagearticle',
            options={'ordering': ('id', 'created', 'updated', 'author', 'image')},
        ),
        migrations.RemoveField(
            model_name='imagearticle',
            name='content',
        ),
    ]
