import React from "react";
import "./production.css";
import { CgMail } from "react-icons/cg";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import logo from "../../assets/LOGO-1.png";
import image2 from "../../assets/coupon (1).png"
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
// const log=()=>{
//   const model=document.getElementById("exampleModal").

 
// }



  return (
    
    
          <div className="second-sidebar-back" style={{ height: "100vh" }}>
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
            <div className="side-reviews side-link"
            onClick={()=>navigate("/Reviewpage")}
            >
              <span>
                <i class="bi bi-stars"></i>
              </span>
              <h5>Reviews</h5>
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
              <h5>Category</h5>
            </div>
            <div className="side-product side-link" onClick={()=>navigate("/Orderslistpage")}>
              <span>
              <i class="bi bi-bag"></i>
              </span>
              <h5>Orders</h5>
            </div>
            <div className="side-product side-link" onClick={()=>navigate("/Userauthuenticationpage")}>
              <span>
              <i class="bi bi-person-fill"></i>
              </span>
              <h5 className="text-start">Users</h5>
            </div>
            <div className="side-product side-link" onClick={()=>navigate("/Coupen")}>
              <span>
              <i class="bi bi-card-text"></i>
              </span>
              <h5>Coupen Code</h5>
            </div>
            <a className="side-Logout side-link" data-bs-target="#exampleModal" data-bs-toggle="modal">
              <span>
                <i class="bi bi-box-arrow-left text-white"></i>
              </span>
              <h5 className="text-white">Logout</h5>
            </a>
           
            <hr /> 

         





          </div>

   
  );
}
