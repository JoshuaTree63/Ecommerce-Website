from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Prodouct


class ProdouctSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prodouct
        fields = '__all__'