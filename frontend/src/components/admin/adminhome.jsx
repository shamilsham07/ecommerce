import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./admin.css";
import csrftoken from "../../csrf";
import 'animate.css';
export default function Adminhome() {
const [value,setvalue]=useState('')
const[order,setorder]=useState('')
const count=async()=>{
 const res=await fetch("http://localhost:8000/count",{
  method:"POST",
  headers:{
    'Content-Type': 'application/json',
    'X-CSRFToken': csrftoken,
  },
 })
 const result=await res.json()
 if (result.message){
 setvalue(result.message);
 }
else if(result.error){
   console.log(result.error)
 }
 else{
  console.log("error")
 }
}

count()



useEffect(()=>{
 const orderCount=async()=>{
   const res=await fetch("http://localhost:8000/orderCount",{
    method:"POST",
    headers:{
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
   })
   const result=await res.json()
   if(result.data){
    setorder(result.data)

   }
   if(result.error){
   }
  }
  orderCount()
  },[])



  return (
    <div className="animate__animated  animate__zoomIn">
    
      
          <div className="admin-home">
            <div className="admin-home-heading">
              <h4> my dashbord</h4>
            </div>
            <hr className="hrline" />
            <div>
              <div className="row">
                <div className="col col-4"style={{borderRadius:"20px",backgroundColor:" rgb(68, 10, 10)",color:"white"}}>
                  <Card border="dark animate__slideInDown " style={{borderRadius:"20px",backgroundColor:" rgb(68, 10, 10)",color:"white"}}>
                  <Card.Header className="animate__animated  animate__zoomIn" style={{textTransform:"capitalize",fontSize:"30px",fontWeight:"700"}}>total products</Card.Header> 
                  <Card.Body>
                      <Card.Title className="animate__animated  animate__zoomIn" style={{fontSize:"30px",fontWeight:"900"}}>{value}</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </div>

                {/* for ordersss */}


                <div className="col col-4 ms-2"style={{borderRadius:"20px",backgroundColor:" rgb(68, 10, 10)",color:"white"}}>
                <Card border="dark animate__slideInDown " style={{borderRadius:"20px",backgroundColor:" rgb(68, 10, 10)",color:"white"}}>
                  
                  <Card.Header className="animate__animated  animate__zoomIn" style={{textTransform:"capitalize",fontSize:"30px",fontWeight:"700"}}>orders</Card.Header> 
                   
                    <Card.Body>
                    <Card.Title className="animate__animated  animate__zoomIn" style={{fontSize:"30px",fontWeight:"900"}}>{order}</Card.Title>
                     
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col col-3">
                  <Card border="dark">
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                      <Card.Title>Dark Card Title</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col col-3">
                  <Card border="dark">
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                      <Card.Title>Dark Card Title</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              <div className="row">
                <div className="col  col-6 mt-5 d-flex justify-content-center align-items-center ">
                  <Card border="dark">
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                      <Card.Title>Dark Card Title</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col  col-6 mt-5">
                  <Card border="dark">
                    <Card.Header>Header</Card.Header>
                    <Card.Body>
                      <Card.Title>Dark Card Title</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
   
  );
}
