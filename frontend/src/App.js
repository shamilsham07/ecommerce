import logo from "./logo.svg";
import "./App.css";
import UserSignup from "./components/userlogin/usersignup";
import Adminhome from "./components/admin/adminhome";
import Products from "./components/products";
import Nav from "./components/nav";
import Loading from "./components/loading/loading";
import Admin from "./components/admin/admin";
import Home from "./components/home";
import Confirmpass from "./components/userlogin/confirmpass";
import Cartpage from "./components/cart/cartpage";
import Productsupdate from "./components/admin/products/productsupdate";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-ui-kit/css/mdb.min.css"; // Import the CSS for styles
import "mdb-ui-kit";
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
import ResponsiveDemo from "./components/admin/modal/modal";
import Updatepage from "./components/admin/updatepage";
import ProductsSection from "./components/admin/productsSection";
import { setUserData } from "./components/redux/reducer";
import Userdetails from "./components/userlogin/userdetailspage";
import { setuserauthentication } from "./components/redux/reducer";

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
          dispatch(authenticate());
        }
        if (result.error) {
          cookie.remove("username");
          cookie.remove("userKey");
          navigate("/admin");
        }
      }
    };
    checkauth();
  }, [key]);

  return (
    <div className="App">
      {/* <Router> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productpage" element={<Productpage />} />
        <Route path="/admin" element={<Admin />} />
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
        <Route path="/ProductsSection" element={<ProductsSection />} />
        <Route path="/Updatepage" element={<Updatepage />} />
        <Route
          path="/UserLogin"
          element={userauth ? <Home /> : <UserLogin />}
        />
        <Route path="/UserSignup" element={<UserSignup />} />
        <Route path="/Userdetails" element={<Userdetails/>}  />
        <Route path="/Forgetpass"element={<Forgetpass/>}   />
        <Route path='/verifyemail' element={<Verifyemail/>}/>
        <Route path="/Confirmpass" element={<Confirmpass/>}/>
        <Route path="/Addresspage" element={<Addresspage/>}/>
        <Route path="/Adreass" element={<Adreass/>}/>


      </Routes>

      {/* </Router> */}
    </div>
  );
}

export default App;
