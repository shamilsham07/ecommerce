import React, { useEffect, useState } from "react";
import Nav2 from "../components/nav2";
import Footer from "../components/footer";
import "./whistlist.css";
import { useRef } from "react";
import { MdDelete } from "react-icons/md";
import image from "../assets/41jOEM5KONL._SX569_.jpg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import csrftoken from "../csrf";
import { Toast } from "primereact/toast";
import "react-toastify/dist/ReactToastify.css";
export default function Wishlist() {
    const toast = useRef(null);
  const navigate = useNavigate("");
  const [thedata, setdata] = useState([""]);
  const userId = useSelector((state) => state.auth.userdata.id);

  const [count, setcount] = useState();


  const show = () => {
    toast.current.show({
      severity: "error",
      detail: "please login",
      className: "something-went-wrong",
    });
  };
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "Productadded",
      life: 3000,
      className: "here-product-added",
    });
  };


  const notify = async (id) => {
    if (userId) {
      const res = await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },

        body: JSON.stringify({ id: id, userid: userId }),
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

  const deletes = async (id) => {
    const result = await fetch("http://localhost:8000/deleteWishList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ userid: userId, id: id }),
    });
    const res = await result.json();
    if (res.data) {
      console.log("good");
      setdata(res.data);
    } else {
      console.log(res.error);
    }
  };

  const getWishList = async (id) => {
    try {
      console.log("tttttttttttt", userId);

      const result = await fetch("http://localhost:8000/getWishList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },

        body: JSON.stringify({ id }),
      });
      const res = await result.json();

      if (res.data) {
        console.log(res.data);
        setdata(res.data);
        setcount(res.count);

        console.log("settttttt");
        console.log(thedata);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (userId==null) {
      navigate('/')
    }
    getWishList(userId);

  }, [userId]);

  return (
    <>
      <Nav2 />
      <div style={{ background: "#fafafa" }}>
      <div className="card flex justify-content-center">
      <Toast ref={toast} />
        <div className="container">
          <div className="d-padding">
            <div className="text-start wishlist-heading mt-3">
              <h3>My whishlist ({count})</h3>
            </div>
            <hr />
            {thedata.length > 0 ? (
              thedata.map((item, index) => (
                <div className="row" key={index}>
                  <div className="col-2">
                    <img
                      src={`http://127.0.0.1:8000/${item.product_image}`}
                      alt=""
                      className="wishlist-image"
                    />
                  </div>
                  <div className="col-8">
                    <div className="text-start">
                      <div>
                        <h5 className="text-dark wishlist-p-name">
                          {item.product_name}
                        </h5>
                      </div>

                      {item.product_stock > 0 ? (
                        <div>
                          <h5 className="text-success">in stock</h5>
                        </div>
                      ) : (
                        <div>
                          <h5 className="text-danger">out of stock</h5>
                        </div>
                      )}

                      <div>
                        <p>{item.product_description}</p>
                      </div>
                      <div>
                        <h6 className="wishlist-rupee">
                          ₹{item.product_price}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-2 p-5">
                    <div>
                      <div className="text-end">
                        <i className="wishlist-delete">
                          <MdDelete
                            onClick={() => deletes(item.product)}
                            style={{ cursor: "pointer" }}
                          />
                        </i>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="wish-list-btn"
                          onClick={()=>notify(item.product)}
                        >
                          add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
