import React, { useEffect, useState } from "react";
import Nav2 from "./nav2";
import Footer from "./footer";
import csrftoken from "../csrf";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./products.css";
import { BsCurrencyRupee } from "react-icons/bs";

import { Toast } from "primereact/toast";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading/loading";
import { useRef } from "react";
import videos from "../assets/xlarge_2x (1).mp4";
import Carousel from 'react-bootstrap/Carousel';

import video from "../assets/xlarge_2x.mp4";

import sideimage from "../assets/world_mac_iphone__mr1xfuchl56e_xlarge_2x-removebg-preview.png";

import image from "../assets/rendering-smart-home-device_23-2151039369.avif";
import image3 from "../assets/pc_01_camera_cxp_01_portrait.jpg";
import secondone from "../assets/laptop-with-glowing-screen-table-dark-top-view-copy-space.jpg"
import thirdone from "../assets/1741573950945262d25c5c0ac4b0a852266db09795850.webp"
import image4 from "../assets/left.png";
import Whistlist from "../whistlist/whistlist";
export default function Products() {

  useEffect(()=>{
    const sr=window.ScrollReveal();
    sr.reveal(".samsung-second-page-heading h1",{
      origin:"top",
      distance:"70px",
      duration:1000,
      reset:true,
    })
    sr.reveal(".second-samsung-image-portrait",{
      origin:"left",
      distance:"70px",
      duration:1000,
      reset:true,
    })
    sr.reveal(".second-page-right-heading h1",{
      origin:"top",
      distance:"70px",
      duration:1000,
      reset:true,
    })
    // sr.reveal(".the-capture",{
    //   origin:"top",
    //   distance:"70px",
    //   duration:1000,
    //   reset:true,
    //   // delay:"3s",
    // })
  })













  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "Product Added",
      life: 3000,
      className: "here-product-added",
    });
  };
  const [appleproduct, setappleproduct] = useState([]);
  const [product, setproduct] = useState([]);
  const [laptop, setlaptop] = useState([]);
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

  const get4laptops = async () => {
    const result = await fetch("http://localhost:8000/get4laptops", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
      },
    });
    const res = await result.json();
    if (res.data) {
      setlaptop(res.data);
    } else {
    }
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
  const navigatelaptop = () => {
    navigation("/LaptopProducts");
  };
  const navigateiphone = () => {
    navigation("/Appleproducts");
  };
  const whistlist = (id) => {
    navigation(`/Whistlist/${id}`);
  };

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
    get4laptops();
  }, []);

  return (
    <div>
      <Nav2 />
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
        <section>
        <Carousel className="setting-height">
  <Carousel.Item>
    <img className="d-block w-100 setting-height img" src={image} alt="First slide" />
  </Carousel.Item>
  <Carousel.Item>
    <img className="d-block w-100 setting-height img" src={secondone} alt="Second slide" />
  </Carousel.Item>
  <Carousel.Item>
    <img className="d-block w-100 setting-height img" src={thirdone} alt="Third slide" />
  </Carousel.Item>
</Carousel>
     
        </section>
        <section className="second-samsung-page mt-5">
          <div className="container">
            <div className="d-padding">
              <div className="samsung-second-page-heading">
                <h1 className="dark">Epic portraits every single time</h1>
              </div>
              <div className="grid">
                <div className="col-12 lg:col-6 mt-5">
                  <img
                    src={image3}
                    alt=""
                    className="second-samsung-image-portrait"
                  />
                </div>
                <div className="col-12 lg:col-6">
                  <div className="mt-5 second-page-right-heading">
                    <h1 className="text-white text-start ">
                      Capture your best portrait with Object Aware Engine
                    </h1>
                  </div>
                  <div>
                    <h6
                      className="text-white mt-5 text-start the-capture"
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
                <div className="grid">
                  {product.length > 0 ? (
                    product.map((item, index) => (
                      <div
                        className="col-6 lg:col-3  mt-4"
                        key={index}
                      >
                        <div className="main-apples">
                        <div className="card-apple  w-100">
                          <div className="sub-card-apple">
                            <img
                              src={`http://127.0.0.1:8000/${item.image}`}
                              onClick={() => whistlist(item.id)}
                            />
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
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="d-padding">
              <div className="iphone-component d-flex justify-content-between w-100">
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
                    className="w-100 iphone-video"
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
              <div className="grid ">
                {appleproduct.length > 0 ? (
                  appleproduct.map((item, index) => (
                    <div className="col-6 lg:col-3 md-col-4" key={index}>
                      <div className="apple-card-second-page w-100">
                        <div>
                          <img
                            src={`http://127.0.0.1:8000/${item.image}`}
                            alt=""
                            onClick={() => whistlist(item.id)}
                          />
                        </div>
                        <div>
                          <h3 className="item-name-products">{item.name}</h3>
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
                          <span className="BsCurrencyRupee2">
                            {" "}
                            {item.price}
                          </span>
                        </div>
                        <div className="buy-apple">
                          <button onClick={() => notify(item.id)}>
                            Add To Cart
                          </button>
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
                    className="w-100 mac-video-display"
                    style={{
                      objectFit: "cover",
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
              <div className="grid">
                <div
                  className="col-12 lg:col-6 order-1 order-lg-0
                 mt-3"
                >
                  <div>
                    <h3 className="about-laptop">about laptop</h3>
                  </div>
                  <div>
                    <p className="about-laptop-p  mt-3">
                      A laptop is a portable computer that integrates a screen,
                      keyboard, touchpad, and battery into a compact design. It
                      allows users to perform various tasks such as browsing,
                      gaming, programming, and content creation. Laptops come in
                      different sizes and specifications, ranging from
                      lightweight ultrabooks to powerful gaming and workstation
                      models. They offer convenience and flexibility, making
                      them ideal for both personal and professional use.
                    </p>
                  </div>
                </div>
                <div className="col-12 lg:col-6 order-0 order-lg-1">
                  <div className="w-100">
                    <img src={sideimage} alt="" className="w-100" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="" style={{ background: "black" }}>
          <div className="container">
            <div className="d-padding">
              <div className="mac-contac w-100 d-flex justify-content-between">
                <div>
                  <h1>Explore The Products</h1>
                </div>
                {/* <div>
    <h6>Take a Look</h6>
  </div> */}
              </div>

              <div className="grid justify-content-center">
                {laptop.length > 0 ? (
                  laptop.map((item, index) => (
                    <div
                      className="col-6 lg:col-3  mt-4 "
                    
                      key={index}
                    >
                      <div className="main-apples ml-1 ">
                        <div className="card-apple  w-100">
                          <div className="sub-card-apple">
                            <img
                              src={`http://127.0.0.1:8000/${item.image}`}
                              onClick={() => whistlist(item.id)}
                            />
                          </div>
                        </div>
                        <div>
                          <h5 className="aplle-name text-dark mt-1">
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
                            {" "}
                            <span>add to cart</span>
                            <span>{/* <MdArrowOutward /> */}</span>
                          </button>
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
              <div className="mac-explore-btn mt-5 mx-5">
                <button className="bg-white" onClick={navigatelaptop}>
                  explore
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
