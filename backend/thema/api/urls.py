# I just created this file to test out views

from django.urls import path
from . import views

urlpatterns = [
    path("hello", views.helloWorld),
]
