import React, { useEffect, useState } from "react";

import "./home.css";
import Nav2 from "./nav2";

import { FcLike } from "react-icons/fc";
import { MdArrowOutward } from "react-icons/md";
import firstimage from "../assets/41jOEM5KONL._SX569_.jpg";

import { useRef } from "react";
import { Toast } from "primereact/toast";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import laptop from "../assets/main.png";
import csrftoken from "../csrf";
import likes from "../assets/heart.png";
import redLike from "../assets/heart (1).png";
import imageof from "../assets/MYJG3-removebg-preview.png";

import { useSelector } from "react-redux";

import image1 from "../assets/iphone-magsafe-header-accessories-06-202409-removebg-preview.png";
import iphone1 from "../assets/71bErtQPC3L._SX522_.jpg";
import iphone2 from "../assets/folable_iPhone.jpg";

import Footer from "./footer";

import { useNavigate } from "react-router-dom";
import Wishlist from "../whistlist/wishlist";
import { IoMdLogIn } from "react-icons/io";
import { use } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [product, setproduct] = useState([]);
  const [image, setimage] = useState(likes);
  const [thevalue, setvalue] = useState("");
  const [wishlist, setwishlist] = useState([]);
  const userdetails = useSelector((state) => state.auth.userdata);
  const userid = userdetails.id;
  const userauth = useSelector((state) => state.auth.userauthentication);
  const [categorys, setcategorys] = useState([]);
  const imagearray = [firstimage, iphone2, image1];
  const [index, setindex] = useState(0);
  const [selectvalue, setselectvalue] = useState("");

  const Transfer = (item) => {
   

    if (item === "samsung") {
      console.log("good");
      navigate("/SamsungProducts");
    }
    if(item==="iphone"){
      navigate("/Appleproducts")
    }
    if(item==="laptop"){
      navigate("/LaptopProducts")
    }
  };

  const gettheallcategory = async () => {
    const result = await fetch("http://localhost:8000/gettheallcategory", {
      method: "GET",
    });
    const res = await result.json();
    if (res.data) {
      console.log(res.data);
      setcategorys(res.data);
    }
  };

  useEffect(() => {
    const cleartime = setInterval(() => {
      setindex((prevarray) => (prevarray + 1) % imagearray.length);
    }, 3000);
    return () => clearInterval(cleartime);
  }, [imagearray.length]);
  const previndex = (index - 1 + imagearray.length) % imagearray.length;
  const nextindex = (index + 1) % imagearray.length;
  const getwishlistproductsfor = async () => {
    try {
      const result = await fetch(
        "http://localhost:8000/getwishlistproductsfor",
        {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: userid }),
        }
      );

      const res = await result.json();
      if (res.data) {
        setwishlist(res.data);
        console.log("her your product", res.data);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const whistlist = (id) => {
    navigate(`/Whistlist/${id}`);
  };

  const addtowishlist = async (id) => {
    console.log(id);
    console.log(userid);
    if (userid && id) {
      const res = await fetch("http://localhost:8000/addtowishList", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: userid, id: id }),
      });
      const result = await res.json();
      if (result.message) {
        console.log("good");
        setwishlist((prevWishlist) => [...prevWishlist, { product_id: id }]);
      } else {
        console.log("bad");
      }
    } else {
      alert("please login");
      navigate("/userlogin");
    }
  };
  const deletefromwhistlist = async (id) => {
    const results = await fetch("http://localhost:8000/deleteWishList", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: userid, id: id }),
    });
    const res = await results.json();
    if (res.message) {
      console.log("good");
      setwishlist((prevWishlist) =>
        prevWishlist.filter((product) => product.product_id !== id)
      );
      console.log("mmmmmmm");
      console.log(wishlist);
    }
  };

  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "Product added",
      life: 3000,
      className: "here-product-added",
    });
  };

  const toast = useRef(null);
  const show = () => {
    toast.current.show({
      severity: "error",
      detail: "please login",
      className: "something-went-wrong",
    });
  };

  const explore = () => {
    navigate("/products");
  };

  const viewAplleProducts = async () => {
    navigate("/Appleproducts");
  };

  const get4products = async () => {
    const res = await fetch("http://localhost:8000/get4products", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
      },
    });
    const result = await res.json();

    if (result.data) {
      setproduct(result.data);
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

  useEffect(() => {
    get4products();
    getwishlistproductsfor();
    gettheallcategory();
  }, [userid]);

  // $(document).on('scroll',)

  return (
    <>
      <div>
        <Nav2 className="nav2" />
        {/* <div className="card flex justify-content-center">
        <ToastContainer />
              </div> */}

        <div className="card flex justify-content-center">
          <Toast ref={toast} />
        </div>

        <section className="first-page w-100  ">
          <div className="container">
            <div className="d-padding">
              <div className="row  align-items-center">
                <div className="col-6 ">
                  <div className="first-page-heading d-flex justify-content-center align-items-center w-100">
                    <div>
                      <h1 className="mb-2 text-start">
                        discover what <br />
                        <span className="shopping"> phonecart </span>
                        do for your
                        <br />
                        <span className="shopping animate__animated animate__fadeIn animate__infinite	infinite animate__slow	3s">
                          shopping
                        </span>
                      </h1>
                      <p className="text-start m-0 p-0">
                        Give your business a boost with Elexy, a reliable
                        solution you can trust. We've got fast and dedicated
                        support that will enable you to focus on what matters
                        most. Let us take care of the rest.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-6 p-3">
                  {/* <div>
            <img src={left} alt="" />
          </div> */}
                  <div className="first-page-right">
                    <img src={laptop} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-100 home-second-page">
          <div className="container">
            <div className="d-padding">
              <div className="">
                <h1 className="shop-top-products">Shop Top Products </h1>
              </div>
              <div>
                <h5 className="sub-top-products">
                  Shop Now for Convenient Delivery And Discover
                </h5>
              </div>
              <div className="row">
                {product.length > 0 ? (
                  product.map((product, index) => {
                    const theitem = Object.values(wishlist).find(
                      (item) => item.product_id === product.id
                    );
                    return (
                      <div className="col-lg-3 mt-4" key={index}>
                        <div className="card-best-products">
                          <div className="text-end">
                            {theitem ? (
                              <div>
                                {" "}
                                <img
                                  src={redLike}
                                  alt=""
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                  }}
                                  onClick={() =>
                                    deletefromwhistlist(product.id)
                                  }
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  onClick={() =>
                                    addtowishlist(product.id, index)
                                  }
                                  src={image}
                                  data={index}
                                  alt=""
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="card-best-products-heading text-dark">
                              {product.name}
                            </h4>
                          </div>
                          <div className="card-img-div">
                            <img
                              src={`http://127.0.0.1:8000/${product.image}`}
                              alt=""
                              className="card-best-products-img"
                              onClick={() => whistlist(product.id)}
                            />
                          </div>
                          <div>
                            <h6 className="card-best-products-heading text-danger mt-2">
                              ${product.price}
                            </h6>
                          </div>
                          <div className="d-flex justify-content-around">
                            <button
                              className="add-to-btn"
                              onClick={() => notify(product.id)}
                            >
                              {" "}
                              <span>add to cart</span>
                              <span>
                                <MdArrowOutward />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>no data</div>
                )}
              </div>

              {/* <ToastContainer />
              <div className="card flex justify-content-center">
                <Toast ref={toast} />
              </div> */}
            </div>
          </div>
        </section>

        <section className="third-page">
          <div className="container">
            <div className="d-padding">
              <div>
                <div className="row w-100 justify-content-center align-items-center">
                  <div className="col-6">
                    <div>
                      <h1 className="third-page-heading text-white">
                        Discover Innovation <br />
                        with Apple
                      </h1>
                    </div>
                    <div className="apple-img-div">
                      <img src={image1} alt="" className="apple-img " />
                    </div>
                    <div className="d-flex justify-content-center">
                      <p className="disc-third-page text-white">
                        IOS products are sleek, high-performance devices
                        designed by Apple, known for their intuitive user
                        interface
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <button
                        className="third-view-btn"
                        onClick={viewAplleProducts}
                      >
                        {" "}
                        <span>view more</span>
                        <span>
                          <MdArrowOutward />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="col-6 mt-5">
                    <div className="row">
                      <div className="col-5 third-card-section p-5">
                        <div className="third-page-card1">
                          <div className="third-card-heading">
                            <h3>Apple</h3>
                          </div>

                          <hr />

                          <div className="text-start">
                            <p className="third-card-desc w-75">
                              iOS is Apple's fast, secure, and user-friendly
                              mobile operating system
                            </p>
                          </div>
                          <div className="third-card-img">
                            <img src={iphone1} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-5 third-card-section2 p-5">
                        <div className="third-card-heading ">
                          <h3>Iphone 16</h3>
                        </div>

                        <hr />
                        <div className="text-start">
                          <p className="third-card-desc w-75">
                            The latest iPhone 16 features a stunning OLED
                            display, powerful A18 chip, 48MP camera.
                          </p>
                        </div>
                        <div className="third-card-img2">
                          <img src={iphone2} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="d-padding">
              <div className="select-category text-start">
                <h3>select category</h3>
              </div>
              <div className="row m-0 p-0 justify-content-center align-items-center">
                {categorys.map((item, index) => (
                  <div className="col-3 mt-5 ml-5 " key={index}>
                    <div
                      className="select-category-sec  position-relative"
                      onClick={ ()=> {
                       Transfer(item.categoryName);
                      }}
                    >
                      <img
                        src={`http://localhost:8000//media/${item.image}`}
                        alt="kk"
                      />
                      <div className="text-center mt-3">
                        <h2 className="laptop-home3-heading">
                          {item.categoryName}
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
