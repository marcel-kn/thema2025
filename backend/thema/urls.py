"""
URL configuration for thema project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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

from django.urls import include, path
from rest_framework import routers

from thema.api import views
from thema.api.views import BookingDetailsView

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)
router.register(r'productions', views.ProductionViewSet)
router.register(r'theatres', views.TheatreViewSet)
router.register(r'venues', views.VenueViewSet)
router.register(r'seasons', views.SeasonViewSet)
router.register(r'bookings', views.BookingViewSet)
router.register(r'showdates', views.ShowDateViewSet)
router.register(r'ensembles', views.EnsembleViewSet)
router.register(r'artists', views.ArtistViewSet)
router.register(r'todos', views.ToDoViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include('thema.api.urls')),
    path('bookingdetails/<int:booking_id>/', BookingDetailsView.as_view(), name='booking-details'),
]
