import React, { useEffect, useState } from "react";
import Nav2 from "./nav2";
import Footer from "./footer";
import csrftoken from "../csrf";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { BsCurrencyRupee } from "react-icons/bs";
import { ToastContainer, toast as notifytoast } from "react-toastify";
import { Bounce } from "react-toastify";
import Loading from "./loading/loading";
import { useRef } from "react";
import videos from "../assets/xlarge_2x (1).mp4";
import { Toast } from "primereact/toast";
import "react-toastify/dist/ReactToastify.css";
import video from "../assets/xlarge_2x.mp4";

import sideimage from "../assets/world_mac_iphone__mr1xfuchl56e_xlarge_2x-removebg-preview.png";


import image from "../assets/HOME_P3_Main-KV_1440x640_pc_LTR-removebg-preview.png";
import image3 from "../assets/pc_01_camera_cxp_01_portrait.jpg";
import image4 from "../assets/left.png";
export default function Products() {
  const [appleproduct, setappleproduct] = useState([]);
  const [product, setproduct] = useState([]);
  const [laptop,setlaptop]=useState([])
  const navigation = useNavigate("");

  const userdetails = useSelector((state) => state.auth.userdata);
  const userid = userdetails.id;
  const toast = useRef(null);
  const show = () => {
    toast.current.show({
      severity: "error",
      detail: "please login",
      className: "something-went-wrong",
    });
  };



const get4laptops=async()=>{
  const result = await fetch("http://localhost:8000/get4laptops", {
    method: "POST",
    headers: {
      "X-CSRFToken": csrftoken,
    },
  });
const res=await result.json()
if(res.data){
  setlaptop(res.data)
}
else{

}



}





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
        notifytoast("Product added successfully", {
          position: "top-right",
        
          autoClose: 1000,
          hideProgressBar: false,
          newestOnTop: false,
          closeOnClick: true,
          rtl: false,
          pauseOnFocusLoss: true,
          draggable: true,
          pauseOnHover: true,
          theme: "Success",
          transition: Bounce,
          className: "toast-custom",
        });
      } else {
        console.log("wrong");
      }
    } else {
      show();
    }
  };

  const get4appleproducts = async () => {
    const result = await fetch("http://localhost:8000/get4appleproducts", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
      },
    });
    const res = await result.json();

    if (res.data) {
      setappleproduct(res.data);
    } else {
  
    }
  };

  const navigatesamsung = () => {
    navigation("/SamsungProducts");
  };
 const navigatelaptop=()=>{
  navigation("/LaptopProducts")
 }
 const navigateiphone=()=>{
  navigation("/Appleproducts")

 }



  const getSamsungProducts = async () => {
    const result = await fetch("http://localhost:8000/get4samsungproduct", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
      },
    });
    const res = await result.json();
    if (res.data) {
      setproduct(res.data);
  
    } else {
    
    }
  };

  useEffect(() => {
    getSamsungProducts();
    get4appleproducts();
    get4laptops()
  }, []);

  return (
    <div>
      <Nav2 />
      <section
        className="image-product-left-first"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="d-padding">
          <div className="row" style={{ height: "80vh" }}>
            <div className="col-12">
              <div className="first-product-section-left">
                <div className="w-100">
                  <h3 className="image-product-left-first-heading">
                    all screen all yours
                  </h3>
                </div>
                <div className="w-100">
                  <p className="image-product-left-first-subheading">
                    say hello to the future.samsung is available in stores
                  </p>
                </div>
                <div className="samsung-showmore">
                  <button onClick={navigatesamsung}>show more</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="second-samsung-page">
        <div className="container">
          <div className="d-padding">
            <div className="samsung-second-page-heading">
              <h1 className="dark">Epic portraits every single time</h1>
            </div>
            <div className="row">
              <div className="col-6 mt-5">
                <img
                  src={image3}
                  alt=""
                  className="second-samsung-image-portrait"
                />
              </div>
              <div className="col-6">
                <div className="mt-5 second-page-right-heading">
                  <h1 className="text-white text-start ">
                    Capture your best portrait with Object Aware Engine
                  </h1>
                </div>
                <div>
                  <h6
                    className="text-white mt-5 text-start"
                    style={{
                      fontSize: "20px",
                      opacity: "0.9",
                      lineHeight: "25px",
                      fontWeight: "200",
                    }}
                  >
                    Capture more precise skin tone and texture with the newest
                    advancements in our object-aware engine. Now, Galaxy S25
                    Ultra is able to not only detect objects, but light —
                    helping deliver even more natural skin pigmentation.1,3
                  </h6>
                </div>
                <div className="text-end">
                  <img src={image4} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: "#fafafa" }}>
        <div className="container">
          <div className="d-padding">
            <div>
              <div className="you-might ms-5">
                <h2> you might also like</h2>
              </div>
              <hr />
              <div className="row">
                {product.length > 0 ? (
                  product.map((item, index) => (
                    <div className="col-3 main-apple mt-4 ms-5" key={index}>
                      <div className="card-apple  w-100">
                        <div className="sub-card-apple">
                          <img src={`http://127.0.0.1:8000/${item.image}`} />
                        </div>
                      </div>
                      <div>
                        <h5 className="aplle-name text-dark mt-4">
                          {item.name}
                        </h5>
                      </div>
                      <div>
                        <h6 className="text-dark">$ {item.price}</h6>
                      </div>

                      <div className="bottom-add-to-btn d-flex justify-content-center">
                        <button
                          className="add-to-btn"
                          onClick={() => notify(item.id)}
                        >
                          <span>add to cart</span>
                          <span></span>
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
              <div className="mt-5 w-100 samsung-explore-more-btn">
                <button onClick={navigatesamsung}>explore more </button>
              </div>
              <ToastContainer />
              <div className="card flex justify-content-center">
                <Toast ref={toast} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="d-padding">
            <div
              className="d-flex justify-content-between"
              style={{ marginInline: "40px" }}
            >
              <div>
                <h2 className="product-iphone-heading-first">iphone</h2>
              </div>
              <div>
                <h2 className="product-iphone-heading-second">
                  designed to be loved
                </h2>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <video
                  src={video}
                  type="video/mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-100"
                  style={{ borderRadius: "50px" }}
                ></video>
              </div>
            </div>
            <div className="w-100 d-flex justify-content-center mt-3">
              <div className=" plane"></div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div className="d-padding">
            <div className="apple-second-page-heading-first">
              <h1>explore the line-up</h1>
            </div>
            <div className="row">
              {appleproduct.length > 0 ? (
                appleproduct.map((item, index) => (
                  <div className="col-3" key={index}>
                    <div className="apple-card-second-page w-100">
                      <div>
                        <img
                          src={`http://127.0.0.1:8000/${item.image}`}
                          alt=""
                        />
                      </div>
                      <div>
                        <h3>{item.name}</h3>
                      </div>
                      <div className="w-100">
                        <p className="w-100">the ultimate iphone</p>
                      </div>
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ gap: "6px" }}
                      >
                        <span>
                          <BsCurrencyRupee className="BsCurrencyRupee" />
                        </span>
                        <span className="BsCurrencyRupee2"> {item.price}</span>
                      </div>
                      <div className="buy-apple">
                        <button>buy</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <Loading />
                </div>
              )}
            </div>
            <div className="mt-5 w-100 samsung-explore-more-btn">
                <button onClick={navigateiphone}>explore more </button>
              </div>
              <ToastContainer />
              <div className="card flex justify-content-center">
                <Toast ref={toast} />
              </div>
          </div>
        </div>
      </section>

      <section style={{ background: "white" }}>
        <div className="container">
          <div className="d-padding">
            <div className="mac-video">
              <div>
                <h1>Laptops</h1>
              </div>
              <div>
                <h2>
                  if you can dreamit <br /> mac can do it
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <video
                  src={videos}
                  type="video/mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-100"
                  style={{
                    height: "80vh",
                    objectFit: "cover",
                    borderRadius: "30px",
                  }}
                ></video>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "#fafafa" }}>
        <div className="container">
          <div className="d-padding">
            <div className="row">
              <div className="col-6 mt-3">
                <div>
                  <h3 className="about-laptop">about laptop</h3>
                </div>
                <div>
                  <p className="about-laptop-p  mt-3">
                    A laptop is a portable computer that integrates a screen,
                    keyboard, touchpad, and battery into a compact design. It
                    allows users to perform various tasks such as browsing,
                    gaming, programming, and content creation. Laptops come in
                    different sizes and specifications, ranging from lightweight
                    ultrabooks to powerful gaming and workstation models. They
                    offer convenience and flexibility, making them ideal for
                    both personal and professional use.
                  </p>
                </div>
              </div>
              <div className="col-6">
                <div>
                  <img src={sideimage} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

<section className="" style={{background:"black"}}>
  <div className="container">
    <div className="d-padding">
<div className="mac-contac w-100 d-flex justify-content-between" >
  <div>
    <h1>
      Explore The Products
    </h1>
  </div>
  {/* <div>
    <h6>Take a Look</h6>
  </div> */}

</div>

   <div className="row justify-content-center">
              {laptop.length > 0 ? (
                laptop.map((item, index) => (
                  <div className="col-3 main-apple mt-4 ms-5"style={{background:"white"}} key={index}>
                    <div className="card-apple  w-100">
                      <div className="sub-card-apple">
                        <img src={`http://127.0.0.1:8000/${item.image}`} />
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
                          {/* <MdArrowOutward /> */}
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
            <div className="mac-explore-btn mt-5 mx-5">
              <button className="bg-white" onClick={navigatelaptop}>explore</button>
            </div>
            <ToastContainer />
              <div className="card flex justify-content-center">
                <Toast ref={toast} />
              </div>


    </div>
  </div>
</section>




      <Footer />
    </div>
  );
}
