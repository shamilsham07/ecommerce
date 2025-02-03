import React from "react";
import Nav from "./nav";
import "./home.css";
import 'animate.css';
import { useDispatch } from "react-redux";

import Carousel from "react-bootstrap/Carousel";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  const explore =() => {
    navigate("/products");
  };

  return (
    <>
      <Nav/>
   <div className="home-section position-relative">
    <img src="/cyber-monday-retail-sales.jpg" className="home-banner-img" alt="" />
     <div className="container position-relative">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="homeSection">
            <div className="homeheading">
              {" "}
              <h1 className="animate__animated animate__fadeInDownBig">welcome</h1>
            </div>

            <div className="homeheading animate__animated animate__fadeInDown">
              <h1>to</h1>
            </div>
            <div className="homeheading animate__animated animate__fadeInDown">
              <h1>Phone cart</h1>
            </div>

            <div className="homebutton">
              <div className="homebuttonsub">
                {" "}
                <button className="homebtn" onClick={explore}>
                  explore
                  <FaArrowRight />{" "}
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
   </div>
   </>
  );
}
