from rest_framework import serializers

from .models import Cart
from .models import adminproduct

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        

class Serializer(serializers.ModelSerializer):
    class Meta:
        model = adminproduct
        fields = '__all__'