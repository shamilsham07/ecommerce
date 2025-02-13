import React from "react";
import { MdLocalGroceryStore } from "react-icons/md";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setcart } from "./redux/productsreducer";
import { useState } from "react";
import csrftoken from "../csrf";
import "animate.css";
import { IoMdAdd } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { GrPowerShutdown } from "react-icons/gr";
import Cookies from "universal-cookie";
import { setuserauthentication } from "./redux/reducer";
import { FaRegCircleUser } from "react-icons/fa6";
// import Dropdown from 'react-bootstrap/Dropdown';

export default function Nav() {
  const userdetails = useSelector((state) => state.auth.userdata);
  const userauth = useSelector((state) => state.auth.userauthentication);
  const cookies = new Cookies();

  const userlogout = () => {
    cookies.remove("email");
    dispatch(setuserauthentication(false))
  };

const userdetailspage=()=>{
  navigate("/Userdetails")
}





  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  // const data=useSelector((state)=>state.auth.increment)        currently not need

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">
        <div className="container">
          <button
            data-mdb-collapse-init
            className="navbar-toggler"
            type="button"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a
              className="navbar-brand mt-2 mt-lg-0  animate__animated animate__fadeInLeftBig"
              href="#"
            >
              <img
                src="3901287.jpg"
                height="20"
                alt="MDB Logo"
                loading="lazy"
              />
            </a>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 animate__animated animate__fadeInLeftBig ">
              <li className="nav-item">
                <a className="nav-link text-dark" href="/">
                  home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  about
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-dark" href="#">
                  services
                </a>
              </li>
            </ul>
          </div>
          <div className="nav-right">
            <div className="logicon">
              <div>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdownMenuButton1">
                    <FaRegUser
                      style={{ color: "black" }}
                      className="FaRegUser"
                    />
                  </Dropdown.Toggle>
                  {userauth ? (
                    <Dropdown.Menu>
                      <Dropdown.Item className="text-center" onClick={userdetailspage}>
                      <div className="d-flex" style={{ gap: "10px" }}>
                          <span>
                           
                            <FaRegCircleUser   
                             className="add-btn"   />
                          </span>
                          <span className="text-dark">{userdetails.email}</span>
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
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item href="/UserLogin">login</Dropdown.Item>
                      <Dropdown.Item href="/UserSignup">signup</Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </div>
            </div>
            <div classNameName="storeicons">
              <div>
                <MdLocalGroceryStore
                  classNameName="storeicon animate__animated animate__fadeInRightBig"
                  onClick={clicked}
                  style={{ fontSize: "2rem", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
