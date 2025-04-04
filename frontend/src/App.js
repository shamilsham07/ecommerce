
import "./App.css";
import UserSignup from "./components/userlogin/usersignup";
import Adminhome from "./components/admin/adminhome";
import Products from "./components/products";
import PaymentComponent from "./components/razorpay/razorpay";
import Wishlist from "./whistlist/wishlist";
import Orderslistpage from "./components/admin/addProductpage/orderslistpage";
import Footer from "./components/footer";
import "bootstrap-icons/font/bootstrap-icons.css";
import SamsungProducts from "./components/appleProducts/samsungproducts";
import ResponsiveDemo from "./components/admin/modal/modal";
import Whistlist from "./whistlist/whistlist";
import Addproducts from "./components/admin/addProductpage/addproduct";
import Loading from "./components/loading/loading";
import Admin from "./components/admin/admin";
import Home from "./components/home";
import About from "./components/aboutsection/about";
import Vieworders from "./components/vieworders/vieworders";
import Categorypage from "./components/admin/addProductpage/categorypage";
import Userauthuenticationpage from "./components/admin/userauthentication/userauth";
import Confirmpass from "./components/userlogin/confirmpass";
import Cartpage from "./components/cart/cartpage";
import Productsupdate from "./components/admin/products/productsupdate";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-ui-kit/css/mdb.min.css"; // Import the CSS for styles
import "mdb-ui-kit";
import Nav2 from "./components/nav2";
import ContactPage from "./components/contactpage/contact";
import Verifyemail from "./components/userlogin/verifyemail";
import UserLogin from "./components/userlogin/userlogin";
import csrftoken from "./csrf";
import Adminproductpage from "./components/admin/adminproductpage";
import Productpage from "./components/productpage";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Adreass from "./components/cart/addreass";
import { useSelector } from "react-redux";
import Addresspage from "./components/cart/addresspage";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import Forgetpass from "./components/userlogin/forgetpass";
import { useNavigate } from "react-router-dom";
import { authenticate } from "./components/redux/reducer";
import Updatepage from "./components/admin/updatepage";
import ProductsSection from "./components/admin/productsSection";
import { setUserData } from "./components/redux/reducer";
import  PdfComponent from "./components/invoice/invoice"
import Coupen from "./components/admin/userauthentication/coupen";
import Userdetails from "./components/userlogin/userdetailspage";
import { setuserauthentication } from "./components/redux/reducer";
import Appleproducts from "./components/appleProducts/appleproducts";
import LaptopProducts from "./components/appleProducts/laptop.products";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userauth = useSelector((state) => state.auth.userauthentication);
  const userdetails = useSelector((state) => state.auth.userdata);
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const username = cookie.get("username");
  console.log("user:", username);
  const key = cookie.get("email");
  console.log("key:", key);

  const theuser = cookie.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    const userdetail = async () => {
      if (key) {
        const res = await fetch("http://localhost:8000/getuserdetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({ email: key }),
        });

        const result = await res.json();
        if (result.data) {
          console.log("jaaaaaaaaaaaaaaaaaaaaaaaaaay");
          console.log(result.data);
          dispatch(setUserData(result.data));
        } else {
          console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMmmm");
        }
      }
    };
    userdetail();

    console.log("theeeeee", userauth);

    const checking = () => {
      if (theuser) {
        dispatch(setuserauthentication(true));
      }
    };
    checking();

    const checkauth = async () => {
      if (key) {
        const res = await fetch("http://localhost:8000/checkuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({ username, key }),
        });
        const result = await res.json();
        console.log("result", result.message);
        if (result.message) {
          dispatch(authenticate(true));
        }
        if (result.error) {
          cookie.remove("username");
          cookie.remove("userKey");
          navigate("/admin");
          dispatch(authenticate(false));
        }
      }

      if (username) {
        dispatch(authenticate(true));
      }
    };

    // if(username){
    //   dispatch(authenticate(true))
    //   navigate("/adminproductpage")
    // }

    checkauth();
  }, [key]);

  return (
    <div className="App">
      {/* <Router> */}
     
      <Routes>
       
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productpage" element={<Productpage />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <Adminproductpage /> : <Admin />}
        />
        <Route
          path="/adminproductpage"
          element={isAuthenticated ? <Adminproductpage /> : <Admin />}
        />
        <Route
          path="/Adminhome"
          element={isAuthenticated ? <Adminhome /> : <Admin />}
        />
        <Route path="/productpage" element={<Productpage />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/Cartpage" element={<Cartpage />} />
        <Route path="/Productsupdate" element={<Productsupdate />} />
        <Route path="/ProductsSection" element={isAuthenticated?<ProductsSection />:<Admin/>} />
        <Route path="/Updatepage" element={isAuthenticated?<Updatepage />:<Admin/>} />
        <Route
          path="/UserLogin"
          element={userauth ? <Home /> : <UserLogin />}
        />
        <Route path="/UserSignup" element={<UserSignup />} />
        <Route path="/Userdetails" element={<Userdetails />} />
        <Route path="/Forgetpass" element={<Forgetpass />} />
        <Route path="/verifyemail" element={<Verifyemail />} />
        <Route path="/Confirmpass" element={<Confirmpass />} />
        <Route path="/Addresspage/:id" element={<Addresspage />} />
        <Route path="/Adreass/:id" element={<Adreass />} />
        <Route path="/nav2" element={<Nav2 />} />
        <Route path="/Footer" element={<Footer />} />
        <Route path="/ResponsiveDemo"  element={<ResponsiveDemo/>}/>
        <Route path="/Appleproducts" element={<Appleproducts />} />
        <Route path="/SamsungProducts" element={<SamsungProducts />} />
        <Route path="/LaptopProducts" element={<LaptopProducts />} />
        <Route path="/ContactPage"  element={<ContactPage/>}/>
        <Route path="/Whistlist/:id" element={<Whistlist/>}/>
        <Route path="/Addproduct" element={isAuthenticated?<Addproducts/>:<Admin/>}/>
        <Route path="/Wishlist" element={<Wishlist/>}/>
        <Route path="/PaymentComponent" element={<PaymentComponent/>}/>
        <Route path="/PdfComponent" element={<PdfComponent/>}/>
        <Route path="/Vieworders" element={<Vieworders/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Categorypage" element={<Categorypage/>}/>
        <Route path="/Userauthuenticationpage" element={<Userauthuenticationpage/>}/>
        <Route path="/Coupen" element={<Coupen/>}/>
        <Route path="/Orderslistpage" element={<Orderslistpage/>}/>

       


        




       


      </Routes>
    </div>
  );
}

export default App;
