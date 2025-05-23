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
path("getaddreass",views.getaddreass),
path("deleteaddreass",views.deleteaddreass),
path("get4products",views.get4products),
path("viewAplleProducts",views.viewAplleProducts),
path("SamsungProducts",views.SamsungProducts),
path("LaptopProducts",views.LaptopProducts),
path("get4samsungproduct",views.get4samsungproduct),
path("get4appleproducts",views.get4appleproducts),
path("get4laptops",views.get4laptops),
path("contactdetails",views.contactdetails),
path("gettheclickedproduct",views.gettheclickedproduct),
path("addtocart",views.addtocart),
path("addtowishList",views.addtowishList),
path("getwhistlist",views.getwhistlist),
path("getWishList",views.getWishList),
path("deleteWishList",views.deleteWishList),
path("increaseQuantity",views.increaseQuantity),
path("decreaseQuantity",views.decreaseQuantity),
path("getproductforbuy",views.getproductforbuy),
path("buyingproduct",views.buyingproduct),
path("getwishlistproductsfor",views.getwishlistproductsfor),
path("getadminproductcount",views.getadminproductcount),
path("getmyorders",views.getmyorders),
path("getinvoiceproduct",views.getinvoiceproduct),
path("Createcategoy",views.Createcategoy),
path("getcategory",views.getcategory),
path("deletecategory",views.deletecategory),
path("updatecategory",views.updatecategory),
path("getuserauthpage",views.getuserauthpage),
path("userdeletes",views.userdeletes),
path("userblock",views.userblock),
path("coupenadd",views.coupenadd),
path("getcoupeninitally",views.getcoupeninitally),
path("coupendelete",views.coupendelete),
path("apllypromocode",views.apllypromocode),
path("coupenupdatepage",views.coupenupdatepage),
path("orderupdate",views.orderupdate),
path("updatetheorder",views.updatetheorder),
path("reviewpage",views.reviewpage),
path("getreviews",views.getreviews),
path("getreviewcount",views.getreviewcount),
path("totalreviewtstars",views.totalreviewtstars),
path("gettotalreview",views.gettotalreview),
path("getallusers",views.getallusers),
path("deleteReview",views.deleteReview),
path("getrevenue",views.getrevenue),
path("getbasedondate",views.getbasedondate),
path("gettheallcategory",views.gettheallcategory),
path("changeimage",views.changeimage),
path("deleteSelectimage",views.deleteSelectimage),
path("getallcoveriamge",views.getallcoveriamge),
path("deletetheimg",views.deletetheimg),
path("updatetheimages",views.updatetheimages),
path("razerpay",views.razerpay),
path("getrazordetails",views.getrazordetails),
path("successpayment",views.successpayment),
path("handlePaymentFailure",views.handlePaymentFailure),
path("saveprofile",views.saveprofile),





















]
  
