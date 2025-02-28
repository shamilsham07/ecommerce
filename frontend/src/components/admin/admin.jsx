import React, { useRef, useState } from "react";
import "./admin.css";
import image from "../../assets/19199299.jpg";
import csrftoken from "../../csrf.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authenticate } from "../redux/reducer.jsx";
import Loading from "../loading/loading.jsx";
import { loading } from "../redux/reducers.jsx";
import Cookies from "universal-cookie";

export default function Admin() {
  const cookies = new Cookies();
  const input2ref=useRef(null)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const value = useSelector((state) => state.cn.setLoading);
  const handle = async (event) => {
    // setCookies('user',"username",{path:"/admin" ,maxAge:4000})

    event.preventDefault();
    const res = await fetch("http://localhost:8000/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ username, password }),
    });
    dispatch(loading(true));
    {
      setTimeout(() => {
        dispatch(loading(false));
      }, 3000);
    }

    const result = await res.json();
    if (result.message) {
      cookies.set("username", username, { maxAge: 4000 });
     
      cookies.set("userKey", result.key);
      
      dispatch(authenticate(true));
      navigate("/adminproductpage");
    }

    if (result.error) {
      alert("wrong");
    }
  };
const reference=(event,reference)=>{
if(event.key=="Enter"){
reference.current.focus()
}
}
  return (
    <>
      {value? <Loading/> :
        <div
          className="w-100 d-flex justify-content-center align-items-center bg-light"
          style={{ height: "100vh" }}
        >
          <div className="admn-sub-log">
            <div className="admn-sub-left">
              <img src={image} alt="" className="log-img-admn" />
            </div>
            <div className="admn-sub-right d-flex">
              <div className="content"></div>
              <div className="admn-heading text-start">
                <h3> Login as a Admin User</h3>
              </div>
              <div className="admn-sub-form">
                <form action="" className="w-100">
                  <div class="admn-inp form-floating mb-3 w-100">
                    <input
                      type="text"
                      class="admn-inp form-control"
                      id="floatingInput"
                      placeholder="username"
                      name="username"
                      onChange={(event) =>
                     
                      setUsername(event.target.value)}
                      onKeyDown={(event)=>
                        reference(event,input2ref)
                      }

                    />
                    <label for="floatingInput">Username</label>
                  </div>
                  <div class="admn-inp form-floating w-100">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      ref={input2ref}
                      placeholder="Password"
                      onKeyDown={(event)=>{
                        if(event.key=="Enter"){
                          handle(event)
                        }
                      }}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                  <div className="w-100">
                    <button
                      className="admn-log-btn w-100 mt-4"
                      onClick={handle}
                      type="button"
                    >
                      LOGIN
                    </button>
                  </div>
                </form>

                <div className="text-center mt-5">
                  <p className="terms">Terms of Use.Privacy Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

