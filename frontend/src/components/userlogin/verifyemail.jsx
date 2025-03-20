import React, {useRef, useState } from "react";
import backgroundimage from "../../assets/5968949.jpg";
import "./userlog.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineMailOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setotp } from "../redux/reducer";

import csrftoken from "../../csrf";

export default function Verifyemail() {
  const input1ref = useRef(null);
  const input2ref = useRef(null);
  const input3ref = useRef(null);
  const input4ref = useRef(null);
  const input5ref = useRef(null);
  const navigate=useNavigate()
  const dispatch=useDispatch()


  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const otp = useSelector((state) => state.auth.otp);

  const [value, setvalue] = useState(["", "", "", ""]);

  const emailverify = async() => {
    const userotps = [input1, input2, input3, input4].join("");
    console.log("user", userotps);
    console.log("theotp",otp)

    if (otp == "") {
      alert("something went wrong please go back");
      setInput1("");
      setInput2("");
      setInput3("");
      setInput4("");
    } else if (userotps == otp) {
      console.log("hiu")

const res=await fetch("http://localhost:8000/varifyEmail",{
       method:"POST",
       headers:{
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
       },
       body:JSON.stringify({otp:userotps})

})
const result=await res.json()
if(result.message){
  dispatch(setotp(''))
  navigate("/Confirmpass")
}else{
  console.log("kkkkkkklllll")
}
    }
    else{
      console.log("hih")
    }
  };

  const handleback = (event, ref, index) => {
    if (event.key == "Backspace") {
      setvalue([input1, input2, input3, input4]);
    
      {
        setTimeout(() => [ref.current.focus()], 200);
      }
    }
  };

  const handleVerify = (event, reference, position) => {
   
    const newValue = event.target.value;
  

    if (newValue.length > 1) {
      return;
    }
    if (newValue.length > 0 && reference) {
      setvalue([input1, input2, input3, input4]);
      if (reference != input5ref) {
        reference.current.focus();
      }
    }
  
    if (newValue.length > 0 && reference == null) {
    }
  };


  return (
    <>
      <div>
        <div
          className="verifyemail-image d-flex justify-content-center aligin-items-center "
          style={{
            backgroundImage: `url(${backgroundimage})`,
            backgroundSize: "cover",
            height: "100vh",
            position: "relative",
          }}
        >
          <div
            className="d-flex ml-5 mt-5 "
            style={{ position: "fixed", top: "0" }}
          >
            <IoMdArrowRoundBack
              className="IoMdArrowRoundBack"
              style={{ fontSize: "30px", color: "black", cursor:"pointer" }}
              onClick={()=>navigate("/forgetpass")}
            />
          </div>
          <div className="text-center w-100">
            <div className=" mt-5 text-dark">
              <h2 className="Forget-Password-heading ">Verify Your Email</h2>
            </div>
          </div>
          <div className="forget-pass-sub d-flex justify-content-center align-items-center">
            <MdOutlineMailOutline className="FaLock" />
          </div>
          <div className="text-center mt-3">
            <h6 className="text-dark">
              Please Enter The 4 Digit Code Send To <br />
              {}
            </h6>
          </div>
          <div className="text-center">
            <form action="">
              <div
                className="verify-email-input d-flex w-100 justify-content-center align-items-center"
                style={{ gap: "10px" }}
              >
                <div>
                  <input
                    type="number"
                    className="close-inp"
                    ref={input1ref}
                    value={input1}
                    onInput={(event, ref, index) => {
                      var st = event.target.value
                      st = st.slice(-1) 
                      // if (input4.length < 1) {
                        setInput1(st); 
                    }}
                    onChange={(event) => handleVerify(event, input2ref)}

                    onKeyDown={(event, ref) => {
                      if (event.key === "Backspace") {
                        setInput1("");
                      }
                      handleback(event, input1ref);
                    }}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    className="close-inp"
                    ref={input2ref}
                    value={input2}
                    onInput={(event, ref, index) => {
                      var st = event.target.value
                      st = st.slice(-1) 
                      // if (input4.length < 1) {
                        setInput2(st); 
                    }}
                    onChange={(event) => handleVerify(event, input3ref)}
                    onKeyDown={(event, ref) => {
                      if (event.key == "Backspace") {
                        setInput2("");
                        handleback(event, input2ref);
                        if (input2 == "" && event.key === "Backspace") {
                          handleback(event, input1ref);
                        }
                      }
                    }}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    className="close-inp"
                    ref={input3ref}
                    value={input3}
                    onInput={(event, ref, index) => {
                      var st = event.target.value
                      st = st.slice(-1) 
                      // if (input4.length < 1) {
                        setInput3(st); 
                    }}
                    onChange={(event) => handleVerify(event, input4ref)}

                    onKeyDown={(event, ref) => {
                      if (event.key == "Backspace") {
                        setInput3("");
                        handleback(event, input3ref);
                        if (input3 == "" && event.key === "Backspace") {
                          handleback(event, input2ref);
                        }
                      }
                    }}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    className="close-inp"
                    ref={input4ref}
                    value={input4}
                    onInput={(event, ref, index) => {
                      console.log(event.target.value);
                      var st = event.target.value
                      st = st.slice(-1) 
                      // if (input4.length < 1) {
                        setInput4(st); 
                      // }
                    }}
                    onChange={(event) => handleVerify(event, input5ref)}
                    onKeyDown={(event, ref, index) => {
                      if (event.key == "Backspace") {
                        setInput4("");
                        handleback(event, input4ref);
                        if (input4 == "" && event.key == "Backspace") {
                          handleback(event, input3ref);
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="text-center mt-3">
            <h6 className="text-dark">Resend OTP</h6>
          </div>
          <div className="verify-button">
            <button type="button" ref={input5ref} onClick={emailverify}>
              Verify
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
