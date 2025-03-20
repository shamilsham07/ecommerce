import React, { useState } from "react";
import "./userlog.css";
import { FaLock } from "react-icons/fa";
import Loading from "../loading/loading";
import backgroundimage from "../../assets/5968949.jpg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loading } from "../redux/reducers";
import csrftoken from "../../csrf";
import { useNavigate } from "react-router-dom";
import { setemail, setotp } from "../redux/reducer";

import { IoMdArrowRoundBack } from "react-icons/io";
export default function Forgetpass() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const value = useSelector((state) => state.cn.setLoading);

  const userdetails = useSelector((state) => state.auth.userdata);
  const [mailvalue, setmailvalue] = useState("");

  
 
  const forgetpass = async () => {
    try {
      dispatch(loading(true));
      if (mailvalue) {
     
        const res = await fetch("http://localhost:8000/forgetpass", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: mailvalue}),
        });
        const result = await res.json();
        if (result.message) {
      
          dispatch(loading(false));
          if (result.otp) {
            console.log('uuuu',mailvalue)
            dispatch(setemail(mailvalue))
            dispatch(setotp(result.otp));
            navigate("/verifyemail");
          }
        } else if (result.error) {
       
          alert("something went wrong");
          dispatch(loading(false));
        }
      } else {
        alert("something went wrong");
        dispatch(loading(false));
      }
    } catch (error) {
   console.log("error",error)
    }
  };

  return (
    <>
      {value ? (
        <Loading />
      ) : (
        <div>
          <div
            className="bg-Iamge"
            style={{ backgroundImage: `url(${backgroundimage})` }}
          >
            <div className="text-center text-dark d-flex">
              <div className="ml-5 mt-5">
                <IoMdArrowRoundBack
                  className="IoMdArrowRoundBack"
                  style={{ fontSize: "30px", cursor:"pointer" }}
                  onClick={()=>navigate('/userlogin')}
                />
              </div>
              <div className="text-center d-flex  justify-content-center align-items-center w-100 mt-5">
                <h2
                  className="Forget-Password-heading"
                  style={{ marginRight: "49px" }}
                >
                  Forget Password
                </h2>
              </div>
            </div>
            <div className="forget-pass-sub d-flex justify-content-center align-items-center">
              <FaLock className="FaLock" />
            </div>
            <div className="text-center mt-3">
              <h6 className="text-dark">
                Please Enter Your Email Address <br />
                To Recieve a Verification Code
              </h6>
            </div>
            <div className="mt-5">
              <label htmlFor="" className="text-dark">
                Email Address
              </label>
              <br />
              <input
                type="email"
                className="forget-input"
                onChange={(event) => setmailvalue(event.target.value)}
              />
            </div>
            <div className="forget-btn">
              <button
                type="submit"
                className="forget-button"
                onClick={forgetpass}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
