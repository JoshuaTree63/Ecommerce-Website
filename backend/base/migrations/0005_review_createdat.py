# Generated by Django 4.1.7 on 2023-09-26 17:00

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("base", "0004_product_remove_orderitem_prodouct_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="review",
            name="createdAt",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
    ]
