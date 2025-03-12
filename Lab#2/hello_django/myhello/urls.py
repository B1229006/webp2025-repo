from django.urls import path
from . import views

urlpatterns = [
    #path('', views.HelloApiView.as_view(),name='index'),  # 定義 API 路由
    path('add', views.add_post,name='add_post'),
    path('list', views.list_post,name='list_post'),
]
