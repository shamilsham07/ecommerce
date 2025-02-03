from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class adminproduct(models.Model):
    name=models.CharField(blank=True,null=True,max_length=300)
    price = models.TextField(blank=True,null=True)
    image=models.ImageField(upload_to=('images/'), height_field=None, width_field=None, max_length=None)
    category=models.CharField(blank=True,null=True,max_length=300)
    stock_count=models.PositiveIntegerField(default=0)
    discount=models.DecimalField(max_digits=5, decimal_places=2, blank=True, default=0)
    def __str__(self):
         return self.name
    
class CheckUser(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    date=models.DateTimeField(auto_now=True)
    key=models.TextField()
    
    def __str__(self):
        return self.user


class Cart(models.Model):
    product=models.ForeignKey(adminproduct,on_delete=models.CASCADE)
    quantity=models.IntegerField(default=1)
    totalprice=models.FloatField()
    image=models.ImageField(upload_to=('images/'), height_field=None, width_field=None, max_length=None,blank=True,null=True)
    name=models.CharField(blank=True,null=True,max_length=300)
    stock_count=models.PositiveIntegerField(default=0)
    
    
class Orders(models.Model):
        product=models.ForeignKey(Cart,on_delete=models.CASCADE)
        quantity=models.IntegerField(default=0)
        totalprice=models.FloatField()
        stock_count=models.PositiveIntegerField(default=0)
       
class Usersignup(models.Model):
    name=models.CharField(max_length=255) 
    phonenumber=models.IntegerField() 
    email=models.EmailField(max_length=254)
    pasword=models.CharField(max_length=10)
    confirmpasword=models.CharField(max_length=10)
    is_active=models.BooleanField(default=True)
      