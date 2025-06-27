from django.test import TestCase

# Create your tests here.

from .models import Booking, Production, Season


# A first test could look like this
class BookingModelTest(TestCase):
    # Prepare test
    def setUp(self):
        season = Season.objects.create(name="Spielzeit23/24")
        production = Production.objects.create(name="Test Production")
        self.booking = Booking.objects.create(season=season, production=production)

    def test_booking_creation(self):
        self.assertIsNotNone(self.booking.id)
        self.assertEqual(self.booking.production.name, "Test Production")
