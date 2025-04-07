from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum


# Create your models here.


class adminproduct(models.Model):
    name=models.CharField(blank=True,null=True,max_length=300)
    price = models.TextField(blank=True,null=True)
    image=models.ImageField(upload_to=('images/'), height_field=None, width_field=None, max_length=None)
    category=models.CharField(blank=True,null=True,max_length=300)
    stock_count=models.PositiveIntegerField(default=0)
    discount=models.DecimalField(max_digits=5, decimal_places=2, blank=True, default=0)
    description=models.TextField(blank=True,null=True)
    def __str__(self):
         return self.name
     
     

class ProductImages(models.Model):
    product=models.ForeignKey(adminproduct,on_delete=models.CASCADE,blank=True,null=True)
    image=models.ImageField(upload_to=('images/'), height_field=None, width_field=None, max_length=None)
    def __str__(self):
        return self.product.name
     
     
    
class CheckUser(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    date=models.DateTimeField(auto_now=True)
    key=models.TextField()
    
    def __str__(self):
        return self.user



    
    

       
class Usersignup(models.Model):
    name=models.CharField(max_length=255) 
    phonenumber=models.IntegerField() 
    email=models.EmailField(max_length=254)
    pasword=models.TextField()
    is_active=models.BooleanField(default=True)
    
     
    def __str__(self):
         return self.name
     
    @property
    def order_Count(self):
       order_count= BuyProduct.objects.filter(user=self).count()
       return order_count
   
    @property
    def order_Totalprice(self):
        total_price = BuyProduct.objects.filter(user=self).aggregate(total=Sum('totalprice'))
        return total_price['total'] or 0 
     
class Cart(models.Model):
    product=models.ForeignKey(adminproduct,on_delete=models.CASCADE)
    quantity=models.IntegerField(default=1)
    price=models.FloatField()
    totalprice=models.FloatField(blank=True,null=True,default=0)
    image=models.ImageField(upload_to=('images/'), height_field=None, width_field=None, max_length=None,blank=True,null=True)
    name=models.CharField(blank=True,null=True,max_length=300)
    stock_count=models.PositiveIntegerField(default=0)
    user=models.ForeignKey(Usersignup,on_delete=models.CASCADE)
    
    # def save(self,*args, **kwargs):
    #     if self.product:
    #         self.stock_count=self.product.stock_count
    #     super(Cart, self).save(*args, **kwargs)
            
            
    
    
class Orders(models.Model):
        product=models.ForeignKey(Cart,on_delete=models.CASCADE)
        quantity=models.IntegerField(default=0)
        totalprice=models.FloatField()
        stock_count=models.PositiveIntegerField(default=0)
        
class Useradress(models.Model):
    user=models.ForeignKey(Usersignup,on_delete=models.CASCADE)
    name=models.CharField(blank=True,null=True,max_length=300)
    phonenumber=models.IntegerField()
    email=models.EmailField()
    pincode=models.IntegerField()
    city=models.TextField()
    addreass=models.TextField(blank=True)
    
    def __str__(self):
         return self.name
     

class Contactdetails(models.Model):
    firstname=models.CharField(blank=True,null=True,max_length=255)
    lastname=models.CharField(blank=True,null=True,max_length=255)
    phonenumber=models.IntegerField()
    email=models.EmailField()
    message=models.TextField(blank=True)
    
    
    
    
class Wishlist(models.Model):
    product=models.ForeignKey(adminproduct,on_delete=models.CASCADE)
    user=models.ForeignKey(Usersignup,on_delete=models.CASCADE)
    
    
class BuyProduct(models.Model):
    product=models.ForeignKey(adminproduct,on_delete=models.CASCADE)
    user=models.ForeignKey(Usersignup,on_delete=models.CASCADE)
    adreass=models.ForeignKey(Contactdetails,on_delete=models.CASCADE)
    price=models.FloatField(blank=True,null=True)
    totalprice=models.FloatField(blank=True,null=True)
    quantity=models.IntegerField(default=1)
    is_coupen=models.BooleanField(default=False)
    coupen_code=models.TextField(blank=True,null=True)
    paymentmethod=models.TextField(blank=True,null=True)
    is_orderConfirm=models.BooleanField(default=False)
    discount=models.DecimalField(default=0,blank=True,decimal_places=2,max_digits=5)
    discountedamount=models.FloatField(default=0,blank=True)
    date=models.DateField(null=True, blank=True)
    order_id=models.TextField(blank=True,null=True)
    payment_id=models.TextField(blank=True,null=True)
    name=models.TextField(blank=True,null=True)
    status=models.TextField(default="ordered",blank=True)
    image=models.ImageField(upload_to=('images/'), max_length=None,blank=True,null=True)
    
    
    
class Category(models.Model):
    categoryName=models.TextField(blank=True,null=True)
    image=models.ImageField(upload_to=('images/'), height_field=None, width_field=None, max_length=None,blank=True,null=True)
    
    
class Coupen(models.Model):
    CoupenName=models.TextField(blank=True,null=True)
    discount=models.FloatField(blank=True,null=True)
    is_active=models.BooleanField(default=True)
    

 
class Reviewpage(models.Model):
    user=models.ForeignKey(Usersignup,on_delete=models.CASCADE)
    product=models.ForeignKey(adminproduct,on_delete=models.CASCADE)
    stars=models.TextField(blank=True,null=True)
    date=models.DateField(blank=True,null=True)
    
            
        
         