from rest_framework import serializers
from django.db.models import Sum
from .models import Cart
from .models import adminproduct
from .models import Usersignup
from .models import Useradress
from .models import ProductImages
from .models import Wishlist
from .models import BuyProduct
from .models import Category
from.models import Coupen
from.models import Reviewpage
class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'
        

class Serializer(serializers.ModelSerializer):
    class Meta:
        model = adminproduct
        fields = '__all__'
        
class Cartserializer(serializers.ModelSerializer):
    order_count = serializers.IntegerField(source='order_Count', read_only=True)  
    order_totalprice=serializers.IntegerField(source="order_Totalprice",read_only=True)
    class Meta:
        model = Usersignup
        fields = "__all__"

class Userserializer(serializers.ModelSerializer):
    class Meta:
        model= Useradress
        fields= "__all__"


class Productserializer(serializers.ModelSerializer):
    totalname = serializers.SerializerMethodField()
    class Meta:
        model= ProductImages
        fields=["id","image","product_id","totalname"]
        
    def get_totalname(self,obj):
        name=adminproduct.objects.filter(id=obj.product_id).first()
        name=name.name
        return name
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
    
class Categoryserializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields="__all__"
        
class Coupenserializer(serializers.ModelSerializer):
    class Meta:
        model=Coupen
        fields="__all__"
        
class Reviewserializer(serializers.ModelSerializer):
    totalprice = serializers.SerializerMethodField()
    image=serializers.SerializerMethodField()
    totalcount=serializers.SerializerMethodField()
    
    
    class Meta:
        model=Reviewpage
        fields=["stars","date","product_id","user_id","name","totalprice","image","totalcount"]
        
    def get_totalprice(self, obj):
        total = BuyProduct.objects.filter(user=obj.user).aggregate(Sum('totalprice'))
        totalprice = total.get('totalprice__sum', 0)
       
        return totalprice or 0
    def get_image(self,obj):
         images=adminproduct.objects.filter(id=obj.product_id).first()
         image=images.image
         return image.url
    
    def get_totalcount(self,obj):
        totalcount=Reviewpage.objects.filter(user=obj.user).count()
        return totalcount