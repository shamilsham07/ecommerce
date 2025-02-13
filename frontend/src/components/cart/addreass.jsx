import React, { useEffect, useState } from "react";
import Nav from "../nav";
import "./cartpage.css";
import { useNavigate } from "react-router-dom";
import csrftoken from "../../csrf";
import { useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
export default function Adreass() {
  const navigation=useNavigate()
  const [addressdetails, setaddreassdetails] = useState([]);
  const userdetails = useSelector((state) => state.auth.userdata);
  const [value, setvaalue] = useState(false);
  const user_id = userdetails?.id;
  console.log("kk", user_id);
  


const AddnewAddreass=()=>{
  navigation("/Addresspage")
}


  const getdetails = async () => {
    console.log("hh", user_id);
    try {
      if (user_id) {
        const res = await fetch("http://localhost:8000/getaddreass", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user_id }),
        });
        const result = await res.json();
        if (result.data) {
          setaddreassdetails(result.data);
          console.log(addressdetails);
          setvaalue(true);
        }
        if (result.error) {
          console.log("ccccccc");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddreass = (id) => {
    console.log("item", id);



  };

  useEffect(() => {
    getdetails();
  }, [user_id]);

  return (
    <>
      <Nav />

      <div className="adreass-section container">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="heading-main-add text-dark">Addresses</h2>
          </div>
          <div>
            <button className="new-add-btn" onClick={AddnewAddreass}>
              {" "}
              <span>
                <MdAdd />
              </span>
              add new addreass
            </button>
          </div>
        </div>

        {value ? (
          <div className="row p-5 w-100">
            {addressdetails.map((addreass, index) => (
              <div className="col-3" key={index}>
                <div
                  class="card addreass-card"
                  onClick={() => handleAddreass(addreass.id)}
                >
                  <div class="card-body ">
                    <h5 class="card-title card-heads">{addreass.city}</h5>

                    <h6 class="card-subtitle mb-2 card-names">
                      {addreass.name}
                    </h6>
                    <p class="card-text w-100 text-dark card-addreass-p">
                      {addreass.addreass}
                    </p>
                    <p className="card-text card-ph">
                      P :{addreass.phonenumber}
                    </p>
                    <div className="addreass-edit">
                      <span>
                        <MdDelete className="md-addreass" />
                      </span>
                      <span>
                        <FaPencilAlt className="md-edit-addreass" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>nodataaaaaaa</div>
        )}
      </div>
    </>
  );
}
