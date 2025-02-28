import React, { useEffect } from "react";
import "./admin.css";
import { MdPlayArrow } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { change } from "../redux/reducers";
import csrftoken from "../../csrf";
import Cookies from "universal-cookie";
import 'animate.css';

import { authenticate } from "../redux/reducer";
export default function MainSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productClick = () => {
    dispatch(change(false));
    navigate('/ProductsSection')
  };
  const home = () => {
    dispatch(change(true));
    navigate('/adminproductpage')
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
      cookie.remove('username')
      cookie.remove('userKey')
      dispatch(authenticate(false))
      navigate('/admin')

    }
    if (result.error) {
      console.log("hello");
    }
  };

  return (
    <>
      <div className="sidebar  animate__animated animate__backInLeft position-fixed">
        <div className="sidebar-heading">
          <div>
            <h4>discover </h4>
          </div>
          <div>
            {" "}
            <MdPlayArrow className="md" style={{ fontSize: "20px" }} />{" "}
          </div>
        </div>
        <div className="view-products">
          <div>
            {" "}
            <h6 onClick={productClick}>products</h6>
          </div>
        </div>
        <div className="view-reviews">
          <h6>reviews</h6>
        </div>
        <div className="view-category">
          <h6>category</h6>
        </div>
        <div className="view-orders">
          <h6>orders</h6>
        </div>
        <div className="view-settings">
          <h6>settings</h6>
        </div>
        <div className="view-settings">
          <h6 onClick={home}>home</h6>
        </div>
        <div className="view-settings">
          <h6 onClick={logout}>logout</h6>
        </div>
      </div>
    </>
  );
}
