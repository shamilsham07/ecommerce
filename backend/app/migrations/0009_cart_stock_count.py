# Generated by Django 5.1.3 on 2025-01-17 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0008_adminproduct_stock_count_alter_cart_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="cart",
            name="stock_count",
            field=models.IntegerField(default=0),
        ),
    ]
