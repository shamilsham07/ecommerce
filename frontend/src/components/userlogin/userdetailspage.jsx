import React, { useEffect, useState } from "react";
import "./userlog.css";
import { useSelector } from "react-redux";
import image from "../../assets/young-joyful-student-man-holding-thumb-up-isolated.jpg";

import csrftoken from "../../csrf";
import { useNavigate } from "react-router-dom";
import nullimage from "../../assets/Sample_User_Icon.png"

export default function Userdetails() {
  const [flag, setflag] = useState("profile");
  const navigate = useNavigate();
  const userdetails = useSelector((state) => state.auth.userdata);
  console.log("this is user",userdetails)
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [password, setPassword] = useState("");
  const[image,setimage]=useState(null)

  const user_id = userdetails.id;

  const saveprofile = async () => {
    const formdata=new FormData()
    formdata.append("name",name)
    formdata.append("image",image)
    formdata.append("phonenumber",phonenumber)
    formdata.append("email",email)
    formdata.append("user_id",user_id)
    console.log("hello",image)
    try {
      const result = await fetch("http://localhost:8000/saveprofile", {
        method: "post",
        headers: {
          "X-CSRFToken": csrftoken,

        },
        body: formdata
      });
      const res = await result.json();
      if (res.data) {
        console.log(res.data);
      } else {
        console.log("errorrrrr");
      }
    } catch (error) {
      console.log("your error", error);
    }
  };

  const changing = (p) => {
    if (p == "passkey") {
      document.getElementsByClassName("overview-of-profile")[0].style.display =
        "none";
      document.getElementsByClassName("reviews-overviewss")[0].style.display =
        "none";
      document.getElementsByClassName("passkey-overview")[0].style.display =
        "flex";
    } else if (p == "review") {
      document.getElementsByClassName("overview-of-profile")[0].style.display =
        "none";
      document.getElementsByClassName("reviews-overviewss")[0].style.display =
        "flex";
      document.getElementsByClassName("passkey-overview")[0].style.display =
        "none";
    } else if ((p = "profile")) {
      document.getElementsByClassName("overview-of-profile")[0].style.display =
        "flex";
      document.getElementsByClassName("reviews-overviewss")[0].style.display =
        "none";
      document.getElementsByClassName("passkey-overview")[0].style.display =
        "none";
    }
  };
  const selctingfile = () => {
    document
      .getElementsByClassName("bi-plus-circle")[0]
      .addEventListener("click", () => {
        document.getElementById("fileInput").click();
      });
  };

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
    setimage(userdetails.image||"")
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
        style={{
          backgroundColor: "rgb(243,243,243)",
          height: "100vh",
          borderRadius: "15px",
        }}
      >
        <div className="col-1" style={{ height: "480px" }}>
          <div className="sidebar-profile-seconds">
            <i class="bi bi-arrow-left-circle"></i>
          </div>
          <div className="sidebar-profile">
            <div
              className={`sidebar-profile-second ${
                flag == "profile" ? "select-btn-profile" : ""
              }`}
            >
              <i
                class="bi bi-person"
                onClick={() => {
                  setflag("profile");
                  changing("profile");
                }}
              ></i>
            </div>
            <div
              className={`sidebar-profile-second ${
                flag == "review" ? "select-btn-profile" : ""
              }`}
            >
              <i
                class="bi bi-files"
                onClick={() => {
                  setflag("review");
                  changing("review");
                }}
              ></i>
            </div>
            <div
              className={`sidebar-profile-second ${
                flag == "passkey" ? "select-btn-profile" : ""
              }`}
            >
              <i
                class="bi bi-key"
                onClick={() => {
                  setflag("passkey");
                  changing("passkey");
                }}
              ></i>
            </div>
          </div>
        </div>

        <div className="col-6 overview-of-profile">
          <div className="w-100" style={{ backgroundColor: "white" }}>
            <div className="grid">
              <div className="container">
                <div className="i-margin">
                  <div className="col-12 mt-3">
                    <div className="heading-of-profile d-flex justify-content-start">
                      <h2 className="m-0 p-0">Profile</h2>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex justify-content-start position-relative">
                      <div className="dot position-relative">
                        <img src={`${image?`http://localhost:8000/${image}`:nullimage}`} className="dot-img" alt="" />
                        <i
                          class="bi bi-plus-circle position-absolute"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            selctingfile();
                          }}
                        ></i>
                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: "none" }}
                          onChange={(event)=>setimage(event.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 w-100">
                  <div className="grid">
                    <div className="col-12">
                      <div className="i-margin">
                        <div className="text-start">
                          <label
                            htmlFor=""
                            className="label-user-profile text-start fw-bold"
                          >
                            Username
                          </label>
                        </div>
                        <div className="text-start profile">
                          <input
                            type=""
                            name="name"
                            value={name}
                            onChange={(event) => setname(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="i-margin">
                        <div className="text-start">
                          <label
                            htmlFor=""
                            className="label-user-profile text-start fw-bold"
                          >
                            email
                          </label>
                        </div>
                        <div className="text-start profile">
                          <input
                            type=""
                            name="email"
                            value={email}
                            onChange={(event) => setemail(event.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="i-margin">
                        <div className="text-start">
                          <label
                            htmlFor=""
                            className="label-user-profile text-start fw-bold"
                          >
                            phonenumber
                          </label>
                        </div>
                        <div className="text-start profile">
                          <input
                            type=""
                            name="phonenumber"
                            value={phonenumber}
                            onChange={(event) =>
                              setphonenumber(event.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="i-margin">
                        <div className="grid align-items-center">
                          <div className="col-12">
                            <div className="w-100 text-start save-profile ">
                              <button
                                type="button"
                                onClick={() => {
                                  saveprofile();
                                }}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 reviews-overviewss" style={{ height: "475px" }}>
          <div className="w-100" style={{ background: "white" }}>
            <div className="grid">
              <div className="container">
                <div
                  className="w-100"
                  style={{
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                >
                  <div className="col-12 mt-5">
                    <div className="text-start heading-of-profiles">
                      <h2>reviews</h2>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="grid">
                      <div className="col-1 m-0 p-0">
                        <div className="circle-for-profile">
                          <img src={image} className="dot-img" alt="" />
                        </div>
                      </div>
                      <div className="col-5 text-start">
                        <div className="grid align-items-center">
                          <div className="col-4 m-0 p-0">
                            <h6 className="review-profile-name m-0 p-0">
                              shamil
                            </h6>
                          </div>
                          <div className="col-12 m-0 p-0 ">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={
                                  i < 3
                                    ? "bi bi-star-fill text-warning"
                                    : "bi bi-star text-warning"
                                }
                              ></i>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="col-3">
                        <div className="text-end">
                          <h6 className="fw-bold text-dark">20/12/12</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div
            className="passkey-overview"
            style={{ background: "white", height: "475px" }}
          >
            <div className="grid w-100 justify-content-center align-items-center">
              <div className="container">
                <div className="i-margin">
                  <div className="col-12 mt-3">
                    <div>
                      <h2 className="heading-of-profiles">change password</h2>
                    </div>
                  </div>
                  <div className="col-12 text-start">
                    <div>
                      <label htmlFor="" className="label-user-profile">
                        email
                      </label>
                    </div>
                    <div className="profile">
                      <input type="text" />
                    </div>
                  </div>

                  <div className="col-12 text-start">
                    <div>
                      <label htmlFor="" className="label-user-profile">
                        password
                      </label>
                    </div>
                    <div className="profile">
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-12 text-start">
                    <div>
                      <label htmlFor="" className="label-user-profile">
                        confirm password
                      </label>
                    </div>
                    <div className="profile">
                      <input type="text" />
                    </div>
                  </div>
                  <div className="col-6 align-items-center justify-content-start">
                    <div className="forget-profile text-start">
                      <h6>forget password?</h6>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="save-profile ">
                      <button>Save</button>
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
