import React from "react";
import csrftoken from "../csrf";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Sidebar } from 'primereact/sidebar';
import { useState } from "react";
import { useSelector } from "react-redux";

import { AiOutlineShoppingCart } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { increments } from "./redux/reducer";

import { value } from "./redux/reducer";
import Nav2 from "./nav2";

import 'animate.css';
import 'primeicons/primeicons.css';
import "./home.css"

export default function Productpage() {
  const [visibleRight, setVisibleRight] = useState(false);
  const datas = useSelector((state) => state.products.setdata);

  const[products,setproduct]=useState('')
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.auth.userdata);
  const userid=userdetails.id


  const clickHandler =async(id) => {
    const selected=datas.find((item)=>item.id==id)
    setproduct(selected)
    dispatch(increments());
    dispatch(value());
    const res=await fetch("http://localhost:8000/cart", {
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body:JSON.stringify({id:id,userid:userid})

    })
    const result =await res.json()
    if(result.message){
   
      setVisibleRight(true)
    }
  };

  return (
    <>
      <Nav2 />
      <div className="row mt-4 mx-3 animate__animated animate__zoomIn" >
        {datas.map((item, index) => (
          <div className="col col-md-3 mt-5" key={index}>
           
            <Card style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                style={{ height: "200px", objectFit: "contain" }}
                src={`http://127.0.0.1:8000/media/${item.image}`}
                alt="shvf"
              />
              <Card.Body>
                <Card.Title className="text-danger">{item.name}</Card.Title>
                <div className="d-flex text-align-center align-items-center">
                  <div className="w-100">
                    <h6>
                    <span className="pi pi-dollar text-dark"></span><span className=" text-danger">{item.price}</span>
                     
                    </h6>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="col-10"
                  
                  style={{
                    
            marginLeft: "auto",
    marginRight:"auto",
                  }}
      >
                 
                   
              
                      <Button
                        variant="primary"
                        onClick={()=>clickHandler(item.id)}
                        className="w-100"
                      >
                        <AiOutlineShoppingCart />{" "}
                        <span className="ms-2">Add to Cart</span>
                      </Button>


                  </div>
              
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
    <h2 className="text-dark text-center"
    style={{
      textTransform:"capitalize",
      fontSize:"30px",
      fontWeight:'600',
    }} 
    >your product</h2>
    <hr />
    <div className=""style=
    {{
      width: '100%',
      height: '479px',
      border: '3px solid black',
      background:'white',
      borderRadius: '8px',
      outline: 'none',
    }}>
    <div className="text-center">
    <img src={`http://127.0.0.1:8000/media/${products.image}`} alt="kkkk" style={{width:'234px'}} />
    </div>
    <section className="text-center">
      <h5 className="text-dark">Name:<span className="text-danger " style={{textTransform:"capitalize"}}>{products.name}</span> </h5>
      <h5 className="text-dark">price:     <span className="pi pi-dollar text-dark"></span> <span className="text-danger">{products.price}</span></h5>


    </section>
    <hr />
    <h5 className="text-center" style={{
      color:"#008000",

    }}>product succesfully added</h5>
    <div className="text-center">
    <i className="pi pi-check " style={{ color: 'green',fontSize:"45px" }}></i>

    </div>
    </div>
    
   
</Sidebar>
    </>
  );
}
