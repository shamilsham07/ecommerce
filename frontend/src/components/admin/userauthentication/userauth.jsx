import React from "react";
import MainSidebar from "../sidebar";
import "./userauth.css";

import { useState, useEffect } from "react";

export default function Userauthuenticationpage() {
  const [userdetails, setuserdetails] = useState([]);
  const sortedusers=[...userdetails].sort((item,item1)=>item1.order_count-item.order_count)
  const getuserauthpage = async () => {
    const result = await fetch("http://localhost:8000/getuserauthpage", {
      method: "GET",
    });
    const res = await result.json();
    if (res.data) {
      setuserdetails(res.data);
    }
  };
  useEffect(()=>{
    getuserauthpage()
  },[])
  return (
    <>
      <div className="row w-100 m-0 p-0">
        <div className="col-2">
          <MainSidebar />
        </div>
        <div className="col-10 ">
          <div className="container">
            <div className="p-5">
              <div className="w-100 d-flex justify-content-between align-items-center main-userauth-cont">
                <div className="text-start ml-5 ">
                  <i
                    class="bi bi-arrow-left-circle"
                    style={{ fontSize: "20px", cursor: "pointer" }}
                    //   onClick={() => navigate("/adminproductpage")}
                  ></i>
                  <i
                    class="bi bi-arrow-right-circle text-dark ml-1"
                    style={{ fontSize: "20px" }}
                  ></i>
                </div>
                <div className="mx-5">
                  <h3 className="user-managment-heading">user managment</h3>
                </div>
              </div>

              <div className="mt-5">
                <table class="table">
                  <thead className="headings-f-table">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">PhoneNumber</th>
                      <th scope="col">Email</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Approve</th>
                    </tr>
                  </thead>
                  {
                  sortedusers.map((item,index)=>(
                       <tbody key={item}>
                       <tr>
                         <th scope="row" style={{ verticalAlign: "middle" }}>
                           {index+1}
                         </th>
                         <td style={{ verticalAlign: "middle", color: "black" }}>
                           {item.name}
                         </td>
                         <td style={{ verticalAlign: "middle", color: "black" }}>
                           {item.phonenumber}
                         </td>
                         <td style={{ verticalAlign: "middle", color: "black" }}>
                           {item.email}
                         </td>
                         <td style={{ verticalAlign: "middle", color: "black" }}>
                  {item.order_count}
                         </td>
                         <td style={{ verticalAlign: "middle", color: "black" }}>
                  {item.order_totalprice}
                       
                         </td>
                         <td>
                           <button className="block-user-btn">
                             <i class="bi bi-ban text-white"></i>Block
                           </button>
                           <button className="ml-1 delete-user-btn">
                             Delete
                           </button>
                         </td>
                       </tr>
                     </tbody>

                  ))
                 
                  }
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
