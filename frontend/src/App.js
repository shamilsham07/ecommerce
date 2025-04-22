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
import Logout from "./components/admin/logout";
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
import Secondloader from "./components/loading/secondloader";
import Nav2 from "./components/nav2";
import Deliveryadreass from "./components/cart/deliveryadreass";
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
import PdfComponent from "./components/invoice/invoice";
import Coupen from "./components/admin/userauthentication/coupen";
import Userdetails from "./components/userlogin/userdetailspage";
import { setuserauthentication } from "./components/redux/reducer";
import Appleproducts from "./components/appleProducts/appleproducts";
import LaptopProducts from "./components/appleProducts/laptop.products";
import Reviewpage from "./whistlist/reviewpage";
import Transfertoviewimage from "./components/admin/viewimage";

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

  const logout = async () => {
    const cookie = new Cookies();
    const username = cookie.get("username");
    const key = cookie.get("userKey");
    const res = await fetch("http://localhost:8000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ username, key }),
    });
    const result = await res.json();
    if (result.message) {
      cookie.remove("username");
      cookie.remove("userKey");
      dispatch(authenticate(false));

      navigate("/admin");
    }
    if (result.error) {
      console.log("hello");
    }
  };

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
        <Route
          path="/ProductsSection"
          element={isAuthenticated ? <ProductsSection /> : <Admin />}
        />
        <Route
          path="/Updatepage"
          element={isAuthenticated ? <Updatepage /> : <Admin />}
        />
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
        <Route path="/ResponsiveDemo" element={<ResponsiveDemo />} />
        <Route path="/Appleproducts" element={<Appleproducts />} />
        <Route path="/SamsungProducts" element={<SamsungProducts />} />
        <Route path="/LaptopProducts" element={<LaptopProducts />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/Whistlist/:id" element={<Whistlist />} />
        <Route
          path="/Addproduct"
          element={isAuthenticated ? <Addproducts /> : <Admin />}
        />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/PaymentComponent/:id" element={<PaymentComponent />} />
        <Route path="/PdfComponent" element={<PdfComponent />} />
        <Route path="/Vieworders" element={<Vieworders />} />
        <Route path="/About" element={<About />} />
        <Route
          path="/Categorypage"
          element={isAuthenticated ? <Categorypage /> : <Admin />}
        />
        <Route
          path="/Userauthuenticationpage"
          element={isAuthenticated ? <Userauthuenticationpage /> : <Admin />}
        />
        <Route
          path="/Coupen"
          element={isAuthenticated ? <Coupen /> : <Admin />}
        />
        <Route
        path="/Deliveryadreass"
        element={<Deliveryadreass/>}
        />
        <Route
          path="/Orderslistpage"
          element={isAuthenticated ? <Orderslistpage /> : <Admin />}
        />
        <Route
          path="/Reviewpage"
          element={isAuthenticated ? <Reviewpage /> : <Admin />}
        />
        <Route
          path="/Logout"
          element={isAuthenticated ? <Logout /> : <Admin />}
        />
        <Route
          path="/transfertoviewimage"
          element={isAuthenticated ? <Transfertoviewimage /> : <Admin />}
        />
        <Route path="/Secondloader" element={<Secondloader />} />
      </Routes>
      <div
        className="modal fades"
        id="exampleModal"
        style={{
          transition: "2s all ease-in-out",
        }}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title head-of-log" id="exampleModalLabel">
                logout
              </h5>
              <button
                type="button"
                class="close modala-closee"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body body-of-modal">are you sure to logout ?</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => logout()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
