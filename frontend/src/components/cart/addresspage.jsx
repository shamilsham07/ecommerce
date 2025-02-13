import React, { useState } from "react";
import "./cartpage.css";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import csrftoken from "../../csrf";
export default function Addresspage() {
  const userdetails = useSelector((state) => state.auth.userdata);
  const user_id = userdetails.id;
  console.log("useri", user_id);

  const [name, setname] = useState("");
  const [addreass, setaddreass] = useState("");
  const [pincode, setpincode] = useState("");
  const [city, setcity] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [email, setemail] = useState("");

  const adresssave = async (event) => {
    event.preventDefault()
    try {
      const formdata = new FormData();
      if (
        name != "" &&
        addreass != "" &&
        pincode != "" &&
        city != "" &&
        phonenumber != "" &&
        email != ""
      ) {
        formdata.append("name", name);
        formdata.append("addreass", addreass);
        formdata.append("pincode", pincode);
        formdata.append("city", city);
        formdata.append("phonenumber", phonenumber);
        formdata.append("email", email);
        formdata.append("user_id", user_id);

        const res = await fetch("http://localhost:8000/adresssave", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
          },
          body: formdata,
        });
          const result=await res.json()
          if(result.message){
            console.log("kk",result.message)
          }
          else{
             console.log(result.error)
          }




      } else {
        alert("one field is missing");
      }
    } catch (error) {
      console.log("error",error);
    }
  };

  return (
    <>
      <div className="main-address w-100 d-flex">
        <div className="left-adress">
          <div className="container">
            <form action="" className="p-5">
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div className="text-dark  d-flex align-items-center">
                  <h2 className="address-heading">Add Shipping Addreass</h2>
                </div>
                <div className="mt-4">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      select addreass
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Another action
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Something else
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              <div className="row w-100 mt-1">
                <div className="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="name"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={(event) => setname(event.target.value)}
                    />
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
                      onChange={(event) => setemail(event.target.value)}
                    />
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
                      placeholder="name@example.com"
                      onChange={(event) => setphonenumber(event.target.value)}
                    />
                    <label for="floatingInput">Phone Number</label>
                  </div>
                </div>
                <div className="col-6">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
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
                    Adrress
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
                    style={{ backgroundColor: "green" }}
                    onClick={(event) => adresssave(event)}
                    type="submit"
                  >
                    Save And Deliver Here
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="right-adress"></div>
      </div>
    </>
  );
}
