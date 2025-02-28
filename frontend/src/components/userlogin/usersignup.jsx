import React, { useRef, useState } from "react";
import "./userlog.css";
import csrftoken from "../../csrf";
import { useNavigate } from "react-router-dom";

export default function UserSignup() {
  const navigate=useNavigate()
  const input1ref = useRef(null);
  const input2ref = useRef(null);
  const input3ref = useRef(null);
  const input4ref = useRef(null);
  const input5ref = useRef(null);
  const [userpass,setpass]=useState('')
  const[confirmpass,setconfirmpass]=useState("")
  const[username,setname]=useState("")
  const[useremail,setemail]=useState("")
  const[phonenumber,setphonenumber]=useState("")
  

const clearForm=()=>{
  setpass("")
  setconfirmpass("")
  setname("")
  setemail("")
  setphonenumber("")

}

const handlechange=(e,reference)=>{
  if (e.key=="Enter"){
     reference.current.focus()
  }
}
const userSignup=async()=>{

if(userpass !=""&& confirmpass!="" && phonenumber!="" &&useremail !="" &&username!=""){
  if(userpass == confirmpass){
      const formdata=new FormData()
      formdata.append("userpass",userpass)
      formdata.append("confirmpass",confirmpass)
      formdata.append("username",username)
      formdata.append("useremail",useremail)
      formdata.append("phonenumber",phonenumber)



   try{
const res=await fetch("http://localhost:8000/usersignup",{
  method:"POST",
  headers:
  {
    "X-CSRFToken": csrftoken,
  },
  body:formdata
})
const result=await res.json()
if(result.message){
  clearForm()

  navigate("/UserLogin")
}
if(result.error){

}
if(result.data){

  setemail("")
  alert("the email already exists")
  
}


   }
   catch(error){

   }
    }     
    else{
   
      alert("password doesn't match")
    }
}


}



  return (
    <>
      <div className="userSign-main">
        <div className="signup-sub">
          <div>
            <h1 className="text-dark heading-signup-user">Create account</h1>
          </div>
          <form action="">
          <div className="mt-5 w-100">
            <div
              className="row"
              style={{
                width: "100%",
                marginLeft: "4px",
              }}
            >
              <div className="col-6">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    value={username}
                    ref={input1ref}
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onKeyDown={(event)=>handlechange(event,input2ref)}
                    onChange={(event)=>setname(event.target.value)}
                  />
                  <label for="floatingInput">
                    Name <span>*</span>
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    value={useremail}
                    class="form-control"
                    id="floatingInput"
                    ref={input2ref}
                    placeholder="name@example.com"
                    onKeyDown={(event)=>handlechange(event,input3ref)}
                    onChange={(event)=>setemail(event.target.value)}
                  />
                  <label for="floatingInput">Email address</label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 w-100">
            <div
              className="row"
              style={{
                width: "100%",
                marginLeft: "4px",
              }}
            >
              <div className="col-6">
                <div class="form-floating mb-3">
                  <input
                    type="number"
                    value={phonenumber}
                    class="form-control"
                    id="floatingInput"
                    ref={input3ref}
                    placeholder="name@example.com"
                    onKeyDown={(event)=>handlechange(event,input4ref)}
                    onChange={(event)=>setphonenumber(event.target.value)}
                  />
                  <label for="floatingInput">
                    Phone Number <span>*</span>
                  </label>
                </div>
              </div>
              <div className="col-6">
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={userpass}
                    ref={input4ref}
                    onChange={(event)=>setpass(event.target.value.replace(/\s+/g,""))}
                    onKeyDown={(event)=>handlechange(event,input5ref)}

                  />
                  <label for="floatingPassword">
                    Password <span>*</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3  w-100">
            <div
              className="row"
              style={{
                width: "100%",
                marginLeft: "4px",
              }}
            >
              <div
                className="col-6 "
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <div class="form-floating text-center">
                  <input
                    type="password"
                    class="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    value={confirmpass}
                    ref={input5ref}
                    onChange={(event)=>setconfirmpass(event.target.value.replace(/\s+/g,''))}
                  />
                  <label for="floatingPassword">
                    Confirm Password <span>*</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 w-100">
            <button type="button" className="user-signup-btn" onClick={userSignup}>
              signup
            </button>
          </div>
          </form>
      
        </div>
      </div>
    </>
  );
}
