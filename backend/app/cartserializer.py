from rest_framework import serializers

from .models import Cart
from .models import adminproduct
from .models import Usersignup
from .models import Useradress
from .models import ProductImages

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        

class Serializer(serializers.ModelSerializer):
    class Meta:
        model = adminproduct
        fields = '__all__'
        
class Cartserializer(serializers.ModelSerializer):
    class Meta:
        model = Usersignup
        fields = "__all__"

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model= Useradress
        fields= "__all__"


class Productserializer(serializers.ModelSerializer):
    class Meta:
        model= ProductImages
        fields="__all__"