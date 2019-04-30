from rest_framework.generics import ListAPIView
from .serializer import ListSerializer,CardSerializer
from .models import List, Card

class ListApi(ListAPIView):
    queryset = List.objects.all()
    serializer_class = ListSerializer

class CardApi(ListAPIView):
    query = Card.objects.all()
    serializer_class = CardSerializer