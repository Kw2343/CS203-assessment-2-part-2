from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('project', ProjectViewset, basename='project')  
router.register('projectmanager', ProjectManagerViewset, basename='projectmanager')  
router.register('game', GameViewset, basename='game')  
router.register('thread', ThreadViewset, basename='thread')
router.register('comment', CommentViewset, basename='comment')
urlpatterns = router.urls



#urlpatterns = [   
#   path('', home)
#]

