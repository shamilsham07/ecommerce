from .import views
from django.urls import path

urlpatterns = [
path("admin",views.adminlog),
path("productAdd",views.productAdd),
path("productsget",views.productsget), 
path("checkuser",views.check_user),
path("logout",views.logout),
path("cart",views.cart),
path("count",views.count),
path("getproduct",views.getproduct),
path("getcart",views.getcart),
path("deleteCart",views.deleteCart),
path("order",views.order),
path("orderCount",views.orderCount),
path("adminProduct",views.adminProduct),
path("onDelete",views.onDelete),
path("productAdds",views.productAdds),
path("updates",views.updates),
path("getproductfirst",views.getproductfirst),
path("usersignup",views.usersignup),
path("userLog",views.userLog),
path("getuserdetails",views.getuserdetails),
path("UserUpdate",views.UserUpdate),
path("forgetpass",views.forgetpass),
path("varifyEmail",views.varifyEmail), 
path("Userconfirmpass",views.Userconfirmpass),
path("adresssave",views.adresssave),
path("getaddreass",views.getaddreass)


]
  
