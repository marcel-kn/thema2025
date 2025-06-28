from django.db import models
from datetime import date
from django.contrib.auth.models import User

# Create your models here.


class Theatre(models.Model):
    name = models.CharField(max_length=100)


class Venue(models.Model):
    name = models.CharField(max_length=100)
    seats = models.IntegerField(null=True)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)


class Season(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    # Only planning for main theatre? Then this is not desired:
    # theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)


class Booking(models.Model):
    # date = models.DateField()
    # time = models.TimeField()
    # venue = models.ForeignKey(Venue, on_delete=models.CASCADE)
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    production = models.ForeignKey('Production', on_delete=models.CASCADE)
    cost_travel = models.IntegerField(null=True)  # ? (cost of travel)
    cost_transport = models.IntegerField(null=True)  # ? (cost of transport)


class ShowDate(models.Model):
    date = models.DateField()
    time = models.TimeField()
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE)
    theatre = models.ForeignKey(Theatre, on_delete=models.CASCADE)
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE)
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    # seats_booked = models.IntegerField(null=True)  # ?


class Ensemble(models.Model):
    name = models.CharField(max_length=200)
    contact_person = models.CharField(max_length=200, null=True)
    email = models.EmailField(null=True)
    phone = models.CharField(max_length=20, null=True)
    website = models.URLField(null=True)


class Artist(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    ensemble = models.ForeignKey(Ensemble, on_delete=models.CASCADE, null=True)
    email = models.EmailField(null=True)
    phone = models.CharField(max_length=20, null=True)
    website = models.URLField(null=True)


class Production(models.Model):
    name = models.CharField(max_length=200)
    ensemble = models.ForeignKey(Ensemble, on_delete=models.CASCADE, null=True)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, null=True)
    length = models.IntegerField(null=True)
    honorar = models.IntegerField(null=True)


class ToDo(models.Model):
    text = models.CharField(max_length=200)
    due_date = models.DateTimeField()
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, null=True,
                                 related_name='assigned_todos')
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, null=True)
    creation_date = models.DateField(default=date.today)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_todos')
