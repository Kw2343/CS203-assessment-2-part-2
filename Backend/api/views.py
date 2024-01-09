from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework.response import Response
from .models import *
from rest_framework import generics


def home(request):
    return HttpResponse("This is the homepage")

class ProjectManagerViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = ProjectManager.objects.all()
    serializer_class = ProjectManagerSerializer 
    
    def list(self, request):
        queryset = ProjectManager.objects.all()
        serializer = self.serializer_class(queryset, many = True)
        return Response(serializer.data)
       
class GameViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def list(self, request):
        queryset = Game.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)      

class ProjectViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer 
    
    def list(self, request):
        queryset = Project.objects.all()
        serializer = self.serializer_class(queryset, many = True)
        return Response(serializer.data)
       

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data)
        else:
            return Response(serializer.errors, status=400)
        

    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)
       

    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response (serializer.data)
        else:
            return Response(serializer.errors, status=400)
       

    def destroy(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)

class CreateThreadView(generics.CreateAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

class ThreadViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

    def list(self, request):
        queryset = Thread.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        thread = self.queryset.get(pk=pk)
        serializer = self.serializer_class(thread)
        return Response(serializer.data)

    def update(self, request, pk=None):
        thread = self.queryset.get(pk=pk)
        serializer = self.serializer_class(thread, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        thread = self.queryset.get(pk=pk)
        thread.delete()
        return Response(status=204)
    
class CommentViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class ThreadViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()

    def perform_destroy(self, instance):
        instance.delete()
