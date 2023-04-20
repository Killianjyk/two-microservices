# Generated by Django 4.0.3 on 2023-04-20 02:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='binvo',
            old_name='description',
            new_name='closet_name',
        ),
        migrations.RemoveField(
            model_name='shoe',
            name='bin_location',
        ),
        migrations.AddField(
            model_name='shoe',
            name='bins',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bins', to='shoes_rest.binvo'),
        ),
    ]
