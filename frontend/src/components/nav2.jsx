import React, { useEffect } from "react";
import image from "../assets/LOGO-1.png";
import "./home.css";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setcart } from "./redux/productsreducer";
import { useState } from "react";
import csrftoken from "../csrf";
import "animate.css";
import { setUserData } from "./redux/reducer";
import image1 from "../assets/wishlist.png"

import { useNavigate } from "react-router-dom";
import "./products.css";
import { GrPowerShutdown } from "react-icons/gr";
import Cookies from "universal-cookie";
import { setuserauthentication } from "./redux/reducer";
import { FaRegCircleUser } from "react-icons/fa6";
import Wishlist from "../whistlist/wishlist";

export default function Nav2() {
  const userdetails = useSelector((state) => state.auth.userdata);
  const userauth = useSelector((state) => state.auth.userauthentication);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shadowClass,setShadowClass] = useState("")



  const contactnavigate=()=>{
    navigate('/ContactPage')
  }

  const userlogout = () => {
    
    cookies.remove("email");
    dispatch(setuserauthentication(false));
    dispatch(setUserData(['']))
    window.location.reload()
    
  };
  const productnavigate=()=>{
    navigate('/products')
  }

const homenavigate=()=>{
navigate("/")
}
const WishlistNavigate=()=>{
  navigate("/wishlist")
}
const ordersnavigate=()=>{
  navigate("/Vieworders")
}




  const userdetailspage = () => {
    navigate("/Userdetails");
  };
  const clicked = async () => {
    const res = await fetch("http://localhost:8000/getproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    });

    const result = await res.json();
    if (result.data) {
      dispatch(setcart(result.data));
      navigate("/Cartpage");
    } else if (result.nothing) {
      console.log("nothing");
      navigate("/Cartpage");
    } else {
      console.log("went wrong here");
      navigate("/Cartpage");
    }
  };

 useEffect(()=>{
  const handleScroll = () =>{
   
    if (window.scrollY>50){
      setShadowClass('shadow-class')
    }else{
      setShadowClass("")
    }
  };
  window.addEventListener("scroll",handleScroll)
  return()=>{
    window.removeEventListener("scroll",handleScroll)
  }
 },[])

  return (
    <div>
      <nav class="navbar-all navbar navbar-expand-lg"> 
        <div class={`nav-b0x container ${shadowClass}`}>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-between "
            id="navbarTogglerDemo01"
          >
            <div>
              <img
                src={image}
                alt=""
                className="w-30"
                style={{
                  width: "210px",
                  cursor:"pointer"
                }}
                onClick={homenavigate}
              />
            </div>
            <div>
              <ul class="nav-ui navbar-nav me-auto  mb-lg-0" style={{cursor:"pointer"}}>
                <li class="nav-item">
                  <h6     onClick={homenavigate}  >Home</h6>
                </li>
                <li class="nav-item">
                  <h6 onClick={()=>navigate('/about')}>About</h6>
                </li>
                <li class="nav-item">
                  <h6>Help</h6>
                </li>
                <li class="nav-item">
                  <h6 onClick={productnavigate}>Products</h6>
                </li>
                <li class="nav-item">
                  <h6 onClick={contactnavigate}>Contact</h6>
                </li>
              </ul>
            </div>
            <div className="d-flex">
            
                <div>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="secondary"
                      id="dropdownMenuButton1"
                    >
                      <FaUserCircle
                        style={{ color: "black" }}
                        className="FaUserCircle"
                      />
                    </Dropdown.Toggle>
                    {userauth ? (
                      <Dropdown.Menu>
                        <Dropdown.Item
                          className="text-center"
                          onClick={userdetailspage}
                        >
                          <div className="d-flex" style={{ gap: "10px" }}>
                            <span>
                              <FaRegCircleUser className="add-btn" />
                            </span>
                            <span className="text-dark">
                              {userdetails.name}
                            </span>
                          </div>
                        </Dropdown.Item>

                        <Dropdown.Item onClick={userlogout}>
                          <div className="d-flex" style={{ gap: "10px" }}>
                            <span>
                              <GrPowerShutdown style={{ color: "dark" }} />
                            </span>
                            <span
                              className="text-dark"
                              style={{ fontSize: "15px" }}
                            >
                              logout
                            </span>
                          </div>
                        </Dropdown.Item>

                        <Dropdown.Item onClick={WishlistNavigate}>
                          <div className="d-flex" style={{ gap: "10px" }}>
                           <img src={image1} alt="" className="wishlist-icons" />
                            <span
                              className="text-dark"
                              style={{ fontSize: "15px" }}
                            >
                              Wishlist
                            </span>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={ordersnavigate}>
                          <div className="d-flex" style={{ gap: "10px" }}>
                          <i class="bi bi-tag"></i>
                            <span
                              className="text-dark"
                              style={{ fontSize: "15px" }}
                            >
                              My orders
                            </span>
                          </div>
                        </Dropdown.Item>






                      </Dropdown.Menu>
                    ) : (
                      <Dropdown.Menu>
                        <Dropdown.Item href="/UserLogin">login</Dropdown.Item>
                        <Dropdown.Item href="/UserSignup">signup</Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </div>
           
              <div className="FaShoppingCart">
                <FaShoppingCart
                className="fa-cart"
                onClick={clicked}
                style={{ cursor: "pointer" }}
                
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
