from rest_framework import serializers

from .models import Cart
from .models import adminproduct
from .models import Usersignup
from .models import Useradress
from .models import ProductImages
from .models import Wishlist
from .models import BuyProduct

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
        
class wishlistserializer(serializers.ModelSerializer):
    product_name=serializers.CharField(source="product.name",read_only=True)
    product_price=serializers.CharField(source='product.price',read_only=True)
    product_description=serializers.CharField(source='product.description',read_only=True)
    product_image=serializers.ImageField(source='product.image',read_only=True)
    product_stock=serializers.CharField(source='product.stock_count',read_only=True)
    product_id=serializers.ReadOnlyField(source='product.id',read_only=True)
    
    class Meta:
        model=Wishlist
        fields="__all__"
        
class buyingserializer(serializers.ModelSerializer):
    class Meta:
        model= BuyProduct
        fields= "__all__"
    