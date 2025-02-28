import React, { useEffect, useRef, useState } from "react";
import "./userlog.css";
import csrftoken from "../../csrf";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cookies from 'universal-cookie';
import backgroundimage from "../../assets/detail-page-the-who-what-and-where-of-online-shopping-in-2023.png";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/reducer";

import { setuserauthentication } from "../redux/reducer";
export default function UserLogin() {
   const cookies = new Cookies();
 const navigate=useNavigate()
  const dispatch=useDispatch()
  const input1ref = useRef(null);
  const input2ref = useRef(null);
  const [usermail,setmail]=useState("")
  const [userpass,setpass]=useState("")
  const userauth=useSelector((state)=>state.auth.userauthentication)


useEffect(()=>{
  if(userauth==true){
       navigate("/")
  }
})



  const transfer=()=>{
    navigate("/UserSignup")
  }
  const handlethechange = (e, reference) => {
    if (e.key === "Enter") {
      reference.current.focus();
    }
  };
  const userlogin = async() => {
     try{
      if(usermail !==""&&userpass!=""){
        const res=await fetch("http://localhost:8000/userLog",{
          method:"POST",
          headers:{
            "X-CSRFToken": csrftoken,
          'Content-Type': 'application/json',


          },
          body:JSON.stringify({usermail:usermail,userpass:userpass})
        })
        const result=await res.json()
        if(result.data){
      
          setmail("")
          setpass("")
          dispatch(setUserData(result.data))
         
          dispatch(setuserauthentication(true))
          cookies.set("email",result.data.email,{maxAge:100000})
        
          navigate("/")
        }
        if(result.error){
          alert("wrong id and pass")
          setmail("")
          setpass("")
        }
       
      }
      else{
        alert("something went wrong")
      }
     }
     catch(error){
   
     }
  };

  return (
    <div>
      <div className="w-100 userlogmain">
        <div className="userlogsub d-flex">
          <div className="w-50">
            <div>
              <h2 className="userlog-heading text-dark mt-5"> Welcome Back</h2>
            </div>
            <div className="user-form">
              <form action="" className="form-user">
                <div className="container">
                  <div className="mb-3 position-relative">
                    <label
                      for="exampleInputEmail1"
                      class="usereamil form-label text-dark"
                    >
                      Email address <span>*</span>
                    </label>
                    <input
                      type="email"
                      class="form-control"
                      ref={input1ref}
                      id="exampleInputEmail1"
                      value={usermail}
                      onKeyDown={(event) => handlethechange(event, input2ref)}
                      onChange={(event)=>setmail(event.target.value)}
                      aria-describedby="emailHelp"
                      style={{
                        height: "42px",
                        marginLeft: "50px",
                        width: "75%",
                      }}
                    />
                  </div>
                  <div className="position-relative mt-5">
                    <label
                      for="exampleInputPassword1"
                      class="form-label user-pass text-dark"
                    >
                      Password <span>*</span>
                    </label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      value={userpass}
                      ref={input2ref}
                      style={{
                        height: "42px",
                        marginLeft: "50px",

                        width: "75%",
                      }}
                      onChange={(event)=>setpass(event.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="user-log-btn mt-5"
                    onClick={userlogin}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <p
              style={{
                fontSize: "14px",
              }}
              className="mt-2"
            >
              dont have an account ?{" "}
              <span style={{ color: "blue", fontSize: "12px",cursor:"pointer" }} onClick={transfer}>signup</span>
            </p>
          </div>
          <div
            className="userlogsub-right"
            style={{ backgroundImage: `url(${backgroundimage})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
