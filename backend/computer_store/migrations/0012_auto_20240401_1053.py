# Generated by Django 4.2 on 2024-04-01 02:53
# name  : pakusadewa
# date  : 1 April 2024
# change: Drop all dummy function


from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('computer_store', '0011_auto_20240401_1052'),
    ]

    operations = [
        migrations.RunSQL(
            """
            DROP FUNCTION cart_get_all_by_user_id_1;
            DROP FUNCTION cart_get_all_by_user_id;
            DROP FUNCTION tes45;
            DROP FUNCTION tes46;
            DROP FUNCTION tes47;
            DROP FUNCTION tes48;
            DROP FUNCTION tes49;
            DROP FUNCTION tes50;
            """
        )
    ]
