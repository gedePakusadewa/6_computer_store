from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, ProductSerializer, CartSerializer,CartDetailSerializer
from rest_framework import status, generics
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

from django.shortcuts import get_object_or_404

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.conf import settings

import requests
from django.http import JsonResponse

# from rest_framework.parsers import MultiPartParser, FormParser
from .models import ProductModel, CartModel

from django.db import connection

class LogIn(generics.GenericAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        user = get_object_or_404(User, username=request.data['username'])

        if not user.check_password(request.data['password']):
            return Response({"detail":"Not Found"}, status=status.HTTP_404_NOT_FOUND)

        token, created = Token.objects.get_or_create(user=user)
        serializer = UserSerializer(instance=user)

        return Response({"token":token.key, "user":serializer.data})

class SignUp(generics.GenericAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data['password'])
            user.save()
            token = Token.objects.create(user=user)

            return Response({"token":token.key, "user":serializer.data})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogOut(generics.GenericAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:
            request.user.auth_token.delete()
        except:
            pass

        return Response(
            {"Success":"Success Log Out"},
            status=status.HTTP_200_OK
        )

class ProductImage(generics.GenericAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer
    # parser_classes = (MultiPartParser, FormParser)
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    #http://localhost:8000/media/images/Screenshot_2023-11-23_073706.png
    
    def post(self, request):
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({"image_url":serializer.data})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        serializer = self.serializer_class(self.queryset.all(), many=True)

        return Response(serializer.data)

class ProductDetail(generics.GenericAPIView):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer
    # parser_classes = (MultiPartParser, FormParser)
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        
        product = get_object_or_404(ProductModel, pk=request.GET.get('pk'))
        serializer = self.serializer_class(instance=product)

        return Response({"product_detail":serializer.data}) 

class Profile(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = Token.objects.get(key=request.auth.key).user_id
        user = User.objects.get(pk=user_id)

        if not user:
            return Response(
                {
                    "message":"User not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = self.serializer_class(instance=user)

        return Response({"user":serializer.data})

class Cart(generics.GenericAPIView):
    queryset = CartModel.objects.all()
    serializer_class = CartSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = Token.objects.get(key=request.auth.key).user_id
        user = User.objects.get(pk=user_id)

        if user:
            product = ProductModel.objects.get(pk=request.data['product_pk'])
            
            if product:

                product_data = {
                    "user" : user_id,
                    "product" : request.data['product_pk'],
                    "created_date" : "2024-03-18",
                    "total_order" : request.data['total_order']
                }

                serializer = self.serializer_class(data=product_data)

                if  serializer.is_valid():
                    serializer.save()

                    return Response(status=status.HTTP_200_OK)
                
                return Response(
                        {
                            "message":"Can not save product"
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
            return Response(
                    {
                        "message":"Product not found"
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

        return Response(
                {
                    "message":"User not found"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def get(self, request):
        user_id = Token.objects.get(key=request.auth.key).user_id
        user = User.objects.get(pk=user_id)
        
        if user:
            db_helper = DB_helper()
            carts = self.convert_list_to_dict(db_helper.function_get_all("cart_get_all_by_user_id("+str(user_id)+")"))

            serializer = CartDetailSerializer(instance=carts, many=True)
            
            return Response({"cart_products":serializer.data}) 

        return Response(
                {"message":"User not found"},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    def convert_list_to_dict(self, list_data):
        temp_dict = {}
        temp_list = []
        for item in list_data:
            temp_dict["name"] = item[0]
            temp_dict["image_url"] = item[1]
            temp_dict["price"] = item[2]
            temp_dict["total_order"] = item[3]
            temp_list.append(temp_dict)

        return temp_list

#TODO:
    #find a new structure to place db helper
    #search what is connection, connection.cursor, cursor.execute, cursor.fetahcall()
    #is there alternative to this?
class DB_helper():
    def function_get_all(self, function_name):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM "+ function_name +";")
            row = cursor.fetchall()

        return row
    



