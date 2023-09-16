from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from django.contrib.auth.models import User
from base.models import Prodouct
from base.serializers import ProdouctSerializer

# Create your views here.


from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    products = Prodouct.objects.all()
    serializer = ProdouctSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Prodouct.objects.get(_id=pk)
    serializer = ProdouctSerializer(product, many=False)
    return Response(serializer.data)
