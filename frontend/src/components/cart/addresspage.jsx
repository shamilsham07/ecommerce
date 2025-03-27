import React, { useState } from "react";
import "./cartpage.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import csrftoken from "../../csrf";
import Nav2 from "../nav2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Addresspage() {
  const navigate = useNavigate("");
  const userdetails = useSelector((state) => state.auth.userdata);
  const user_id = userdetails.id;
  const{id}=useParams()

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,}$/i;
  const userAdreass_id = useSelector((state) => state.auth.addreassId);

  const [name, setname] = useState("");
  const [addreass, setaddreass] = useState("");
  const [pincode, setpincode] = useState("");
  const [city, setcity] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [email, setemail] = useState("");
  const [defname, setdefname] = useState(false);
  const [defemail, setdefemail] = useState(false);
  const [defphone, setdefphone] = useState(false);

  const emptyfield = () => {
    setpincode("");
    setcity("");
    setphonenumber("");
    setemail("");
    setname("");
  };

  const adresssave = async (event) => {
    event.preventDefault();
    if (name.length < 3) {
      setdefname(false);
    }

    try {
      const formdata = new FormData();
      if (defname == true) {
        alert("enter the name");
        return;
      }
      if (defphone == true) {
        alert("enter the phone number");
        return;
      }
      if (!emailPattern.test(email)) {
        setdefemail(true);
        alert("Enter a valid email");
        return;
      }
      if (
        name == "" &&
        phonenumber == "" &&
        email == "" &&
        city == "" &&
        addreass == "" &&
        pincode == ""
      ) {
        alert("wrong form");
        return;
      } else {
        formdata.append("name", name);
        formdata.append("addreass", addreass);
        formdata.append("pincode", pincode);
        formdata.append("city", city);
        formdata.append("phonenumber", phonenumber);
        formdata.append("email", email);
        formdata.append("user_id", user_id);
        console.log("FFFFFFFFFFFFFFFFFF")

        const res = await fetch("http://localhost:8000/adresssave", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
          },
          body: formdata,
        });
        const result = await res.json();
        if (result.message) {
         
          emptyfield();
          navigate(`/adreass/${id}`);
        } else if (result.maximum) {
          alert("already reached maximum number of addreass");
          emptyfield();
          navigate(`/adreass/${id}`);
        } else {
        
        }
      }
    } catch (error) {
     
    }
  };

  return (
    <>
    <Nav2/>
      <div className="main-address w-100 d-flex mt-5">
        <div className="left-adress">
          <div className="container">
            <form action="" className="p-5">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div className="text-dark  d-flex align-items-center">
                  <h2 className="address-heading">Add Shipping Addreass</h2>
                </div>
              </div>

              <div className="row w-100 mt-1">
                <div className="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder=""
                      name=""
                      onChange={(event) => {
                        setname(event.target.value);
                        if (event.target.value.length < 3) {
                          setdefname(true);
                        } else {
                          setdefname(false);
                        }
                      }}
                    />
                    <p className={defname ? "text-danger" : "d-none"}>
                      enter valid name
                    </p>
                    <label for="floatingInput">Name</label>
                  </div>
                </div>
                <div className="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      name="email"
                      onInput={(event) => {
                        setemail(event.target.value);

                        if (!emailPattern.test(event.target.value)) {
                          setdefemail(true);
                        } else {
                          setdefemail(false);
                        }
                      }}
                    />
                    <p className={defemail ? "text-danger" : "d-none"}>
                      enter valid email
                    </p>

                    <label for="floatingInput">Email address</label>
                  </div>
                </div>
              </div>
              <div className="row w-100 mt-1">
                <div className="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingInput"
                      placeholder=""
                      name="phone"
                      onChange={(event) => {
                        setphonenumber(event.target.value);
                        if (event.target.value.length < 10) {
                          setdefphone(true);
                        } else {
                          setdefphone(false);
                        }
                      }}
                    />
                    <p className={defphone ? "text-danger" : "d-none"}>
                      enter the valid phonenumber
                    </p>

                    <label for="floatingInput">Phone Number</label>
                  </div>
                </div>
                <div className="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder=""
                      onChange={(event) => setcity(event.target.value)}
                    />
                    <label for="floatingInput">Place/City</label>
                  </div>
                </div>
              </div>
              <div className="row w-100">
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    onChange={(event) => setaddreass(event.target.value)}
                  ></textarea>
                  <label for="floatingTextarea2" className="ml-1">
                    Address
                  </label>
                </div>
              </div>
              <div className="row w-100">
                <div className="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingInput"
                      name="pincode"
                      placeholder="name@example.com"
                      onChange={(event) => setpincode(event.target.value)}
                    />
                    <label for="floatingInput">Pincode</label>
                  </div>
                </div>
              </div>
              <div className="row w-100">
                <div className="col-12">
                  <button
                    className="add-new-adreass  w-100"
                  
                    onClick={(event) => adresssave(event)}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
