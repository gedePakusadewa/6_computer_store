from django.urls import path
from computer_store.views import LogIn, SignUp, LogOut, ProductImage, ProductDetail

urlpatterns= [
    path('login', LogIn.as_view()),
    path('signup', SignUp.as_view()),
    path('logout', LogOut.as_view()),
    path('productimage', ProductImage.as_view()),
    path('productdetail', ProductDetail.as_view())
]