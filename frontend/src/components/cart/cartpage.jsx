import React, { useEffect, useState } from "react";

import Nav2 from "../nav2";
import { IoMdAdd } from "react-icons/io";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { MdMinimize } from "react-icons/md";
import { VscChromeMinimize } from "react-icons/vsc";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useSelector } from "react-redux";
import "./cartpage.css";
import csrftoken from "../../csrf";

export default function Cartpage() {
 const[product,setproduct]=useState([])
 const userdetails = useSelector((state) => state.auth.userdata);
const id =userdetails.id

const navigate=useNavigate()
useEffect(()=>{
const callcart=async()=>{
  const res=await fetch("http://localhost:8000/getcart",{
   method:"POST",
   headers:{
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
   },
   body:JSON.stringify({id:id})
  })
  const result=await res.json()
  if(result.data){
 setproduct(result.data)

   
  }

} 
callcart();
},[])
const deleted=async(ids)=>{

const res=await fetch("http://localhost:8000/deleteCart",{
  method:"POST",
  headers:{
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
  },
  body: JSON.stringify({id:ids,user_id:id})
})
const result=await res.json()
if(result.data){

  setproduct(result.data)
}
else{

}


}
const buyproduct=async(id)=>{
navigate("/Adreass")






}




  return (
    <>
      <Nav2 />

      <div
        className="w-100"
        style={{
         
          backgroundColor: "rgb(68, 10, 10)",
          paddingTop: "103px",
          paddingBottom:"80px",
        }}
      >
        <div className="container">
          <div className="row">
            {
              product.map((item,index)=>(
             
                <div className="col-6"    key={index}>
                <div
                  className="cart-div animate__animated animate__fadeInLeft"
                  style={{
                    backgroundColor: "white",
  
                    borderRadius: "5px",
                    border: "none",
                    outline: "none",
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                    // justifyContent:'space-evenly',
                  }}
                >
                  <div className="cart-image d-flex justify-content-start">
                    <div
                      style={{
                        backgroundImage: `url(http://127.0.0.1:8000/${item.image})`,
  
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "200px",
                        width: "200px",
                        height: "50vh",
                        width: "303px",
                        padding: "10px",
                      }}
                    ></div>
                  </div>
                  <div
                    className="heading-cart"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      marginBottom: "5px",
                    }}
                  >
                    <div
                      className="d-flex "
                      style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <h5 style={{ color: "black" }}>{item.name}</h5>
                      </div>
                      <div>
                        <h5 className={item.stock_count>0?"text-success":"text-danger"}>
                       
                         {item.stock_count>0?"in stock":"out of stock" }</h5>
                      </div>
                    </div>
  
                    <div
                      className=" d-flex justify-content-center"
                      style={{
                        alignItems: "flex-start",
                        flexDirection: "row",
                        gap: "30px",
                      }}
                    >
                      <div>
                        <h6 className="text-dark">quantity: <span className="text-danger">{item.quantity}</span></h6>
                      </div>
                      <div
                        className="d-flex justify-content-center align-items-center "
                        style={{ color: "#93C5FD", cursor: "pointer" }}
                      >
                        <h6 className="" onClick={()=>deleted(item.id)}>delete</h6>
                      </div>
                      <div
                        className="d-flex justify-content-center align-items-center "
                        style={{ color: "#93C5FD", cursor: "pointer" }}
                      >
                        <h6 className="">save</h6>
                      </div>
                      <div
                        className="d-flex justify-content-center align-items-center "
                        style={{ color: "#93C5FD", cursor: "pointer" }}
                      >
                        <h6 className="">see more</h6>
                      </div>
                    </div>
                    <div
                      className="text-dark"
                      style={{ color: "black", fontSize: "20px" }}
                    >
                      price :<MdOutlineCurrencyRupee /> <span>{item.totalprice}</span>
                    </div>
                    <div>
                      <button className="button-78" role="button" onClick={()=>buyproduct(item.id)}>
                        {" "}
                        buy it
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              ))
            }
           
       

            <div
              className="bg-white text-dark mt-4  animate__animated animate__fadeInRight"
              style={{
                height: "70px",
                border: "none",
                outline: "none",
                borderRadius: "10px",
              }}
            >
              <p className="para w-100 " style={{ textAlign: "center" }}>
                The price and availability of items at cart.in are subject to
                change. The shopping cart is a temporary place to store a list
                of your items and reflects each item's most recent price. Do you
                have a promotional code? We'll ask you to enter your claim code
                when it's time to pay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
