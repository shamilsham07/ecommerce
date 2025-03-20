import React, { useRef, useState } from "react";
import "./userlog.css";
import images from "../../assets/businessman-working-futuristic-office.jpg";
import csrftoken from "../../csrf";
import { useNavigate } from "react-router-dom";

export default function UserSignup() {
  const navigate = useNavigate();
  const input1ref = useRef(null);
  const input2ref = useRef(null);
  const input3ref = useRef(null);
  const input4ref = useRef(null);
  const input5ref = useRef(null);
  const [userpass, setpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [username, setname] = useState("");
  const [useremail, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");

  const clearForm = () => {
    setpass("");
    setconfirmpass("");
    setname("");
    setemail("");
    setphonenumber("");
  };

  const handlechange = (e, reference) => {
    if (e.key == "Enter") {
      reference.current.focus();
    }
  };
  const userSignup = async () => {
    if (
      userpass != "" &&
      confirmpass != "" &&
      phonenumber != "" &&
      useremail != "" &&
      username != ""
    ) {
      if (userpass == confirmpass) {
        const formdata = new FormData();
        formdata.append("userpass", userpass);
        formdata.append("confirmpass", confirmpass);
        formdata.append("username", username);
        formdata.append("useremail", useremail);
        formdata.append("phonenumber", phonenumber);

        try {
          const res = await fetch("http://localhost:8000/usersignup", {
            method: "POST",
            headers: {
              "X-CSRFToken": csrftoken,
            },
            body: formdata,
          });
          const result = await res.json();
          if (result.message) {
            clearForm();

            navigate("/UserLogin");
          }
          if (result.error) {
          }
          if (result.data) {
            setemail("");
            alert("the email already exists");
          }
        } catch (error) {}
      } else {
        alert("password doesn't match");
      }
    }
  };

  return (
    <>
      <div className="w-100" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "100vh" }}>
          <div className="col-6" style={{ height: "100%" }}>
            <div
              className="w-100 left-user-signup-side"
              style={{ height: "100%", background: "#154373" }}
            >
              <div>
                <h1 className="heading-left-user-signup">hello, friend! </h1>
              </div>
              <div></div>
              <p className="left-sub-content-user-signup">
                Enter your personal details and strat journey with us
              </p>
            </div>
          </div>
          <div
            className="col-6"
            style={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="right-user-signup-side w-100">
              <div className="text-start">
                <h1 className="right-user-signup-heading">
                  create <br /> new account.
                </h1>
              </div>
              <form action="" className="p-5">
                <div className="w-100 username-input-div">
                  <div className="text-start ml-1">
                    <label htmlFor="" className="username-label">
                      username
                    </label>
                  </div>
                  <div className="text-start">
                    <input
                      type="text"
                      className=" username-user-signup-field p-2"
                      style={{ width: "97%" }}
                      value={username}
                      name="username"
                      ref={input1ref}
                      onKeyDown={(event) => handlechange(event, input2ref)}
                      onChange={(event) => setname(event.target.value)}
                    />
                  </div>
                </div>

                <div className="row w-100 m-0 p-0 justify-content-between">
                  <div className="col-md-6 username-input-div mt-3 p-0">
                    <div className="text-start ml-1">
                      <label htmlFor="" className="username-label">
                        email
                      </label>
                    </div>
                    <div className="text-start">
                      <input
                        type="email"
                        className="w-100 username-user-signup-field p-2"
                        value={useremail}
                        ref={input2ref}
                        name="email"
                        onKeyDown={(event) => handlechange(event, input3ref)}
                        onChange={(event) => setemail(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 username-input-div mt-3 ">
                    <div className="text-start ml-1">
                      <label htmlFor="" className="username-label">
                        phone number
                      </label>
                    </div>
                    <div className="text-start">
                      <input
                        type="number"
                        className="w-100 username-user-signup-field p-2"
                        value={phonenumber}
                        name="phonenumber"
                        ref={input3ref}
                        onKeyDown={(event) => handlechange(event, input4ref)}
                        onChange={(event) => setphonenumber(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row w-100 m-0 p-0 justify-content-between">
                  <div className="col-md-6 username-input-div mt-3 p-0">
                    <div className="text-start ml-1">
                      <label htmlFor="" className="username-label">
                        password*
                      </label>
                    </div>
                    <div className="text-start">
                      <input
                        type="password"
                        className="w-100 username-user-signup-field p-2"
                        value={userpass}
                        ref={input4ref}
                        name="password"
                        onChange={(event) =>
                          setpass(event.target.value.replace(/\s+/g, ""))
                        }
                        onKeyDown={(event) => handlechange(event, input5ref)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 username-input-div mt-3 ">
                    <div className="text-start ml-1">
                      <label htmlFor="" className="username-label">
                        confirm password*
                      </label>
                    </div>
                    <div className="text-start">
                      <input
                        type="password"
                        className="w-100 username-user-signup-field p-2"
                        value={confirmpass}
                        ref={input5ref}
                        onChange={(event) =>
                          setconfirmpass(event.target.value.replace(/\s+/g, ""))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="w-100 mt-5">
                  <button
                    className="signup-page-sign-btn"
                    type="button"
                    onClick={userSignup}
                  >
                    sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
