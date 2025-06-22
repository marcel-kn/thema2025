from django.contrib.auth.models import Group, User
from django.http import HttpResponse
from rest_framework import permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from thema.api.models import Production, Theatre, Venue, Season, Booking, ShowDate, Ensemble, \
                             Artist, ToDo

from thema.api.serializers import GroupSerializer, UserSerializer, ProductionSerializer, \
                                  TheatreSerializer, VenueSerializer, SeasonSerializer, \
                                  BookingSerializer, ShowDateSerializer, EnsembleSerializer, \
                                  ArtistSerializer, ToDoSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all().order_by('name')
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProductionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows productions to be viewed or edited.
    """
    queryset = Production.objects.all().order_by('name')
    serializer_class = ProductionSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """
        Enables productions to be queried like this:
        http://127.0.0.1:8000/productions/?ensemble=2
        """
        queryset = Production.objects.all().order_by('name')
        ensemble_id = self.request.query_params.get('ensemble')
        if ensemble_id is not None:
            queryset = queryset.filter(ensemble=ensemble_id)
        return queryset


class TheatreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows theatres to be viewed or edited.
    """
    queryset = Theatre.objects.all().order_by('name')
    serializer_class = TheatreSerializer
    permission_classes = [permissions.AllowAny]


class VenueViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows venues to be viewed or edited.
    """
    queryset = Venue.objects.all().order_by('name')
    serializer_class = VenueSerializer
    permission_classes = [permissions.AllowAny]


class SeasonViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows seasons to be viewed or edited.
    """
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    permission_classes = [permissions.AllowAny]


class BookingViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows bookings to be viewed or edited.
    """
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]


class ShowDateViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows show dates to be viewed or edited.
    """
    queryset = ShowDate.objects.all()
    serializer_class = ShowDateSerializer
    permission_classes = [permissions.AllowAny]


class EnsembleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows show dates to be viewed or edited.
    """
    queryset = Ensemble.objects.all().order_by('name')
    serializer_class = EnsembleSerializer
    permission_classes = [permissions.AllowAny]


class ArtistViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows show dates to be viewed or edited.
    """
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [permissions.AllowAny]


class ToDoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows show dates to be viewed or edited.
    """
    queryset = ToDo.objects.all().order_by('due_date')
    serializer_class = ToDoSerializer
    permission_classes = [permissions.AllowAny]


class BookingDetailsView(APIView):
    def get(self, request, booking_id):
        booking = get_object_or_404(Booking, pk=booking_id)
        production = booking.production
        showdates = ShowDate.objects.filter(booking=booking)
        ensemble = production.ensemble

        return Response({
            "booking": BookingSerializer(booking).data,
            "production": ProductionSerializer(production).data,
            "showdates": ShowDateSerializer(showdates, many=True).data,
            "ensemble": EnsembleSerializer(ensemble).data,
        }, status=status.HTTP_200_OK)


# We configure a URL we want to support and which functions should be triggered by them
def helloWorld(request):
    return HttpResponse("Hello World!")
