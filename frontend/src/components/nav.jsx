import React from 'react'
import { MdLocalGroceryStore } from "react-icons/md";
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setcart } from './redux/productsreducer';
import { useState } from 'react';
import csrftoken from '../csrf';
import 'animate.css';
import { useNavigate } from 'react-router-dom';


export default function Nav() {

  const navigate=useNavigate();
  const dispatch=useDispatch()
 const clicked=async()=>{
   const res =await fetch("http://localhost:8000/getproduct",{
          method:"POST",
          headers:{
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken,
          },
      })
  
     const result=await res.json()
     if(result.data){
     
      dispatch(setcart(result.data))
      navigate("/Cartpage")
  
     } 
     else if(result.nothing){
      console.log("nothing")
      navigate("/Cartpage")
     }
     else{
      console.log("went wrong here")
      navigate("/Cartpage")
     }


 }




// const data=useSelector((state)=>state.auth.increment)        currently not need 

  return (


    <>

<nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary fixed-top">

  <div className="container">

    <button
      data-mdb-collapse-init
      className="navbar-toggler"
      type="button"
      data-mdb-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>


    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     
      <a className="navbar-brand mt-2 mt-lg-0  animate__animated animate__fadeInLeftBig" href="#">
        <img
          src="3901287.jpg"
          height="20"
          alt="MDB Logo"
          loading="lazy"
        />
      </a>
 
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 animate__animated animate__fadeInLeftBig ">
        <li className="nav-item">
          <a className="nav-link text-dark" href="/">home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark" href="#" >about</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-dark" href="#">services</a>
        </li>
      </ul>
   
    </div>
  
   <div className='storeicons'>
  
    <div>
    <MdLocalGroceryStore className='storeicon animate__animated animate__fadeInRightBig' onClick={clicked} style={{ fontSize: "2rem" ,cursor:"pointer"}} />
    </div>
   
   </div>


  </div>

</nav>


    
    
    </>
   
  )
}
