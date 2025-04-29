import Nav2 from "../components/nav2";
import Footer from "../components/footer";
import image from "../assets/41jOEM5KONL._SX569_.jpg";

import "./whistlist.css";
import { useParams } from "react-router-dom";
import Loading from "../components/loading/loading";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import csrftoken from "../csrf";
import like from "../assets/heart.png";
import redLike from "../assets/heart (1).png";
import { Dialog } from "primereact/dialog";

import image5 from "../assets/accept.png";

export default function Whistlist() {
  const [count, setcount] = useState(0);
  const [starcheck, setstarcheck] = useState(false);
  const [reviewvisble, setreviewvisible] = useState(true);
  const [visible, setVisible] = useState(false);
  const [stock_count, setstock_count] = useState("");
  const [display5, setdisplay5] = useState(true);
  const [value, setvalue] = useState(1);
  const { id } = useParams();
  const [totalstar, settotalstar] = useState(0);
  const [likeimage, setlikeimage] = useState();
  console.log("jjjjjjjjjjjj", id);
  const [images, setimage] = useState(image);
  const userId = useSelector((state) => state.auth.userdata.id);

  const [maximumvalue, setmaximumvalue] = useState();

  const [productDetails, setproductdetails] = useState(null);
  const [productImage, setproductImage] = useState([]);
  const navigate = useNavigate();

  const [star, setstar] = useState(0);

  const getreviewcount = async () => {
    try {
      const res = await fetch("http://localhost:8000/getreviewcount", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, userid: userId }),
      });
      const result = await res.json();
      if (result.data) {
        setcount(result.data);
      } else {
        setcount(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const posts = async () => {
    const result = await fetch("http://localhost:8000/reviewpage", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userid: userId, productid: id, star: star }),
    });
    const res = await result.json();
    if (res.message) {
      console.log("firstzzzzzzzzzzzzzzzzzzzzz");

      getreviewcount();
      totalreviewtstars();
    } else {
      console.log("ssssssssssssssssss");
    }
  };

  const getreviews = async () => {
    const res = await fetch("http://localhost:8000/getreviews", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, productid: id }),
    });
    const result = await res.json();
    if (result.data) {
      setstar(result.data);
    } else {
      setstar(result.star);
    }
  };

  const addtocart = async () => {
    console.log(
      "....................................................................."
    );
    console.log(userId);
    console.log(id);
    console.log(value);

    const res = await fetch("http://localhost:8000/addtocart", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, userid: userId, quantity: value }),
    });
    const result = await res.json();

    if (result.message) {
      console.log("good");
      setVisible(true);
    }
    if (result.stockmax) {
      alert(result.stockmax);
    }
  };
  const addtowhistlist = async () => {
    if (likeimage == redLike) {
      const results = await fetch("http://localhost:8000/deleteWishList", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, userid: userId }),
      });
      const ress = await results.json();
      if (ress.data) {
        console.log("daaaaaaaaaaaaaataaaaaa");
        setlikeimage(like);
      } else {
        console.log("hjijihobhjbhbhj");
      }
    } else {
      const res = await fetch("http://localhost:8000/addtowishList", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ id: id, userid: userId }),
      });
      const result = await res.json();
      if (result.message) {
        console.log("everything look good");
        setlikeimage(redLike);
      } else {
        console.log("wrong");
      }
    }
  };

  const gettheclickedproduct = async () => {
    const res = await fetch("http://localhost:8000/gettheclickedproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ id: userId, productid: id }),
    });
    const result = await res.json();
    if (result.data) {
      console.log("dataaa", result.data);
      setimage(`http://127.0.0.1:8000/${result.data.image}`);

      setproductdetails(result.data);
      setstock_count(result.data.stock_count);
      if (result.image) {
        setproductImage(result.image);
      }
    } else {
      console.log("wrong");
    }
  };

  const increment = () => {
    if (value >= 5) {
      return;
    }
    if (value == stock_count) {
      return;
    } else {
      setvalue((prevValue) => prevValue + 1);
    }
  };
  const decrement = () => {
    if (value < 5) {
      setmaximumvalue(false);
    }
    if (value == 1) {
      return;
    }
    setvalue((prevValue) => prevValue - 1);
  };
  const getwhistlist = async () => {
    console.log("userrrrrrr", userId);

    const result = await fetch("http://localhost:8000/getwhistlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ id: userId, productid: id }),
    });
    const res = await result.json();
    if (res.message) {
      console.log("hi everey");
      setlikeimage(redLike);
    } else {
      console.log("wrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
      setlikeimage(like);
    }
  };

  const totalreviewtstars = async () => {
    try {
      const res = await fetch("http://localhost:8000/totalreviewtstars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ id: id }),
      });
      const result = await res.json();
      if (result.data) {
        console.log("first");
        settotalstar(result.data);
      } else {
        console.log("error");
      }
    } catch (result) {}
  };

  useEffect(() => {
    getreviews();
    getwhistlist();
    getreviewcount();
    totalreviewtstars();

    if (stock_count > 5) {
      setdisplay5(false);
    }
    if (value == 5) {
      setmaximumvalue(true);
    }
    if (value < 5) {
      setmaximumvalue(false);
    }
    if (!id) {
      navigate("/");
    } else {
      console.log("hi");
      gettheclickedproduct();
    }
  }, [id, navigate, value, stock_count]);

  return (
    <>
      <Nav2 />
      {console.log(productImage)}
      <section
        className="d-flex align-items-center"
        style={{ backgroundColor: "#f6f6f6", height: "100vh" }}
      >
        <div className="card flex justify-content-center">
          <Dialog
            visible={visible}
            onHide={() => {
              if (!visible) return;
              setVisible(false);
            }}
            className="dialog"
            style={{ width: "50vw" }}
            breakpoints={{ "960px": "75vw", "641px": "100vw" }}
          >
            <div className="text-center">
              <div>
                <h1 className="dialog-text-heading">
                  Product added succesfully
                </h1>
              </div>
              <div className="dilaog-image">
                <img src={image5} alt="" />
              </div>
            </div>
          </Dialog>
        </div>

        <div className="container">
          <div className="d-padding">
            {productDetails ? (
              <div className="grid">
                <div className="col-6 lg:col-6 whitslist-left-cont">
                  <div className="w-100" style={{ height: "100%" }}>
                    <img
                      src={images}
                      alt=""
                      className="w-100 whitslist-image"
                    />
                  </div>
                  <div className="w-100 d-flex whitslist-image-sub mt-3 ">
                    <div className="whitslist-image-sub-container mt-2">
                      <img
                        src={`http://127.0.0.1:8000/${productDetails.image}`}
                        alt=""
                        onMouseOver={() =>
                          setimage(
                            `http://127.0.0.1:8000/${productDetails.image}`
                          )
                        }
                      />
                    </div>
                    {productImage.length > 0 ? (
                      productImage.map((item, index) => (
                        <div
                          className="whitslist-image-sub-container mt-2"
                          key={index}
                        >
                          <img
                            src={`http://127.0.0.1:8000/${item.image}`}
                            alt=""
                            onMouseOver={() =>
                              setimage(`http://127.0.0.1:8000/${item.image}`)
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <div className="col-6 lg:col-6">
                  <div>
                    <h3 className="text-start text-dark">{productDetails.name}</h3>
                  </div>
                  <div className="text-start w-100">
                    <p className="w-100">
                    {productDetails.description}
                      </p>
                    </div>

                  <div className="d-flex">
                    <div className="w-50">
                      {productDetails.stock_count > 0 ? (
                        <div className="text-success text-start mt-2 w-100">
                          <h5>in stock</h5>
                       
                        </div>
                      ) : (
                        <div className="text-danger text-start mt-2">
                          <h5>out of stock</h5>
                        </div>
                      )}
                    </div>
                    <div className="text-end like-png w-100">
                      <img src={likeimage} alt="" onClick={addtowhistlist} />
                    </div>
                  </div>
                  {display5 ? (
                            <p className="text-success w-100 text-start">
                              only {stock_count} products remaining
                            </p>
                          ) : (
                            <div></div>
                          )}
                  <div className="flex align-items-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`bi ${
                          i < totalstar ? "bi-star-fill" : "bi-star"
                        } text-warning`}
                      ></i>
                    ))}
                    <h6 className="m-0 p-o ml-1 fw-bold text-dark">{count}</h6>{" "}
                    <h6
                      className="m-0 p-0 fw-bold text-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      style={{ cursor: "pointer" }}
                    >
                      (Review)
                    </h6>
                  </div>

                  <div className="text-start mt-3">
                    <h5 className="text-danger">
                      ₹
                      <span className="text-danger">
                        {productDetails.price}
                      </span>
                    </h5>
                  </div>
                  <div
                    className="grid d-flex align-items-center"
                  
                   
                  >
                    <div className="col-12 lg:col-4 mt-3">
                      <div className="d-flex justify-content-start quantity-ui-box-sub align-items-center">
                      <div>
                          <h5
                            className="text-dark"
                            onClick={decrement}
                            style={{ cursor: "pointer" }}
                          >
                            −
                          </h5>
                        </div>
                   
                        <div>
                          <h5 className="text-dark">{value}</h5>
                        </div>
                        <div>
                          <h5
                            className="text-dark"
                            style={{ cursor: "pointer" }}
                            onClick={increment}
                          >
                            +
                          </h5>
                        </div>
                    
                      </div>
                    </div>
                    <div className="col-12 lg:col-4">
                    <div className="add-to-cart-whistlist d-flex justify-content-start align-items-center">
                      <button onClick={addtocart}>add to cart</button>
                    </div>
                    </div>
                   
                  </div>
                  <div>
                    {maximumvalue ? (
                      <div className="text-start">
                        <p className="text-danger">
                          you can only choose 5 products
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Loading />
              </div>
            )}
          </div>
        </div>
      </section>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1
                class="modal-title fs-5 fw-bold text-dark"
                id="exampleModalLabel"
              >
                Review
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body stas">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`bi ${
                    i < star ? "bi-star-fill" : "bi-star"
                  } text-warning`}
                  onClick={() => setstar(i + 1)}
                  style={{ cursor: "pointer" }}
                ></i>
              ))}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary posts-btn"
                data-bs-dismiss="modal"
                onClick={() => {
                  posts();
                }}
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
