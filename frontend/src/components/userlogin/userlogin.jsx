import React, { useEffect, useRef, useState } from "react";
import image from "../../assets/LOGO-1.png";
import "./userlog.css";
import csrftoken from "../../csrf";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import backgroundimage from "../../assets/detail-page-the-who-what-and-where-of-online-shopping-in-2023.png";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/reducer";

import { setuserauthentication } from "../redux/reducer";
export default function UserLogin() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const input1ref = useRef(null);
  const input2ref = useRef(null);
  const [usermail, setmail] = useState("");
  const [userpass, setpass] = useState("");
  const userauth = useSelector((state) => state.auth.userauthentication);

  useEffect(() => {
    if (userauth == true) {
      navigate("/");
    }
  });

  const transfer = () => {
    navigate("/UserSignup");
  };
  const handlethechange = (e, reference) => {
    if (e.key === "Enter") {
      reference.current.focus();
    }
  };
  const userlogin = async () => {
    try {
      if (usermail !== "" && userpass != "") {
        const res = await fetch("http://localhost:8000/userLog", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usermail: usermail, userpass: userpass }),
        });
        const result = await res.json();
        if (result.data) {
          setmail("");
          setpass("");
          dispatch(setUserData(result.data));

          dispatch(setuserauthentication(true));
          cookies.set("email", result.data.email, { maxAge: 100000 });

          navigate("/");
        }
        if(result.nouse){
          alert(result.nouse)
        }
        if (result.error) {
          alert("wrong id and pass");
          setmail("");
          setpass("");
        }
      } else {
        alert("something went wrong");
      }
    } catch (error) {}
  };

  return (
    <div className="userlogmain">
      <div className="d-flex w-100 mb-5" style={{flexDirection:"flexStart"}}>
      <i  onClick={()=>navigate("/")} class="bi bi-arrow-left-circle-fill ml-5 text-dark" style={{fontSize:"20px",cursor:'pointer'}}></i>

      </div>
      <div className="userlogimage">
        <img src={image} alt="" />
      </div>
      <div className="userlogsub">
        <div>
          <h3 className="userlog-heading  mt-5">Welcome back</h3>
        </div>
        <div>
          <p className="userlog-subheading" style={{ color: "#e1e2e4" }}>
            Enter your credinentals to access your account
          </p>
        </div>
        <div>
          <form action="" className="mt-5 align-items-center">
            <div className="w-100" style={{ position: "relative" }}>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="email-input-userlog"
                value={usermail}
                onKeyDown={(event) => handlethechange(event, input2ref)}
                onChange={(event) => setmail(event.target.value)}
              />
              <i class="hello-email bi bi-envelope-fill"></i>
            </div>
            <div className="w-100 mt-4" style={{ position: "relative" }}>
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="password-input-userlog"
                ref={input2ref}
                value={userpass}
                onChange={(event) => setpass(event.target.value)}
              />
              <i class="bi bi-key-fill"></i>
            </div>
            <div className="w-100">
              <button
                className="user-log-btn mt-5"
                type="button"
                onClick={userlogin}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="w-100 d-flex justify-content-center mt-4">
          <div
            className="null-content"
            style={{ width: "100px", height: "4px" }}
          ></div>
        </div>
        <div>
          <div className="mt-3">
            <p className="userlog-forget-pass">
              forget your password ?
              <span className="text-primary" onClick={()=>navigate('/Forgetpass')} style={{cursor:"pointer"}}>Reset Password</span>
            </p>
          </div>
        </div>
        <div className="mt-3">
          <p className="userlog-forget-pass">
            dont have an account?
            <span className="text-primary" onClick={transfer} style={{cursor:"pointer"}}>sign up</span>

          </p>

        </div>
      </div>
      <div></div>
    </div>
  );
}
