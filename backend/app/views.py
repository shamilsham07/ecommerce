from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from app.models  import * 
from django.core.management.utils import get_random_secret_key 
import json
import math
from django.contrib.auth.models import User
# Create your views here.
from .cartserializer import CartSerializer
from.cartserializer import Reviewserializer
from .cartserializer import Categoryserializer
from .cartserializer import Userserializer
from .cartserializer import Serializer
from.cartserializer import Cartserializer
from.cartserializer import Productserializer
from .cartserializer import wishlistserializer
from .cartserializer import Coupenserializer
from .cartserializer import buyingserializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.conf import settings
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import random
import datetime






array=''
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
        print("the data",data)
        id=data.get('id')
        user_id=data.get("userid")
        print("userid",user_id)
        print("your id",id)
        product=adminproduct.objects.get(id=id)
        print("here your stock",product.stock_count)
        print("sss",product.id)
      
        
        if Cart.objects.filter(product=product,user_id=user_id).exists():
            print('ssss')
            cart=Cart.objects.filter(product=product,user_id=user_id).first()
            print("the cae",cart)
            print("the quant",cart.quantity)
            cart.quantity+=1
            print("jjjjj",product.stock_count)
            price=float((product.price))
          
            
            cart.totalprice=float((price)*(cart.quantity)) 
            cart.save()
            return JsonResponse({"message":"succesfull"})
            
            
        else:    
            price=product.price
            image=product.image
            name=product.name
            totalprice=price
            stock_count=product.stock_count
            
            print("stock_count",product.stock_count)
            cart=Cart.objects.create(product=product,price=price,image=image,name=name,user_id=user_id,totalprice=totalprice,stock_count=stock_count) 
            print("lllll")
            cart.save()
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
    try:
        data=request.data
        id=data.get('id')
        print("kkkjhhguigdihuewtiue",id)
        store=Cart.objects.filter(user_id=id)
        count=Cart.objects.filter(user_id=id).count()
        if store.exists():
          serializer=CartSerializer(store,many=True)
          return JsonResponse({"data":serializer.data,"count":count},safe=False)    
    except Exception as e:
        print("error as ",e)
    
@api_view(["POST"])
def deleteCart(request):
     try:
        data=request.data;
        id=data.get('id')
        print("thre",id)
        user_id=data.get("user_id")
        print(user_id)
        cartproducts=Cart.objects.filter(id=id,user_id=user_id).first()
        if cartproducts:
              cartproducts.delete()
              print("hello")
              
        store=Cart.objects.filter(user_id=user_id)
        print(store)
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
        name=data.get("name")
        category=data.get("category")
            
        discount=data.get("discount")
        price=data.get("price")
        stock=data.get("stock")
        image = request.FILES.get("image")
        otherimage = request.FILES.getlist("otherimage")
        description=data.get('description')
        print(description)
        print(discount)
        print("kkkkk",otherimage)
        product =adminproduct.objects.create(name=name,category=category,price=price,stock_count=stock,image=image,description=description,discount=discount)
      
        print("hello",product.id)
        product.save()
        for image in otherimage:
            ProductImages.objects.create(product_id=product.id,image=image)
        
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
        imageid=data.get("imageid",None)
        updatediscount=data.get("updatediscount",None)
        updateimage=data.get("updateimage",None)
        otherimage = request.FILES.getlist("otherimage")
        updatestock=data.get("updatestock",None)
        updateprice=data.get("updateprice",None)
        selecteditem=data.get("selectedItem",None)
        description=data.get("description",None)
        coverimage=request.FILES.getlist("images")
        print("cover",coverimage)
        other=request.data.get("images")
        print("id",id)
        print(selecteditem)
        print(otherimage)
        print("ccc",coverimage)
        print(",,,",other)
        productget=adminproduct.objects.get(id=id)
        cartget=Cart.objects.filter(product_id=id)
        print("caart",cartget)
      
        print(updateprice)
        print(updateimage)
        print(productget) 
        # float(updatediscount)
        
        # if coverimage:
        #     ProductImages.objects.filter(product_id=id).delete()
        #     for image in coverimage:
        #         ProductImages.objects.create(product_id=id,image=image)
     
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
            
        if description:
            productget.description=description   
        if otherimage:
            for image in otherimage:
                ProductImages.objects.create(product=productget,image=image)
        for cart in cartget:
            if productname:
                cart.name=productname
            if updateimage and updateimage != 'null':
                cart.image=updateimage
            if updatestock:
                cart.stock_count=updatestock
                print("stock")
            cart.save()
        print("heloo")
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
        arrray=[]
        getimage=ProductImages.objects.filter(product_id=id)
        print(getimage)
        for image in getimage:
            print(image.image)
            arrray.append({
                "image":image.image.url,
                "id":image.id,
                "product_id":id,
                })
        
            print("gggg",arrray)
        serializer=Serializer(productdetails)
        print(serializer.data)
        return JsonResponse({"data":serializer.data,"datas":arrray},safe=False)
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
         password=(data.get("userpass"))
         email=data.get("useremail")
         hashedpass=make_password(password)
         if Usersignup.objects.filter(email=email).exists():
             print("hello macha")
             return JsonResponse({"data":"the email field"})
         else:  
             user= Usersignup.objects.create(name=username,phonenumber=phonenumber,email=email,pasword=hashedpass)
             user.save()
             return JsonResponse({"message":"recieved succesfully"})
    except Exception as e:
        print("the error",e)
        return JsonResponse({"error":"the fault"})
    
    
@api_view(["POST"])
def userLog(request):
    try:
    
        data=request.data
       
        usermail=data.get("usermail")
        print(usermail)
        userpass=(data.get("userpass"))
        print("the pasword",userpass)
        
        getuser= Usersignup.objects.get(email=usermail)
        
        if getuser.is_active:
           id=getuser.id
           passwords=getuser.pasword
           print(passwords)
        
           if check_password(userpass, passwords):
                print("hello")
                serializer=Cartserializer(getuser)
                return JsonResponse({"data":serializer.data},safe=False)
           else:
               return JsonResponse({"error":"wrong"})  
        else:
            return JsonResponse({"nouse":"User have no permisson to login, please contact customer care"})  
     
    except Exception as e:
        print ("error",e)       
        return JsonResponse({"Error":"wsdddgdsg"})
    
@api_view(["POST"])    
def getuserdetails(request):
     try:
        
         data=request.data
         email=data.get("email")
         getuser= Usersignup.objects.get(email=email)
         serializer=Cartserializer(getuser)
         return JsonResponse({"data":serializer.data},safe=False)
         
         
     except Exception as e:
         print("error",e)
         return JsonResponse({"error":"wrong"})
     
@api_view(["POST"])         
def UserUpdate(request):
    try:
        data=request.data
        user_id=data.get("user_id")
        password=(data.get("password"))
        name=data.get("name")
        phonenumber=data.get("phonenumber")
        email=data.get('email')
        user=Usersignup.objects.filter(id=user_id).first()
        pasword=user.pasword
        if user:
            print("zzzzzzzzzzzzzzzzzzz")
            if check_password(password,pasword):
                  print("ghfgf")
                  print(user.phonenumber)
                  if name:
                      user.name=name
                  if phonenumber:
                      print(phonenumber)
                      user.phonenumber=phonenumber
                  if email:
                      user.email= email
                  user.save()    
                  return JsonResponse({"message":"succesfull"})
            else:
                return JsonResponse({"wrong":"wrong password"})      
        else:
            return JsonResponse({"nouser":"nouser"})
       
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"worng"})
    
@api_view(["POST"])         
def forgetpass(request):
    try:
        data=request.data
        email=data.get("email")
      
        print("mail",email)
        global array
       
        user=Usersignup.objects.filter(email=email).first()
        print(user)
        array=''
        if user:
            n=4
            for i in range (n):
                generatenum=(random.randint(1,9))
                generatenums=str(generatenum)
                array+="".join(generatenums)
                
            
                
            print(array)
            send_mail(
            subject='verification code',
            
            message=f"you verification code : {array}",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email]
            )
            return JsonResponse({"message":"recieved","otp":array})
        if not user:
            return JsonResponse({"error":"wrong"})
           
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
@api_view(["POST"])         
def varifyEmail(request):
    try:
        global array
        data=request.data
        otp=data.get("otp")
        print(otp,"otp")
        print("the array",array)
        if otp==array:
            return JsonResponse({"message":"set"})
        else:
            return JsonResponse({
                "error":"entho kuyapand"
            })
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
@api_view(["POST"])         
def Userconfirmpass(request):
    try:
        data=request.data
        email=data.get("email")
       
        password=data.get("password")
        print(password)
        hashpass=make_password(password)
        user=Usersignup.objects.filter(email=email).first()
       
        print("krrrr")
        print(hashpass)
        user.pasword=hashpass
        
        user.save()
        print("hjdsc")
        return JsonResponse({"message":"recieved"})
        
    except Exception as e:
        print("jiods")
        print(e)
        return JsonResponse({"error":"wrong"})
        
      
      
@api_view(["POST"])              
def adresssave(request):
    try:
        data=request.data
        name=data.get("name")
        phonenumber=data.get("phonenumber")
        email=data.get("email")
        user_id=data.get("user_id")
        addreass=data.get("addreass")
        pincode=data.get("pincode")
        city=data.get("city")
        if user_id is None:
             return JsonResponse({"error":"no user"})
        theuser=Useradress.objects.filter(user_id=user_id).all()
        print(theuser.count())
        if theuser.count()>=4:
            print("hiiiiiiiii")
            return JsonResponse({"maximum":"maximum number reached"})
        else:
            Useradress.objects.create(name=name,addreass=addreass,phonenumber=phonenumber,email=email,pincode=pincode,city=city,user_id=user_id)
            return JsonResponse({"message":"recieved successfully"})
    except Exception as e:
       print("error",e) 
       return JsonResponse({"error":"wrong"})
    
    
@api_view(["POST"])                  
def getaddreass(request):
    try:
        data = json.loads(request.body)
        user_id=data.get("user_id")
        print(user_id)
        user=Useradress.objects.filter(user_id=user_id)
        print("hh",user)
        for u in user:
            print(u.id)
        serializer=Userserializer(user,many=True) 
        print(serializer.data)
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
@api_view(["POST"])                  
def deleteaddreass(request):
    try:
        data=request.data;
        user_id=data.get("user_id")
        print("user_id",user_id)
        addreass_id=data.get("id")
        print("tttt",addreass_id)
        Useradress.objects.filter(id=addreass_id).delete()
        user=Useradress.objects.filter(user_id=user_id)
        serializer=Userserializer(user,many=True)
        print(serializer.data)
        return JsonResponse({"data":serializer.data},safe=False)
      
            
          
        
        if id:
            return JsonResponse({"message":"set"})   
        else:
            return JsonResponse({"wrong":"wwwwwww"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"errrrrrrrrrr"})
        
        
@api_view(["POST"])                  
def get4products(request):
    # productarray=[]
    product=adminproduct.objects.all()[:8]
    print(product)
    serializer=Serializer(product,many=True)
    # print(serializer.data)
    return JsonResponse({"data":serializer.data},safe=False)
    
    
    
@api_view(["POST"])
def viewAplleProducts(request):
 try:
     value="iphone";
     print("hello")
     products=adminproduct.objects.filter(category=value)
     print("hi")
     print(products)
     serializer=Serializer(products,many=True)
     return JsonResponse({"data":serializer.data},safe=False)
 
     
     
 except Exception as e:
     print("error",e)  
     return({"error":"erorrrrr"})
 
 
 
 
@api_view(["POST"])
def SamsungProducts(request):
 try:
     value="samsung";
     print("hello")
     products=adminproduct.objects.filter(category=value)
     print("hi")
     print(products)
     serializer=Serializer(products,many=True)
     return JsonResponse({"data":serializer.data},safe=False)
 
     
     
 except Exception as e:
     print("error",e)  
     return({"error":"erorrrrr"})
 
 
@api_view(["POST"])
def LaptopProducts(request):
    
    try:
        value="laptop";
        print("hello")
        products=adminproduct.objects.filter(category=value)
        print("hi")
        print(products)
        serializer=Serializer(products,many=True)
        return JsonResponse({"data":serializer.data},safe=False)   
    except Exception as e:
        print("error",e)  
        return({"error":"erorrrrr"})
    
    
    
@api_view(["POST"])
def get4samsungproduct(request):
    try:
        value="samsung";
        product=adminproduct.objects.filter(category=value)[:4]
        print(product)
        serializer=Serializer(product,many=True)
        print(serializer.data)
        return JsonResponse({"data":serializer.data},safe=False) 
    except Exception as e:
        print("error",e)
        return JsonResponse({"wrong":"something went wrong"})
    
    
@api_view(["POST"])
def get4appleproducts(request):
  try:  
    value="iphone"
    product=adminproduct.objects.filter(category=value)[:4]
    serializer=Serializer(product,many=True)
    print(serializer.data,"shdjbshbsjhfu")
    return JsonResponse({"data":serializer.data},safe=False)
  except Exception as e:
      print("error",e)
      return JsonResponse({"wrong":"something went wrong"})
      
@api_view(["POST"])
def get4laptops(request):
    try:
        value="laptop"
        product=adminproduct.objects.filter(category=value)[:4]
        serializer=Serializer(product,many=True)
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
       print("error",e)
       return JsonResponse({"wrong":"something went wrong"})
   

   
   
@api_view(["POST"]) 
def contactdetails (request):
   try:
        data=request.data
        fname=data.get('firstname')
        lname=data.get('lastname')
        email=data.get('email')
        phonenumber=data.get('phone')
        print(phonenumber)
        message=data.get("message")
        print(message)
        
        sendmail(fname,lname,email,message,phonenumber)
        contactsave=Contactdetails.objects.create(firstname=fname,lastname=lname,phonenumber=phonenumber,email=email,message=message)
        contactsave.save()
        return JsonResponse({"message":"successfull"})
   except Exception as e:
       print("error",e)
       return JsonResponse({"error":"errorrrr"})
    
 
 
 
   
def sendmail(fname,lname,email,message,phone):
    try:
        subject = "New Contact Message"
        from_email = settings.EMAIL_HOST_USER 
        to_email = "shamilsham248@gmail.com"
        fullname=f"{fname} {lname}"
        context = {
            "user_name": fullname ,
            "user_email": email,
            "user_message": message,
            "user_phone":phone,
        }
        html_content = render_to_string("email.html", context)
        text_content = strip_tags(html_content)  # Strip HTML tags for plain text

        # Create email
        email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
        email.attach_alternative(html_content, "text/html")

        # Send email
        email.send()       
    except Exception as e:
        print("hi")
        print("error",e)
    



@api_view(["POST"])
def gettheclickedproduct(request):
    try:
       data=request.data
       productId=data.get("productid")
       user_id=data.get("id")
       print(productId)
       image=ProductImages.objects.filter(product_id=productId)
       product=adminproduct.objects.get(id=productId)
       productData=Serializer(product)
       imageData=Productserializer(image,many=True) 
       print(productData.data)
       print("dgdfgfhfhfghgf",imageData.data) 
       return JsonResponse({"data":productData.data,"image":imageData.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"error"})
    


@api_view(["POST"])
def addtocart(request):
    try:
        data=request.data
        productId=data.get('id')
        userId=data.get("userid")
        Quantity=data.get("quantity")
        product=adminproduct.objects.get(id=productId)
        name=product.name
        image=product.image
        price=product.price
        stockcount=product.stock_count
       
        
        print("janson")
        print(product)
        if Cart.objects.filter(product=product,user_id=userId).exists():
           print("hello")
           
           cart=Cart.objects.filter(product=product,user_id=userId).first()
           print('hiiiiiii')
           cart.stockcount=stockcount
           if stockcount==cart.quantity:
               return JsonResponse({"stockmax":"you have already add this product now you select the more quantity then we have plaese reduce the quantity"})
           cart.quantity=+Quantity
           print(cart.quantity)
           print("hi")
           quantity=cart.quantity
           print("price")
           
           if quantity>stockcount:
             return JsonResponse({"stockmax":"you have already add this product now you select the more quantity then we have plaese reduce the quantity"})
           else:
               quantity=Quantity
               totalprice=int(quantity)*int(price)
               cart.totalprice=totalprice
               cart.save()
               return JsonResponse({"message":"successfully added"})
        else:
            quantity=Quantity
            totalprice=int(price)*int(quantity)
            print(totalprice)
            Cart.objects.create(user_id=userId,totalprice=totalprice,quantity=quantity,name=name,image=image,product_id=productId,price=price)
            return JsonResponse({"message":"recieved successfully"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
     
     
@api_view(['POST'])
def addtowishList(request):
    try:
        data=request.data
        print("shamil")
        productid=data.get("id")
        userId=data.get("userid")
        print(productid)
        print(userId)
        if productid and userId :
            wish= Wishlist.objects.create(product_id=productid,user_id=userId)
            wish.save()
            return JsonResponse({"message":"good",},safe=False)
        else:
            return JsonResponse({"error":"wrong"})
        
        
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"eroorr"})
    
    
@api_view(["POST"])
def getwhistlist(request):
    try:
        data=request.data
        productid=data.get("productid")
        userId=data.get('id')
        print(productid)
        print(userId)
        if Wishlist.objects.filter(product_id=productid,user_id=userId).exists():
            print("hello")
            return JsonResponse({"message":"recieved succesfull"})
        else:
            return JsonResponse({"wrong":"erooor"})
        
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
            
            
@api_view(["POST"])
def getWishList(request):
    try:
        data=request.data
        userid=data.get("id")
        print("the",userid)
        if userid:
            product=Wishlist.objects.filter(user_id=userid)
            details=wishlistserializer(product,many=True)
            print(details.data)
            count=Wishlist.objects.filter(user_id=userid).count()
            print(count)
            return JsonResponse({"data":details.data,"count":count})
            
        else:
           return JsonResponse({"error":"wrong"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})  
    
    
    
@api_view(["POST"])
def deleteWishList(request):
    data=request.data
    id=data.get('id')
    userid=data.get("userid")
    print(userid)
    print(id)
    if userid and id :
        
        wish=Wishlist.objects.filter(user_id=userid,product_id=id).delete()
        product=Wishlist.objects.filter(user_id=userid)
        serializer=wishlistserializer(product,many=True)
        return JsonResponse({"message":"good","data":serializer.data})
       
        
    else:
        return JsonResponse({"wrong":"no datato delete"})
    
@api_view(["POST"])    
def increaseQuantity(request):
    try:
        data=request.data
        quantity=data.get("quantity")
        productid=data.get("id")
        userid=data.get("userid")
        print("pppp",quantity)
        print("id",productid)
        print("user",userid)
        product=Cart.objects.filter(user_id=userid,id=productid).first()
        print(product)
        print(quantity)
        print(product.stock_count)
        if quantity>product.stock_count:
            serializer=CartSerializer(product)
            return JsonResponse({"error":"you have already reech our max-stock","data":serializer.data})
            
        else:
            print("hello",quantity)
            product.quantity=quantity
            print(type(product.price))
            product.totalprice=quantity*product.price
            product.save()
           
            totalprice=quantity*product.totalprice
            print(totalprice)
            return JsonResponse({"data":totalprice})
     
    except Exception as e:
        print("error as",e)
        return JsonResponse({"error":"wrong"})
        
@api_view(['POST'])
def decreaseQuantity(request):
    try:
        data=request.data
        productid=data.get("id")
        userid=data.get("userid")
        quantity=data.get("quantity")
        print(productid)
        print(userid)
        print(quantity)
        product=Cart.objects.filter(user_id=userid,id=productid).first()
        print(product)
        print(product.quantity)
        product.quantity=quantity
        product.totalprice=product.quantity*product.price
        product.save()
        return JsonResponse({"message":"recived successfully"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"error"})
    
    
@api_view(["POST"])
def getproductforbuy(request):
    try:
        data=request.data
        productid=data.get("product_id")
        user_id=data.get("userid")
        print("dd",user_id)
        print("where")
        print("llllll",productid)
        product=Cart.objects.filter(user_id=user_id,id=productid).first()
        product_id=product.product_id
        admin=adminproduct.objects.filter(id=product_id).first()
       
        print("admin",admin)
        if admin.stock_count<product.quantity:
            print(product.stock_count)
            stocks=None
        else:
            stocks=1
            print("japan")
        if not product:
            return JsonResponse({"error": "Product not found"}, status=404)
        print("hi,helelelele")
        print(product)
        print(product.quantity)
        print(product.totalprice)
        serialzer=CartSerializer(product)
        print(serialzer.data)
       
        return JsonResponse({"data":serialzer.data,"stocks":stocks},safe=False)
    except Exception as e:
        return JsonResponse({"error":"wrong"})  
    
    
@api_view(["POST"])
def buyingproduct(request):
    try:
        data=request.data
        product_id=data.get("product")[0]
        user_id=data.get("user_id")
        paymentmethod=data.get("paymentmethod")
        discount=data.get("discount")
        originalprice=data.get("originalprice")
        addreassid=data.get("addreassid")
        coupen=data.get("coupenvalue")
        coupesisactive=Coupen.objects.filter(CoupenName=coupen).first()
        
        if product_id and user_id:
            productdetails=Cart.objects.filter(user_id=user_id,id=product_id).first()
            product_name=productdetails.name
            product_image=productdetails.image
            product_price=productdetails.price
            product_quantity=productdetails.quantity
            id=productdetails.product_id
            date=datetime.date.today()
            print(date)
            print("jjj",id)
            countofproduct=adminproduct.objects.filter(id=id).first()
            stock=countofproduct.stock_count
            if stock==0:
                return JsonResponse({"outofstock":"the item is unavailable now"})
            if stock<product_quantity:
                return JsonResponse({"outofstock":"the quantity you choose cant we have only limted stock"})
            if stock>=product_quantity:
                print("good")
                
                last_order_id=BuyProduct.objects.filter(paymentmethod="COD").order_by("-order_id").first()
                print(last_order_id)
                # print(last_order_id.order_id)
                if last_order_id:
                   res=last_order_id.order_id[4:]
                   new_product_id=res
                   print("res",res)
                   new_product_id=(int(res)+1)
                   new=str(new_product_id)
                   new_id="ODR:"+new
                   new_product_id=new_id
                else:
                    new_product_id="ODR:200"
                    print("here is me")
                
                if coupen and coupesisactive.is_active:
                    price=product_quantity*product_price
                    discountedprice=discount*price/100
                    total_price=price-discountedprice
                    if paymentmethod=="COD":
                        is_order_confirm=True
                        lastpaymentid=BuyProduct.objects.filter(paymentmethod="COD").order_by("-payment_id").first()
                        print("ji")
                        if lastpaymentid:
                           res=lastpaymentid.order_id[4:]
                           newpaymentidint=(int(res)+1)
                           new=(str(newpaymentidint))
                           newpaymentid="ODR:"+new
                        else:
                            newpaymentid="ODR:200"
                    else:
                        print("hi")
                        is_order_confirm=False
                        
                    buyingproduct=BuyProduct.objects.create(product_id=product_id,user_id=user_id,adreass_id=addreassid,date=date,quantity=product_quantity,paymentmethod=paymentmethod,order_id=new_product_id,price= product_price,totalprice=total_price,is_orderConfirm=is_order_confirm,payment_id=newpaymentid,name=product_name,image=product_image,coupen_code=coupen,is_coupen=True,
                                                            discount=discount,discountedamount=discountedprice
                                                            )
                    updatecoupen=Coupen.objects.filter(CoupenName=coupen).first()
                    updatecoupen.is_active=0
                    updatecoupen.save()
                    print("hello")
                    print(user_id)
                    print(product_id)
                    Cart.objects.filter(user_id=user_id,id=product_id).delete()
                    countofproduct.stock_count=stock-product_quantity
                    
                    
                    countofproduct.save()
                    return JsonResponse({"message":"everything looks good"})
                else:
                    print("hi")
                    total_price=product_quantity*product_price
                    print("kkk",total_price)
                    print(paymentmethod)
                    if paymentmethod=="COD":
                        is_order_confirm=True
                        lastpaymentid=BuyProduct.objects.filter(paymentmethod="COD").order_by("-payment_id").first()
                        print("ji")
                        if lastpaymentid:
                           res=lastpaymentid.order_id[4:]
                           newpaymentidint=(int(res)+1)
                           new=(str(newpaymentidint))
                           newpaymentid="ODR:"+new
                           
                           print(newpaymentid)
                        else:
                            newpaymentid="ODR:200"
                    else:
                        print("hi")
                        is_order_confirm=False
                        
                    buyingproduct=BuyProduct.objects.create(product_id=product_id,user_id=user_id,adreass_id=addreassid,date=date,quantity=product_quantity,paymentmethod=paymentmethod,order_id=new_product_id,price= product_price,totalprice=total_price,is_orderConfirm=is_order_confirm,payment_id=newpaymentid,name=product_name,image=product_image)
                    print("hello")
                    print(user_id)
                    print(product_id)
                    Cart.objects.filter(user_id=user_id,id=product_id).delete()
                    countofproduct.stock_count=stock-product_quantity
                    
                    
                    countofproduct.save()
                    return JsonResponse({"message":"everything looks good"})
                    
        
       
        return JsonResponse({"message":"good"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"worng"})
    
    
    
@api_view(["POST"])
def getwishlistproductsfor(request):
    try:
        data=request.data
        id=data.get("userid")
        if id:
            print("hiIIIIIIII")
            product=Wishlist.objects.filter(user_id=id)
            print(product)
            serializer= wishlistserializer(product,many=True)
            print('------------------------------------') 
            print("hi",serializer.data)
            return JsonResponse({"data":serializer.data},safe=False)
        else:
            return JsonResponse({"error":"the error"})
    except Exception as e:
        return JsonResponse({"error":"worng"})
        
        
@api_view(["GET"])
def getadminproductcount(request):
  try:
      print("Hi")
      productcount=adminproduct.objects.count()
      reviewcount=Contactdetails.objects.count()
      userscount=Usersignup.objects.count()
      samsungproduct=adminproduct.objects.filter(category="samsung").count()
      appleproduct=adminproduct.objects.filter(category="iphone").count()
      laptopproduct=adminproduct.objects.filter(category="laptop").count()
      order=BuyProduct.objects.count()
      return JsonResponse({"message":productcount,"review":reviewcount,"order":order,"userscount":userscount,"samsungproduct":samsungproduct,"appleproduct":appleproduct,"laptopproduct":laptopproduct})
  except Exception as e:
      print("something",e)
      return JsonResponse({"error":"worng"})
  
@api_view(["POST"])
def getmyorders(request):
    try:
        data=request.data
        id=data.get("id")
       
        details=BuyProduct.objects.filter(user_id=id)
        print("............///////////////.............................")
       
        serializer=buyingserializer(details,many=True)
      
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("hello",e)      
        return JsonResponse({"error":"wrong"})  
    
    
@api_view(["POST"])
def getinvoiceproduct(request):
    try:
        data=request.data
        id=data.get("id")
        theproductdetails=BuyProduct.objects.filter(id=id)
        if not theproductdetails.exists():
            return JsonResponse({"error": "No products found"}, status=404)
        print('.//////////////////////////////////////////////.....................')
        print(theproductdetails)
        serializer=buyingserializer(theproductdetails,many=True)
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"llllllllllllllllllll"})
    
    
   
    
@api_view(["POST"])
def Createcategoy(request):
    try:
        data=request.data
        categoryname=data.get("name")
        name=''.join(categoryname.split()).lower()
        print(name)
        image=data.get('image')
        print("name is",categoryname)
        print("image",image)
        yesExits=Category.objects.filter(categoryName=name).exists()
        if yesExits:
            return JsonResponse({"alert":"the cataegory is already exists"})
        Category.objects.create(categoryName=name,image=image)
        category=Category.objects.all()
        serializer=Categoryserializer(category,many=True)
        return JsonResponse({"data":serializer.data},safe=False)
    except  Exception  as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
 
@api_view(["GET"])
def getcategory(request):
    category=Category.objects.all()
    serializer=Categoryserializer(category,many=True)
    return JsonResponse({"data":serializer.data},safe=False)
    
        
@api_view(["POST"])
def deletecategory(request):
    try:
        data=request.data
        id=data.get("id")
        print(id)
        cat=Category.objects.filter(id=id).delete()
      
        category=Category.objects.all()
        serializer=Categoryserializer(category,many=True)
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("e",e)
        return JsonResponse({"error":"worng"})
    
@api_view(["POST"])
def updatecategory(request):
    try:
        data=request.data
        id=data.get("id")
        print(id)
        name=data.get("name")
        image=data.get("image")
        print(image)
        if id:
            updateproduct=Category.objects.filter(id=id).first()
            print(updateproduct.categoryName)
            if name:
                updateproduct.categoryName=name
            if image =="null":
                updateproduct.image=updateproduct.image
            else:
                image=updateproduct.image=image
            updateproduct.save()
            getall=Category.objects.all()
            serializer=Categoryserializer(getall,many=True)
            return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"recieved successfully"})
    
@api_view(["GET"])
def getuserauthpage(request):
    users=Usersignup.objects.all()
    serializer=Cartserializer(users,many=True)
    print(serializer.data)
    return JsonResponse({'data':serializer.data},safe=False)

@api_view(["POST"])
def userdeletes(request):
    try:
        data=request.data
        id=data.get("id")
        print("this is your id")
        if id:
            Usersignup.objects.filter(id=id).delete()
            users=Usersignup.objects.all()
            print(users)
            serializer=Cartserializer(users,many=True)
            print(serializer.data)
            return JsonResponse({"data":serializer.data},safe=False)
        else:
            return JsonResponse({"nouser":"no user is found"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"full of error"})

@api_view(["POST"])
def userblock(request):
    try:
      data=request.data
      id=data.get("id")
      print("id",id)
      user=Usersignup.objects.filter(id=id).first()
      if user:
         if not user.is_active:
             user.is_active=True
             
         else:
             user.is_active=False
         user.save()
         userdetails=Usersignup.objects.all()
         serializer=Cartserializer(userdetails,many=True)
         
         return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
      
@api_view(["POST"])
def coupenadd(request):
    try:
        data=request.data
        coupenvalue=data.get("coupenvalue")
        discvalue=data.get("coupendisc")
        Coupen.objects.create(CoupenName=coupenvalue,discount=discvalue)
        coupens=Coupen.objects.all()
        if coupens:
         serializer=Coupenserializer(coupens,many=True)
         print("hi")
         return JsonResponse({"data":serializer.data},safe=False)
        return JsonResponse({"error":"wrong"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"wrong":"error"})
        
@api_view(["GET"])
def getcoupeninitally(request):
    try:
        coupens=Coupen.objects.all()
        if coupens:
                serializer=Coupenserializer(coupens,many=True)
                print("hi")
                return JsonResponse({"data":serializer.data},safe=False)
        else:
            return JsonResponse({"message":"wrong"},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"wrong":"something wwnt wrong"})

@api_view(["POST"])    
def coupendelete(request):
    try:
        data=request.data
        id=data.get("id")
        print(id)
        Coupen.objects.filter(id=id).delete()
        coupens=Coupen.objects.all()
        serializer=Coupenserializer(coupens,many=True)
        print("hi")
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"wrong":"something wwnt wrong"})
        
        
@api_view(["POST"])
def apllypromocode(request):
    try:
        data=request.data
        coupen=data.get("coupenvalue")
        print(coupen)
        if Coupen.objects.filter(CoupenName=coupen).exists():
           
            item=Coupen.objects.filter(CoupenName=coupen).first()
            if item.is_active==True:
                discount=item.discount
                print(discount)
                print("sanamin")
                return JsonResponse({"data":discount})
            else:
                return JsonResponse({"error":"wrong"})
        else:
            print("sanamilla")
            return JsonResponse({"errors":"wrong"})
    except Exception as e:
        print("errror",e)
        return JsonResponse({"wrong":"something went worng"})
    

@api_view(["POST"])
def coupenupdatepage(request):
    try:
        print("hi")
        data=request.data
        id=data.get("id")
        updatecoupens=data.get("updatecoupens")
        updatedisc=data.get("updatedisc")
        coupen=Coupen.objects.filter(id=id).first()
        if coupen:
            if updatecoupens:
                coupen.CoupenName=updatecoupens
            if updatedisc:
                coupen.discount=updatedisc
            coupen.save()
            coupens=Coupen.objects.all()
            serializer=Coupenserializer(coupens,many=True)
            return JsonResponse({"data":serializer.data},safe=False)
        else:
            return JsonResponse({"error":"worng"})
    except Exception as e:
        print("error",e)
        
    
@api_view(["GET"])
def orderupdate(request):
    print("hi")
    try:
        product=BuyProduct.objects.all()
        count=BuyProduct.objects.count()
        
        serializer=buyingserializer(product,many=True)
        print(serializer.data)
        return JsonResponse({"message":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
@api_view(["POST"])
def updatetheorder(request):
    try:
        data=request.data
        id=data.get("id")
       
        value=data.get("value")
        print(id,value)
        product=BuyProduct.objects.get(id=id)
        print(product.user_id)
        user=(product.user_id)
        product.status=value
        product.save()
        products=BuyProduct.objects.all()
        serializer=buyingserializer(products,many=True)
        if(user):
            print("hh")
            if value=="delivered":
                print("hi")
                getuser=Usersignup.objects.get(id=user)
                email=getuser.email
                name=product.name
                image=product.image
                quantity=product.quantity
                orderid=product.order_id
                totalprice=product.totalprice
                sendthemail(email,name,image,quantity,orderid,totalprice)
            
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
    
def sendthemail(email,name,image,quantity,orderid,totalprice):
    try:
        subject="the item delivered"
        from_email=settings.EMAIL_HOST_USER
        to_email=email
        context={
            "name":name,
            "image":image,
            "quantity":quantity,
            "orderid":orderid,
            "totalprice":totalprice,
        }
        html_content = render_to_string("deliverd.html", context)
        text_content = strip_tags(html_content)  # Strip HTML tags for plain text

        # Create email
        email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
        email.attach_alternative(html_content, "text/html")

        # Send email
        email.send()       
    except Exception as e:
        print("hi")
        print("error",e)
        
        
        
@api_view(["POST"])
def reviewpage(request):
    try:
        data=request.data
        date=datetime.date.today()
        print(date)
        star=data.get("star")
        print(star)
        user=data.get("userid")
        product=data.get("productid")
        print(user)
        print(product)
        if Reviewpage.objects.filter(user_id=user,product_id=product).exists():
            print("jiii")
            getstarupdate=Reviewpage.objects.filter(user_id=user,product_id=product).first()
            print("SSSSSSSSSS")
            getstarupdate.stars=star
            getstarupdate.save()
            print("kkkkkkkkkkk")
            return JsonResponse({"message":"good"})
        else:    
         namee=Usersignup.objects.filter(id=user).first()
         print(namee)
        #  names=namee.name
        #  print("hi")
         Reviewpage.objects.create(stars=star,user_id=user,product_id=product,date=date,name=namee)
         return JsonResponse({"message":"good"})
    except Exception as e:
        print(e)
        return JsonResponse({"error":"bad"})
    
    
@api_view(["POST"])
def getreviews(request):
    try:
        data=request.data
        userid=data.get("id")
        productid=data.get("productid")
        star=Reviewpage.objects.filter(user_id=userid,product_id=productid).first() or 0
        if star:
          stars=star.stars
          return JsonResponse({"data":stars})
        else:
            return JsonResponse({"data":star})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
    
@api_view(["POST"])
def getreviewcount(request):
    try:
        data=request.data
        id=data.get("id")
        userid=data.get("userid")
        count=Reviewpage.objects.filter(product_id=id).count() or 0
        print(count)
        return JsonResponse({"data":count})
    except Exception as e:
        return JsonResponse({"error":"wrong"})
    
    
    
@api_view(["POST"])
def totalreviewtstars(request):
    try:
        data=request.data
        id=data.get("id")
        p_count=Reviewpage.objects.filter(product_id=id).count() or 0        
        stars=Reviewpage.objects.filter(product_id=id)
        item=stars.aggregate(Sum('stars'))
        
        totalusersreview=math.floor(item["stars__sum"]/p_count)
        return JsonResponse({"data":totalusersreview})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
        
        
@api_view(["GET"])
def gettotalreview(request):
    try:
        count=Reviewpage.objects.count()
        print("thecount",count)
        stars=Reviewpage.objects.all()
        item=stars.aggregate(Sum('stars'))
        totalstars=item['stars__sum']
        total=math.floor(totalstars/count)
        print("thestras",totalstars)
        datas={
            "count":count,
            "total":total,
        }
        return JsonResponse({"data":datas})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
    
@api_view(["GET"])
def getallusers(request):
    try:
        allusers=Reviewpage.objects.all()
        print(allusers)
        serializer=Reviewserializer(allusers,many=True)
        print(serializer.data)
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
@api_view(["POST"])
def deleteReview(request):
    try:
        data=request.data
        id=data.get("id")
        productid=data.get("product_id")
        print("hlo",productid)
        print(id)
        print("hiiiiiiiiii")
        Reviewpage.objects.filter(user_id=id,product_id=productid).delete()
        products=Reviewpage.objects.all()
        serializer=Reviewserializer(products,many=True)
        return JsonResponse({"data":serializer.data},safe=False)
    
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"eeeeeeeeeeeeeee"})
       
            
@api_view(["GET"])
def getrevenue(request):
    try:  
        revenue=BuyProduct.objects.all()
        sum=revenue.aggregate(Sum('totalprice'))
        print(sum)
        totalrevenue=sum["totalprice__sum"]
        print(totalrevenue)
        return JsonResponse({"data":totalrevenue})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
    
@api_view(["POST"])
def getbasedondate(request):
    try:
        data=request.data
        date=data.get("date")
        print("klklkl",date)
     
     
        details=BuyProduct.objects.filter(date=date)
        datevalue=details.aggregate(total=Sum('totalprice'))
        return JsonResponse({"data":datevalue["total"]or 0})
    except Exception as e:
        print(e)
        return JsonResponse({"error":"worng"})
    
    
@api_view(["GET"])
def gettheallcategory(request):
    try:
        category=list(Category.objects.all().values())
        print("category",category)
        return JsonResponse({"data":category},safe=False)
    except Exception as e:
        print("eror",e)
        return JsonResponse({"error":"wrong"})
    
@api_view(["POST"])   
def changeimage(request):
    try:
        data=request.data
        id=data.get("imageid")
        p_id=data.get("product_id")
        
        image=request.FILES.get("images")
        print("image",image)
        print(id)
        productimage=ProductImages.objects.filter(id=id).first()
        if productimage:
            productimage.image=image
        productimage.save()
        data=productimage.objects.filter(product_id=p_id);
        serializer=Productserializer(data,many=True)
        
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print(e)
        return JsonResponse({"error":"wrong"})
    
@api_view(["POST"])
def deleteSelectimage(request):
    try:
     data=request.data
     id=data.get("id")
     p_id=data.get("p_id")
     print("idid get=",id)
     print(p_id)
     ProductImages.objects.filter(id=id).delete()
     data=ProductImages.objects.filter(product_id=p_id)
     serializer=Productserializer(data,many=True)
     print(serializer.data)
     return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print(e)
        return JsonResponse({"error":"worng"})
    
@api_view(["GET"])
def getallcoveriamge(request):
    try:
        print("hhhhhh")
        serializer=Productserializer(ProductImages.objects.all(),many=True)
        print(serializer.data)
        return JsonResponse({"data":serializer.data})
    except Exception as e:
        print(e)
        return JsonResponse({"error":"worng"})
    
@api_view(["POST"])
def deletetheimg(request):
    try:
        print("hi")
        data=request.data
        id=data.get("id")
        print(id)
        ProductImages.objects.filter(id=id).delete()
        productimg=ProductImages.objects.all()
        serializer=Productserializer(productimg,many=True)
        print(serializer.data)
        return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print(e)
        return JsonResponse({"wrong":"something fishy"})
    
@api_view(["POST"])
def updatetheimages(request):
    try:
      file=request.FILES.get("file")
      id=request.data.get("id")
      product=ProductImages.objects.filter(id=id).first()
      product.image=file
      product.save()
      updateproduct=ProductImages.objects.all()
      serializer=Productserializer(updateproduct,many=True)
      return JsonResponse({"data":serializer.data},safe=False)
    except Exception as e:
        print(e)
        return JsonResponse({"error":"wrong"})
        
        

@api_view(["GET","POST"])        
def razerpay(request):
    print("hi")
    print(request.method)
    try:
        if request.method=="POST":
            data=request.data
            user_id=data.get("user_id")
            paymentmethod=data.get("paymentmethod")
            product_id=data.get("product")[0]
            addreassid=data.get("addreassid")
            coupenvalue=data.get("coupenvalue")
            discount=data.get("discount")
            date=datetime.date.today()
            originalprice=data.get("originalprice")
            print(user_id,paymentmethod,product_id,addreassid,coupenvalue,discount,originalprice)
            print("hello")
            productdetails=Cart.objects.filter(user_id=user_id,id=product_id).first()
            product_name=productdetails.name
            product_image=productdetails.image
            product_price=productdetails.price
            product_quantity=productdetails.quantity
            id=productdetails.product_id
            print(date)
            countofproduct=adminproduct.objects.filter(id=id).first()
            stock=countofproduct.stock_count
            
            
            if coupenvalue:
              if stock>product_quantity:
                coupenisactive=Coupen.objects.filter(CoupenName=coupenvalue).first()
                if coupenvalue and coupenisactive.is_active:
                    productfinalprice=productdetails.price-((discount/100)*productdetails.price)
                    print("discount",productfinalprice)
                    if product_id and user_id:
                      print(id)
                      BuyProduct.objects.create(user_id=user_id,
                                                quantity=product_quantity,
                                                name=product_name,image=product_image,
                                                price=product_price,
                                                totalprice=productfinalprice,
                                                is_coupen=True,
                                                coupen_code=coupenvalue,
                                                date=date,
                                                is_orderConfirm=False,
                                                discount=discount,
                                                discountedamount=(discount/100)*productdetails.price,
                                                status="ordered",
                                                adreass_id=addreassid,
                                                product_id=id)
                      getlastid=BuyProduct.objects.order_by("id").last()
                      print("hhhhhhh",getlastid.id)
                      return JsonResponse({"message":getlastid.id})
                
               
                if stock==0:
                    return JsonResponse({"outofstock":"the item is unavailable now"})
                if stock<product_quantity:
                    return JsonResponse({"outofstock":"the quantity you choose cant we have only limited stock"})   
            elif not coupenvalue:
                if stock>product_quantity:
                    if product_id and user_id:
                        BuyProduct.objects.create(
                            user_id=user_id,
                            quantity=product_quantity,
                            name=product_name,
                            image=product_image,
                            price=product_price,
                            totalprice=(product_price*product_quantity),
                            is_coupen=False,
                            coupen_code=None,
                            discount=0,
                            discountedamount=0,
                            status="ordered",
                            adreass_id=addreassid,
                            is_orderConfirm=False,
                            date=date,
                            product_id=id
                            )
                        getlastid=BuyProduct.objects.order_by("id").last()
                        print(getlastid.id)
                            
                        
                    return JsonResponse ({"message":getlastid.id})
                elif stock==0:
                    return JsonResponse({"outofstock":"the currently the product is unavailable now"})
                elif stock<product_quantity:
                    return JsonResponse({"outofstock":"the quantity you choose cant we have only limited stock"})
               
                 
            return JsonResponse({"message":"good"})
            
        elif request.method=="GET":
            print("goof")
            return JsonResponse({"data":' '})
           
    except Exception as e:
        print(e)
        return JsonResponse({"error":"someting went wrong"})        
    
    
@api_view(["POST"])   
def getrazordetails(request):
    try:
        data=request.data
        id=data.get("id")
        print(id)
        product=BuyProduct.objects.get(id=id)
        name=Usersignup.objects.get(id=product.user_id).name
        return JsonResponse ({"data":{"totalprice":product.totalprice,"name":name}})
    except Exception as e:
        print(e)
        return JsonResponse({"error":""})
    
@api_view(["POST"])
def successpayment(request):
    try:
        print("HI")
        data=request.data
        id=data.get("id")
        order_id=data.get("order_id")
        payment_id=data.get("payment_id")
        print(id)
        print(order_id)
        print(payment_id)
        if id:
         product=BuyProduct.objects.get(id=id)
         product.is_orderConfirm=True
         product.paymentmethod="razerpay"
         product.order_id=order_id
         product.payment_id=payment_id
         product.save()
         return JsonResponse({"message":"good"})
    except Exception as e:
        print(e)
        return JsonResponse({"error":"worng"})
    
        
        

