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
from .cartserializer import Userserializer
from .cartserializer import Serializer
from.cartserializer import Cartserializer
from.cartserializer import Productserializer
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
        print("sss",product.id)
      
        
        if Cart.objects.filter(product=product,user_id=user_id).exists():
            print('ssss')
            cart=Cart.objects.filter(product=product,user_id=user_id).first()
            print("the cae",cart)
            print("the quant",cart.quantity)
            cart.quantity+=1
            cart.totalprice+=float(product.price) 
            cart.save()
            return JsonResponse({"message":"succesfull"})
            
            
        else:    
            price=product.price
            image=product.image
            name=product.name
            stock_count=product.stock_count
            print("stock_count",product.stock_count)
            Cart.objects.create(product=product,totalprice=price,image=image,name=name,stock_count=stock_count,user_id=user_id) 
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
        if store.exists():
          serializer=CartSerializer(store,many=True)
          return JsonResponse({"data":serializer.data},safe=False)    
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
        product =adminproduct.objects.create(name=name,category=category,price=price,discount=discount,stock_count=stock,image=image,description=description)
        
        for image in otherimage:
            ProductImages.objects.create(product_id=product,image=image)
        
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
        otherimage = request.FILES.getlist("otherimage")
        updatestock=data.get("updatestock",None)
        updateprice=data.get("updateprice",None)
        selecteditem=data.get("selectedItem",None)
        description=data.get("description",None)
        print("id",id)
        print(selecteditem)
        print(otherimage)
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
        if description:
            productget.description=description   
        if otherimage:
            for image in otherimage:
                ProductImages.objects.create(product=productget,image=image)
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
        print(serializer.data)
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
        print("cccccccc")
        data=request.data
        print(data)
        usermail=data.get("usermail")
        print(usermail)
        userpass=(data.get("userpass"))
        print("the pasword",userpass)
        getuser= Usersignup.objects.get(email=usermail)
        if getuser:
           id=getuser.id
           passwords=getuser.pasword
           print(passwords)
        
           if check_password(userpass, passwords):
                print("hello")
                serializer=Cartserializer(getuser)
                return JsonResponse({"data":serializer.data},safe=False)
           else:
               return JsonResponse({"error":"wrong"})    
     
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
        id=data.get("user_id")
        
        email=data.get("email")
        print("the",id)
        print("mail",email)
        global array
       
        user=Usersignup.objects.filter(id=id).first()
        print("th",user.id)
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
            recipient_list=[email])
            return JsonResponse({"message":"recieved","otp":array})
           
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
        id=data.get("id")
        password=data.get("password")
        print(password)
        hashpass=make_password(password)
        user=Usersignup.objects.filter(id=id).first()
        user_id=user.id
        print("krrrr",user_id)
        print(hashpass)
        user.pasword=hashpass
        
        user.save()
        print("hjdsc")
        return JsonResponse({"message":"recieved"})
        
    except Exception as e:
        print("jiods")
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
        price=product.price
        
      
        print(product)
        if Cart.objects.filter(product=product,user_id=userId).exists():
           print("hello")
           
           cart=Cart.objects.filter(product=product,user_id=userId).first()
           print('hiiiiiii')
           cart.stockcount=stockcount
           if stockcount==cart.quantity:
               return JsonResponse({"stockmax":"you have already add this product now you select the more quantity then we have plaese reduce the quantity"})
           cart.quantity=+Quantity
           print("hi")
           quantity=cart.quantity
           print(type(price))
           
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
            Cart.objects.create(user_id=userId,totalprice=totalprice,quantity=quantity,name=name,image=image,stock_count=stockcount,product_id=productId)
            return JsonResponse({"message":"recieved successfully"})
    except Exception as e:
        print("error",e)
        return JsonResponse({"error":"wrong"})
    
     
     
@api_view(['POST'])
def addtowishList(request):
    try:
        data=request.data
        productid=data.get("id")
        userId=data.get("userid")
        if productid and userId :
            Wishlist.objects.create(product_id=productid,user_id=userId)
            return JsonResponse({"message":"good"})
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
            