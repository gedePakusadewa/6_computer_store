# Generated by Django 4.2 on 2024-04-01 03:00
# author  : pakusadewa
# date  : 1 April 2024
# change: Drop function cart_get_all_by_user_id_1 because it has wrong name

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('computer_store', '0013_auto_20240401_1058'),
    ]

    operations = [
        migrations.RunSQL(
            """
            DROP FUNCTION cart_get_all_by_user_id_1;
            """
        )
    ]
