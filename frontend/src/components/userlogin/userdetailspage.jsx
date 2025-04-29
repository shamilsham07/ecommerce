import React, { useEffect, useState } from "react";
import "./userlog.css";
import { useSelector } from "react-redux";

import csrftoken from "../../csrf";
import { useNavigate } from "react-router-dom";

export default function Userdetails() {
  const navigate = useNavigate();
  const userdetails = useSelector((state) => state.auth.userdata);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [password, setPassword] = useState("");

  const user_id = userdetails.id;

  const forgetpassword = () => {
    navigate("/Forgetpass");
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      if (password !== "") {
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", email);
        formdata.append("phonenumber", phonenumber);
        formdata.append("password", password);
        formdata.append("user_id", user_id);

        const res = await fetch("http://localhost:8000/UserUpdate", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
          },
          body: formdata,
        });

        const result = await res.json();

        if (result.message) {
          navigate("/");
        } else if (result.error) {
        } else if (result.nouser) {
        } else if (result.wrong) {
          alert("wrong password");
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    setname(userdetails.name || "");
    setemail(userdetails.email || "");
    setphonenumber(userdetails.phonenumber || "");
  }, [userdetails]);

  return (
    <>
      {/* <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "100vh", backgroundColor: " rgb(243,243,243)" }}
      >
        <div className="Userdetails-sub">
          <div className="text-center">
            <h2 className="text-dark">Profile</h2>
          </div>
          <form action="">
            <div className="row w-100 ml-1 mt-3 mb-3">
              <div className="col-6">
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="email"
                  class="form-control userdetailsemail"
                  id="exampleInputEmail1"
                  value={name}
                  name="email"
                  onChange={(event)=>setname(event.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="col-6">
                <label for="exampleInputPassword1">Phone number</label>
                <input
                  type="number"
                  class="form-control userdetailspass"
                  id="exampleInputPassword1"
                  value={phonenumber}
                  onChange={(event)=>setphonenumber(event.target.value)}
                  placeholder="enter the phone number"
                />
              </div>
            </div>
            <div className="row w-100 ml-1  mb-3">
              <div className="col-6">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control userdetailsemail"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(event)=>setemail(event.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="col-6">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control userdetailspass"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  onChange={(event)=>setPassword(event.target.value)}
                />
              </div>
            </div>
            <div style={{ marginLeft: "auto", marginRight: "auto" }}>
              <button type="buttton" className="details-btn" onClick={(e)=>update(e)}>
                update
              </button>
       
            </div>
          </form>
          <div className="row">
              <div className="col-6"style={{}}>
                <span>  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                <label class="form-check-label text-primary" for="flexCheckDefault ">
   remember me
  </label></span>
               
              </div>
              <div className="col-6">
                 <p className="text-primary" style={{cursor:"pointer"}} onClick={forgetpassword}>forget password ?</p>
              </div>
             </div>
        </div>
      </div> */}

      <div
        className="grid justify-content-center align-items-center m-0 p-0"
        style={{ backgroundColor: "rgb(243,243,243)", height: "100vh" }}
      >
        <div className="col-6">
          <div className="w-100" style={{ backgroundColor: "white" }}>
            <div className="grid">
              <div className="container">
                <div className="d-padding">

              
                <div className="col-6">
                  <div className="i-margin">
                    <div className="text-start">
                      <label htmlFor="" className="label-user-profile text-start">
                        Username
                      </label>
                    </div>
                    <div className="text-start profile-">
                      <input type="" />
                    </div>
                  </div>
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
