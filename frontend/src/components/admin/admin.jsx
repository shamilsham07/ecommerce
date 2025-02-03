import React, { useState } from 'react'
import './admin.css'

import { useCookies } from 'react-cookie';
import Button from 'react-bootstrap/Button';
import csrftoken  from"../../csrf.js";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authenticate } from '../redux/reducer.jsx';
import Loading from '../loading/loading.jsx';
import {loading} from "../redux/reducers.jsx"
import Cookies from 'universal-cookie';

export default function Admin() {
  const cookies = new Cookies();
  const[username,setUsername]= useState("");
  const[password,setPassword]= useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch(); 
  // const[cookies,setCookies]=useState(['user'])
  const value=useSelector((state)=>state.cn.setLoading)
const handle=async(event)=>{
  // setCookies('user',"username",{path:"/admin" ,maxAge:4000})

  event.preventDefault(); 
const res=await fetch("http://localhost:8000/admin",{
  method:"POST",
  headers:{
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({username,password}),
   
})
dispatch(loading(true))
{ setTimeout(()=>{
 dispatch(loading(false))
},3000) }

const result=await res.json()
if(result.message){
  console.log(authenticate)
  cookies.set('username',username,{maxAge:4000});
  console.log('username',username)
  cookies.set('userKey',result.key,);
  console.log("cookie",cookies)
 dispatch(authenticate());
 navigate("/adminproductpage")
}

if(result.error){
alert("wrong")
}



}



  return (
    <>
    {
      value ? <Loading/> : <div className='admin'>
      <div className='admin-page'>
            <div >
            <div className='admin-logo'><img src="/logo.jpg" alt="" /></div>
            <div className='admin-heading'><h3>welcome back</h3></div>
            </div>
            <div className='admin-form'>
            <form action="" method='POST'>
              <div className='admin-user'>
              <label htmlFor="">username</label>
              <input type="text" placeholder='enter the username'className='form-control input-lg' onChange={(event)=>setUsername(event.target.value)}/>
              </div>
              <div className='admin-pass'>
                <label htmlFor="">password</label>
                <input type="password" placeholder='enter the password' className='form-control input-lg ' onChange={(event)=>setPassword(event.target.value)}/>
              </div>
            <div className='adminButton'>
            <Button variant="dark" onClick={handle}>login</Button>
            </div>
             
              
              </form> 
  
  
      </div>
      </div>
      </div>   
      }
    
    
    </>
     
      
  
  )
}
