import React from "react";
import "./production.css";
import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import logo from "../../assets/LOGO-1.png";
import { useEffect } from "react";
import { MdPlayArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { change } from "../redux/reducers";
import csrftoken from "../../csrf";
import Cookies from "universal-cookie";
import { authenticate } from "../redux/reducer";
import Categorypage from "./addProductpage/categorypage";
export default function MainSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productClick = () => {
    dispatch(change(false));
    navigate("/ProductsSection");
  };
  const home = () => {
    dispatch(change(true));
    navigate("/adminproductpage");
  };

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
    
    
          <div className="second-sidebar-back" style={{ height: "100vh",position:"fixed" }}>
            <div className="sidebar-logo">
              <img src={logo} alt="" />
            </div>
            <hr />
            <div className="side-home side-link"onClick={home}>
              <span>
                <i class="bi bi-house-door-fill"></i>
              </span>
              <h5 className="mb-0">Home</h5>
            </div>
            <div className="side-dashbord side-link">
              <span>
                <i class="bi bi-graph-up-arrow"></i>
              </span>
              <h5>Dashbord</h5>
            </div>
            <div className="side-reviews side-link">
              <span>
                <i class="bi bi-stars"></i>
              </span>
              <h5>Reviews</h5>
            </div>
            <div className="side-earnings side-link  ">
              <span>
                <i class="bi bi-bank"></i>
              </span>
              <h5>Earnings</h5>
            </div>
            <div className="side-product side-link" onClick={productClick}>
              <span>
                <i class="bi bi-folder-plus"></i>
              </span>
              <h5>ProductPage</h5>
            </div>
            <div className="side-product side-link" onClick={()=>navigate("/Categorypage")}>
              <span>
                <i class="bi bi-folder-plus"></i>
              </span>
              <h5>category</h5>
            </div>
            <div className="side-product side-link" onClick={()=>navigate("/Userauthuenticationpage")}>
              <span>
              <i class="bi bi-person-fill"></i>
              </span>
              <h5>User Authentication</h5>
            </div>
            <div className="side-Logout side-link" onClick={logout}>
              <span>
                <i class="bi bi-box-arrow-left"></i>
              </span>
              <h5>Logout</h5>
            </div>
            <hr />
        
      </div>
   
  );
}
