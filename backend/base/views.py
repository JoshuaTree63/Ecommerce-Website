from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Prodouct
from .products import products
from .serializer import ProdouctSerializer



# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products',
        '/api/products/create',
        '/api/products/upload',
        '/api/products/<id>/reviews',
        '/api/products/top',
        '/api/products/<id>',
    ]

    return Response(products)


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


