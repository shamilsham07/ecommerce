import React, { useState } from "react";
import "./products.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import 'animate.css';
import Nav from "./nav";
import { useDispatch } from "react-redux";
import { data } from "../components/redux/productsreducer";
import csrftoken from "../csrf";
import { useSelector } from "react-redux";
export default function Products() {

  const navigation=useNavigate();
  const dispatch=useDispatch()
  const[datas,setdata]=useState('')
  const[value,setValue]=useState("");

  const handleviewProduct=async (product) =>{
 

    const res=await fetch("http://localhost:8000/productsget",{
           method:"POST",
           headers:{
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
           },
           body: JSON.stringify({product})
    })
   const result=await res.json()
   if(result.products){
    console.log("set ann")
    dispatch(data(result.products))
    navigation("/productpage")
   }
   if(result.error){
    console.log("wrong")
   }
  
  }
  
  
  return (
    <>
    <Nav/>
      <div className="products animate__animated animate__fadeInDown">
      <div className="productPhone d-flex">
        <div>
          <div className="productphoneHeading">
            <h1>samsung</h1>
          </div>
          <p>

            Samsung phones are known for their innovative technology, offering
            high-quality displays, powerful processors, and advanced camera
            systems. They cater to a wide range of users with models like the
            flagship Galaxy S series and budget-friendly Galaxy A series
          </p>
          <button type="button" className="btn btn-outline-dark" onClick={()=>handleviewProduct("samsung")}>view products</button>

        </div>
        <div>
          <img src="/3013571.jpg" className="productphoneimg" alt="" />
        </div>
      </div>
      <div className="product2phone d-flex">
        <div>
          <img src="/Responsive 6-01.jpg" className="product2phoneimg" alt="" />
        </div>
        <div className="productphoneHeading">
          <h1>laptops</h1>
          <p>
            {" "}
            Laptops are portable computing devices that combine the
            functionality of a desktop with mobility, making them ideal for
            work, study, and entertainment on the go. They come in various
            configurations to suit different needs, from lightweight ultrabooks
            for everyday use to powerful gaming laptops with high-performance
            hardware.
          </p>
          <button type="button" className="btn btn-outline-dark"onClick={()=>handleviewProduct("laptop")}>view products</button>
         
        </div>
      </div>
      <div className="product3Phone d-flex">
        <div>
          <div className="productphoneHeading">
            
            <h1>iphones</h1></div>
          <p>
            iPhones are premium smartphones developed by Apple, known for their
            sleek design, intuitive iOS interface, and seamless integration with
            the Apple ecosystem. They offer advanced features like powerful
            processors, high-quality cameras, and regular software updates,
            making them a popular choice globally.
          </p>
          <button type="button" className="btn btn-outline-dark"onClick={()=>handleviewProduct("iphone")}>view products</button>
        </div>
        <div>
          <img
            src="/arabic-phones-14-pro-screen-left-side.jpg"
            className="productphoneimg"
            alt=""
          />
        </div>
      </div>
    </div>
    
    
    </>
  
  );
}
