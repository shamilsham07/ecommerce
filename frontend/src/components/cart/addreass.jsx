import React, { useEffect, useState } from "react";
import Nav2 from "../nav2";
import "./cartpage.css";
import { useNavigate } from "react-router-dom";
import csrftoken from "../../csrf";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import image from"../../assets/41jOEM5KONL._SX569_.jpg";
import { setaddreass } from "../redux/reducer";
export default function Adreass() {
  const dispatch = useDispatch("");
  const navigation = useNavigate();
  const [addressdetails, setaddreassdetails] = useState([]);
  const userdetails = useSelector((state) => state.auth.userdata);
  const [value, setvaalue] = useState(false);
  const user_id = userdetails?.id;

  const AddnewAddreass = () => {
    navigation("/Addresspage");
  };

  const getdetails = async () => {
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

const ondeleteaddreass=async(id)=>{
  const addreass_id=id
try{


const res =await fetch("http://localhost:8000/deleteaddreass",{
  method:"POST",
  headers:{
    "X-CSRFToken": csrftoken,
    'Content-Type': 'application/json',
  },
  body:JSON.stringify({id:addreass_id,user_id:user_id})

})
const result=await res.json()

if(result.data){
  setaddreassdetails(result.data)
}
else{
  console.log("errorrrrrrrrrr")
}



}catch(error){
  console.log("error",error)
}


}


  const handleAddreass = (id) => {
    {
      document.querySelectorAll(".addreass-card").forEach((el) => {
        el.classList.remove("card-active");
      });

      document
        .querySelector(`.addreass-card[data-id="${id}"]`)
        ?.classList.add("card-active");
    }

  
    dispatch(setaddreass(id));
  };

  useEffect(() => {
    getdetails();
  }, [user_id]);

  return (
    <>
      <Nav2 />

      <div className="adreass-section container">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="heading-main-add">Addresses</h2>
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
            <div className="col-9">
              <div className="row">
                {addressdetails.map((addreass, index) => (
                  <div className="col-4" key={index}>
                    <div
                      className="card addreass-card "
                      data-id={addreass.id}
                      onClick={() => handleAddreass(addreass.id)}
                    >
                      <div class="card-body  body-of-card">
                        <h5 class="card-title card-heads text-dark">{addreass.city}</h5>

                        <h6 class="card-subtitle mb-2 card-names text-dark">
                          {addreass.name}
                        </h6>
                        <p class="card-text w-100 text-dark card-addreass-p m-0 p-0 ">
                          PH: {addreass.phonenumber}
                        </p>
                        <p className="card-text card-ph m-0">{addreass.email}</p>
                        <p className="card-text card-ph m-0">{addreass.addreass}</p>
                        <div className="addreass-edit">
                          <span className="md-addreass">
                            <MdDelete className="text-white" onClick={()=>ondeleteaddreass(addreass.id)} />
                          </span>
                          <span className="md-addreass">
                            <FaPencilAlt className="text-white" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-3">
              <div className="product-details-buy">
                <h5>
                   Order Summary
                </h5>
                <hr />

<div className="d-flex">
 <div className="summaryimage">
<img src={image} alt="jj" />
 </div>
 <div className="ml-5 mt-4">
  <div>
Name: samsung j19
  </div>
  <div>
    Quantity: 4 

  </div>
 </div>
</div>
<div>
<div className="mt-4 promocode">
<h5  >
  Promo Code
</h5>

</div>
<div className="promoinput">
<input type="text" placeholder="Enter your code"/>
<button>Apply</button> 

</div>
<hr />
<div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
  <label className="form-check-label" htmlFor="flexRadioDefault1">
    COD
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
  <label className="form-check-label" htmlFor="flexRadioDefault2">
    Razer Pay
  </label>
</div>
<div className="order-summary-btn">
  <button>buy</button>
</div>

</div>




</div>



              </div>
          </div>
          </div>
        ) : (
          <div>nodataaaaaaa</div>
        )}
      </div>
    </>
  );
}
