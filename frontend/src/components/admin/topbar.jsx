import React from 'react'
import "../../assets/LOGO-2.png"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setsidebar } from '../redux/reducer';
import logo from "../../assets/LOGO-2.png"

export default function Topbar() {
    const dispatch=useDispatch()
     const close = () => {
        document.getElementsByClassName("bi-list-task")[0].classList.toggle("bi-x");
        const geted = document.getElementsByClassName("bi-x")[0];
        if (!geted) {
          dispatch(setsidebar(false));
        } else {
          try {
            dispatch(setsidebar(true));
          } catch (error) {
            console.log(error);
          }
        }
      };
  return (
  <div className="top-bar d-flex justify-content-between align-items-center d-lg-none mx-1">
        <div>
          <img src={logo} alt="" className="logo-top" />
        </div>
        <div>
          <i class="bi bi-list-task task-icon " onClick={() => close()}></i>
        </div>
      </div>
  )
}

