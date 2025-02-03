from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from app.models  import * 
from django.core.management.utils import get_random_secret_key 
import json
from django.contrib.auth.models import User
# Create your views here.
from .cartserializer import CartSerializer
from .cartserializer import Serializer
from django.contrib.auth.hashers import make_password

@api_view(['POST'])
def adminlog(request):
    data=request.data;
    username=data.get("username")
    password=data.get("password")
    user =authenticate(request,username=username,password=password)
    SECRETKEY = get_random_secret_key()
    
    print(SECRETKEY) 
    
    CheckUser.objects.create(key=SECRETKEY,user=user)
    if(user):
        return JsonResponse({"message":"recieved succesfully","key":SECRETKEY})
      
    else:
        return JsonResponse({"error":"somethingwrong"})
    
@api_view(['POST'])  
@parser_classes([MultiPartParser, FormParser])
def productAdd(request):
    try:
        data=request.data;
        name=data.get("name")
        price=data.get('price')
        category=data.get('category')
        image=data.get('image')
        product=adminproduct.objects.create(name=name,price=price,category=category,image=image)
        return JsonResponse({'message':"succesfull"})
    except Exception as e:
        print(e)
        return JsonResponse({"error":f"something went wrong:{str(e)}"})
    
@csrf_exempt  
def productsget(request):
    try:
        data = json.loads(request.body)
        product=data.get('product')
        products=adminproduct.objects.filter(category=product)
        if products.exists():
            products_list=list(products.values())
            print("hi")
            return JsonResponse({"products":products_list})
        else:
            return JsonResponse({"error":"no match"})   
    except Exception as  e:
        return JsonResponse({"error":"wrong"})
    
@csrf_exempt       
def check_user(request):
    try:
        data = json.loads(request.body)
        print(data) 
        username=data.get('username')
        key=data.get('key')
        print(username)
        if User.objects.filter(username=username).exists():
            user = User.objects.get(username=username)
            if CheckUser.objects.filter(user=user,key=key).exists():
                return JsonResponse({'message':True})
            else:
                return JsonResponse({"error":False})
        
        return JsonResponse({"error":False})
    except Exception as e:
        print(e)
        return JsonResponse({'error':"something went wrong"}) 
    
@api_view(['POST'])   
def logout(request):
   try: 
        print("hdsddfdsf")
        data=request.data; 
        print(data)
        if(data):
            print("jay sree ram")
            CheckUser.objects.all().delete()
            return JsonResponse({'message':"succefully logout"})    
        else:
            return JsonResponse({'error':"something went wrong"})    
   except Exception as e:
       print(e) 
       return JsonResponse({"errors":"not good"})       
   
@api_view(['POST'])    
def cart(request):
    try:
        print("hello here") 
        data=request.data;
        id=data.get('id')
        print("your id",id)
        product=adminproduct.objects.get(id=id)
        # price=adminproduct.objects.get(id=id)
        if Cart.objects.filter(product=product).exists():
            print('ssss')
            cart=Cart.objects.get(product=product)
            cart.quantity+=1
            cart.totalprice+=float(product.price) 
            cart.save()
        else:    
            price=product.price
            image=product.image
            name=product.name
            stock_count=product.stock_count
            print("stock_count",product.stock_count)
            Cart.objects.create(product=product,totalprice=price,image=image,name=name,stock_count=stock_count) 
        return JsonResponse({"message":"succesfull"})
    except Exception as e:
        print(e)
        return JsonResponse({'error':"wrong"})
    
    
    
# {count.............................. for stock}
@api_view(['POST']) 
def count(request):
    try:
        count=adminproduct.objects.count()
        print("count =",count)
        return JsonResponse({"message":count})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"something wrong"})



# take product for the cartpage
@api_view(["POST"])
def getproduct(request):
     count=Cart.objects.count()
     print('herecount=',count)
     if(count==0):
         return JsonResponse({"nothing":"no product in add cart"})
     else:
         store=Cart.objects.all()
         serializer=CartSerializer(store,many=True)
         print(serializer.data)  
         return JsonResponse({"data":serializer.data},safe=False)    

@api_view(["POST"])
def getcart(request):
    store=Cart.objects.all()
    serializer=CartSerializer(store,many=True)
    return JsonResponse({"data":serializer.data},safe=False)    
    
    
@api_view(["POST"])
def deleteCart(request):
     try:
        data=request.data;
        id=data.get('id')
      
        cartproducts=Cart.objects.get(id=id)
        cartproducts.delete()
        store=Cart.objects.all()
        serializer=CartSerializer(store,many=True)
        return JsonResponse({"data":serializer.data,'message':"cart item removed sexesfully"},safe=False)  
         
     except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
        
#   oredrss  taking view     
@api_view(["POST"])
def order(request):
    try:
        data=request.data;
        id=data.get('id');
        print("the id",id)
        productss=Cart.objects.get(id=id)
        # assigning datas to oredr
        product_id=productss.product_id
        product_quantity=productss.quantity
        total_price=productss.totalprice
        
        
        # ended
        print("product id",product_id)
        stock_count=productss.stock_count
        print("stock_count",stock_count)
        if(stock_count==0):
            print("out of stock")
            return JsonResponse({"error":"out of stock"})
        else:
            stock_count -= 1
            print("stock_count",stock_count)
            stocks=Cart.objects.filter(product_id=product_id).update(stock_count=stock_count)
            adminproduct.objects.filter(id=product_id).update(stock_count=stock_count)
            print("stock",stocks)
            print("update stock count",stock_count)
            Orders.objects.create(product=productss,stock_count=stock_count,quantity=product_quantity,totalprice=total_price)
            return JsonResponse({"message":"everything seems fine"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"wrong":"something went wrong"})
            
            
@api_view(["POST"])
def orderCount(request):
    try:
        count=Orders.objects.count()
        print("totalcount",count)
       
        
        return JsonResponse({"data":count})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"something went wrong"})
    
    
    
#  getadmin product   

@api_view(["POST"])
def adminProduct(request):
    try:
      
        data=adminproduct.objects.all()
     
        serializer=Serializer(data,many=True)
        
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({'error':"full of error"})
    
    
@api_view(["POST"])
def onDelete(request):
    try:
        data=request.data;
        id=data.get("id")
        product=adminproduct.objects.get(id=id)
        product.delete()
        data=adminproduct.objects.all()
        serializer=Serializer(data,many=True)
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"something went wrong"})    
    
@api_view(["POST"])
def productAdds(request):
    try:
        data=request.data
        print("datas:",data)
        name=data.get("productName")
        category=data.get("productcategory")
        discount=data.get("productdiscount")
        price=data.get("price")
        stock=data.get("productstock")
        image=data.get("productimage")
        adminproduct.objects.create(name=name,category=category,price=price,discount=discount,stock_count=stock,image=image)
        print("succesfully")
        return JsonResponse({"message":"succesfully created"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"something went wrong"})
    
    
@api_view(["POST"])
def updates(request):
    try:
        print ("ivida ethi")
        data=request.data
        id=data.get('id')
        productname=data.get("productname",None)
        updatediscount=data.get("updatediscount",None)
        updateimage=data.get("updateimage",None)
        updatestock=data.get("updatestock",None)
        updateprice=data.get("updateprice",None)
        selecteditem=data.get("selectedItem",None)
        print("id",id)
        print(selecteditem)
        # int(updateprice)
        # int(updatestock)
        productget=adminproduct.objects.get(id=id)
        print(updateprice)
        print(updateimage)
        print(productget) 
        # float(updatediscount)
        if productname:
             productget.name=productname
        if updateimage and updateimage != 'null':
            productget.image=updateimage
        if selecteditem:
            productget.category=selecteditem    
        if updatediscount:
            productget.discount=updatediscount 
        if updateprice:
            productget.price=updateprice
        if updatestock:
            productget.stock_count=updatestock
        productget.save()
       
        return JsonResponse({"message":"recieved succesfully"})
    except Exception as e:
        print("error as e",e)
        return JsonResponse({"error":"something went wrong here"})
    
    
    
@api_view(["POST"])
def getproductfirst(request):
    try:
        print("ethi")
        data=json.loads(request.body)
        id=data.get("id")
        print("your id",id)
        productdetails=adminproduct.objects.get(id=id)
        print(productdetails)
        serializer=Serializer(productdetails)
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"something is wrong"})
    
    
@api_view(["POST"])
def usersignup(request):
    try:
     
         data=request.data
         print(data)
         username=data.get("username")
         phonenumber=data.get("phonenumber")
         password=make_password(data.get("userpass"))
         confirmpass=make_password(data.get("confirmpass"))
         email=data.get("useremail")
         if Usersignup.objects.filter(email=email).exists():
             print("hello macha")
             return JsonResponse({"data":"the email field"})
         else:  
            Usersignup.objects.create(name=username,phonenumber=phonenumber,email=email,pasword=password,confirmpasword=confirmpass)
            return JsonResponse({"message":"recieved succesfully"})
    except Exception as e:
        print("the error",e)
        return JsonResponse({"error":"the fault"})
    
    
@api_view(["POST"])
def userLog(request):
    try:
        print("cccccccc")
        data=request.data
        print(data)
        usermail=data.get("usermail")
        userpass=data.get("userpass")
        getuser= Usersignup.objects.get(email=usermail)
        if getuser:
           id=getuser.id
           password=getuser.pasword
           if password == userpass:
                return JsonResponse({"message":"eeeeeeeeeeeee"})
           else:
               return JsonResponse({"error":"wrong"})    
     
    except Exception as e:
        print ("error",e)       
        return JsonResponse({"Error":"wsdddgdsg"})