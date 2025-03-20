import React, { useEffect, useState } from "react";
import Nav2 from "../nav2";
import "./apple.css";

import { Toast } from 'primereact/toast';
import Footer from "../footer"
import { useRef } from 'react';
import Whistlist from "../../whistlist/whistlist";
import { useNavigate } from "react-router-dom";
        
import Loading from "../loading/loading";
import csrftoken from "../../csrf";
import { MdArrowOutward } from "react-icons/md";


import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
export default function LaptopProducts() {
  const navigation=useNavigate("")
  const [product, setproduct] = useState([]);
  const userdetails = useSelector((state) => state.auth.userdata);
  const userid=userdetails.id
  const toast = useRef(null);
  const show = () => {
    toast.current.show({ severity: 'error', detail: 'please login' ,className:"something-went-wrong"});
};


const whistlist=(id)=>{
  navigation(`/Whistlist/${id}`)
  
  }


  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "Product Added",
      life: 3000,
      className: "here-product-added",
    });
  };


  const notify = async (id) => {
    if (userid) {
      const res = await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },

        body: JSON.stringify({ id: id, userid: userid }),
      });

      const result = await res.json();

      if (result.message) {
        showSuccess();
      } else {
      }
    } else {
      show();
    }

   
  };

  const viewAplleProducts = async () => {
    try {
      const res = await fetch("http://localhost:8000/LaptopProducts", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      });
      const result = await res.json();
      if (result.data) {
        setproduct(result.data);
      } else {
        console.log("eeeeeeeeeee");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    viewAplleProducts();
  }, []);

  return (
    <>
      <Nav2 />
      <div className="">
        <div className="container">
          <div className="d-padding">
          <div className="card flex justify-content-center">
        <Toast ref={toast} />

            <div className="w-100 d-flex justify-content-center align-items-center ">
              <div className="left-line"></div>
              <div>
                <h3 className="apple-products-heading">products</h3>
              </div>
              <div className="right-line"></div>
            </div>

            <div className="row justify-content-center">
              {product.length > 0 ? (
                product.map((item, index) => (
                  <div className="col-3 main-apple mt-4 ms-5" key={index}>
                    <div className="card-apple  w-100">
                      <div className="sub-card-apple">
                        <img src={`http://127.0.0.1:8000/${item.image}`} 
                        onClick={()=>whistlist(item.id)}
                        />
                      </div>
                    </div>
                    <div>
                      <h5 className="aplle-name text-dark mt-1">{item.name}</h5>
                    </div>
                    <div>
                      <h6 className="text-dark">$ {item.price}</h6>
                    </div>

                    <div className="bottom-add-to-btn d-flex justify-content-center">
                      <button
                        className="add-to-btn"
                        onClick={() => notify(item.id)}
                      >
                        {" "}
                        <span>add to cart</span>
                        <span>
                          <MdArrowOutward />
                        </span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <Loading />
                </div>
              )}
            </div>
            </div>

          </div>
        </div>

      </div>


      <Footer/>
    </>
  );
}