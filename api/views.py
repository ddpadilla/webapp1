from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer
from django.shortcuts import render


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer



def mostrar_formulario(request):
    return render(request, 'formulario.html')
