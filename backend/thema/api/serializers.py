from django.contrib.auth.models import Group, User
from thema.api.models import Production, Theatre, Venue, Season, Booking, ShowDate, Ensemble
from thema.api.models import Artist, ToDo
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class ProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Production
        fields = '__all__'


class TheatreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theatre
        fields = '__all__'


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'


class SeasonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Season
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'


class ShowDateSerializer(serializers.ModelSerializer):
    # also include venue name and theatre name
    venue_name = serializers.CharField(source="venue.name", read_only=True)
    theatre_name = serializers.CharField(source="theatre.name", read_only=True)

    class Meta:
        model = ShowDate
        fields = '__all__'


class EnsembleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ensemble
        fields = '__all__'


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = '__all__'


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'
