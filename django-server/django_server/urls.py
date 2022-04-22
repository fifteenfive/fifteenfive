"""django_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from home import views

urlpatterns = [
    path('data/admin/', admin.site.urls),
    path('data/usercf/<user>/', views.userCF_save),  # 1. 유저 회원가입 시 <user>에 user_id   2. 주기적 실행 시 <user>에 'fetch_all'
    path('data/itemcf/fetch_all/', views.itemCF_save)  # 주기적 실행
]
