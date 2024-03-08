from django.urls import path
from computer_store.views import LogIn, SignUp, LogOut

urlpatterns= [
    path('login', LogIn.as_view()),
    path('signup', SignUp.as_view()),
    path('logout', LogOut.as_view())
]