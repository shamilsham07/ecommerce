import React, { useState } from "react";
import backgroundimage from "../../assets/5968949.jpg";
import { FaLock } from "react-icons/fa";
import "./userlog.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import csrftoken from "../../csrf";
export default function Confirmpass() {
    const navigate=useNavigate("")
  const [pass1, setpass1] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const userdetails = useSelector((state) => state.auth.userdata);
  const user_id=userdetails.id
  const confirmSave = async () => {
    if (pass1 == confirmpass) {
      const res = await fetch("http://localhost:8000/Userconfirmpass", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body:JSON.stringify({id:user_id,password:pass1})
      });
      const result=await res.json()
      if(result.message){
        navigate('/')
      }
      else{
        console.log("error")
      }
    } else {
      console.log("wrongpassword");
    }
  };

  return (
    <>
      <div
        className="verifyemail-image d-flex justify-content-center aligin-items-center "
        style={{
          backgroundImage: `url(${backgroundimage})`,
          backgroundSize: "cover",
          height: "100vh",
          position: "relative",
        }}
      >
        <div className="text-dark mb-3">
          <h2>Create New Password</h2>
        </div>
        <div className="forget-pass-sub d-flex justify-content-center align-items-center">
          <FaLock className="FaLock" />
        </div>
        <div className="mt-3">
          <h6 className="text-dark">
            Your New Password Must Be Different <br />
            From Previously Used Password
          </h6>
        </div>
        <div className="row">
          <form action="">
            <div class="new-pass form-floating col-4">
              <input
                type="password"
                value={pass1}
                onChange={(event) => setpass1(event.target.value)}
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">
                New Password <span>*</span>
              </label>
            </div>
            <div class="new-pass form-floating col-4">
              <input
                type="password"
                class="form-control"
                value={confirmpass}
                onChange={(event) => setconfirmpass(event.target.value)}
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">
                Confirm Password <span>*</span>
              </label>
            </div>
            <div className="confirm-btn mt-2">
              <button type="button" onClick={confirmSave}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
