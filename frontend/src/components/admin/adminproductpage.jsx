import React, { useEffect, useState } from "react";
import MainSidebar from "./sidebar";
import "./admin.css";
import Adminhome from "./adminhome";
import Cookies from 'universal-cookie';
const cookie=new Cookies()

export default function Adminproductpage() {



  return (
    <div className="dashbord-home">
      <div className="row">
        <div className="col col-2">
          <MainSidebar />
        </div>
        <div className="col col-10">
          <Adminhome/>
          </div>
      </div>
      <div>
  
      </div>
    </div>
  );
}
