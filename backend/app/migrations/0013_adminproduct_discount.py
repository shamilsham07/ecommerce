# Generated by Django 5.1.3 on 2025-01-22 06:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0012_alter_orders_product"),
    ]

    operations = [
        migrations.AddField(
            model_name="adminproduct",
            name="discount",
            field=models.DecimalField(
                blank=True, decimal_places=2, max_digits=5, null=True
            ),
        ),
    ]
