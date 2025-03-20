import React, { useEffect, useState } from "react";

import Nav2 from "../nav2";
import "animate.css";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import image from "../../assets/check.png";
import close from "../../assets/close.png";
import { useNavigate } from "react-router-dom";
import Footer from "../footer";
import { useSelector } from "react-redux";
import "./cartpage.css";
import { MdAdd } from "react-icons/md";
import csrftoken from "../../csrf";

export default function Cartpage() {
  const [value, setValue] = useState(1);
  const [selectedid, setselectedid] = useState(null);
  const [totalprice, settotalprice] = useState([]);
  const [product, setproduct] = useState([]);
  const [visible, setVisible] = useState(false);
  const [count, setcount] = useState();
  const userdetails = useSelector((state) => state.auth.userdata);
  const id = userdetails.id;

  const navigate = useNavigate();
  useEffect(() => {
    const callcart = async () => {
      const res = await fetch("http://localhost:8000/getcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ id: id }),
      });
      const result = await res.json();
      if (Array.isArray(result.data)) {
        setproduct(result.data);
        console.log(result.data);
        setcount(result.count);
        settotalprice(result.data.totalprice);
      } else {
        setproduct([]);
      }
    };

    const NoId = () => {
      if (id == null) {
        navigate("/");
      }
    };
    NoId();

    callcart();
  }, [id]);
  const deleted = async () => {
    setVisible(false);
    const res = await fetch("http://localhost:8000/deleteCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ id: selectedid, user_id: id }),
    });
    const result = await res.json();
    if (result.data) {
      setproduct(result.data);
    } else {
    }
  };
  const buyproduct = (id) => {
    navigate(`/Adreass/${id}`);
  };

  const increment = async (productid, currentQuantity, price, stock) => {
    console.log(stock);
    console.log(currentQuantity);
    if (currentQuantity >= stock) {
      alert("the maximum stock we have reached");
      return;
    } else {
      const newquantity = currentQuantity + 1;

      setproduct((prevvlaue) =>
        prevvlaue.map((item) =>
          item.id === productid ? { ...item, quantity: newquantity } : item
        )
      );

      const response = await fetch("http://localhost:8000/increaseQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          id: productid,
          quantity: newquantity,
          userid: id,
        }),
      });
      const res = await response.json();
      if (res.data) {
        console.log(res.data);
      } else {
        console.log("hij");
        console.log(res.error);
        alert(res.error);
        setproduct(res.data);
      }
    }
  };
  const decrement = async (productid, currentQuantity) => {
    if (currentQuantity == 1) {
      return;
    } else {
      const newquantity = currentQuantity - 1;
      setproduct((prevvalue) =>
        prevvalue.map((item) =>
          item.id == productid ? { ...item, quantity: newquantity } : item
        )
      );

      const result = await fetch("http://localhost:8000/decreaseQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          id: productid,
          quantity: newquantity,
          userid: id,
        }),
      });
      const res = await result.json();
      if (res.message) {
        console.log("good");
      } else {
        alert("entho preshnamind");
      }
    }
  };

  return (
    <>
      <Nav2 />
      <div style={{ background: "#fafafa" }}>
        <div className="container">
          <div className="d-padding">
            <div className="d-flex justify-content-between p-3 heading-of-cart">
              <div>
                <h2 className="ms-3">Shopping Cart</h2>
              </div>
              <div>
                {" "}
                <h3 className="mx-3">{count} items</h3>
              </div>
            </div>

            <table className="table table-heading-name">
              <thead>
                <tr>
                  <th scope="col">Product Details</th>
                  <th scope="col">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total Price</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody style={{ border: "none" }}>
                {Array.isArray(product) &&
                  product.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">
                        <img
                          src={`http://localhost:8000/${item.image}`}
                          alt=""
                          className="image-of-cart"
                        />
                      </th>
                      <td className="td-data">{item.name}</td>
                      <td className="td-data">
                        <div
                          className="d-flex justify-content-center  align-items-center"
                          style={{ gap: "10px" }}
                        >
                          <MdAdd
                            className="add-add-cart-btn"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              increment(
                                item.id,
                                item.quantity,
                                item.price,
                                item.stock_count
                              )
                            }
                          />

                          <div className="number-coloumn">{item.quantity}</div>
                          <i
                            className="bi bi-dash"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              decrement(item.id, item.quantity, item.price)
                            }
                          ></i>
                        </div>
                      </td>
                      <td className="td-data">{item.price} </td>
                      <td className="td-data">{item.quantity * item.price}</td>
                      <td className="td-data">
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{ gap: "10px" }}
                        >
                          <button
                            className="buy-it-cart"
                            onClick={() => buyproduct(item.id)}
                          >
                            buy it
                          </button>
                          <i
                            className="bi bi-trash3-fill"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setVisible(true);
                              setselectedid(item.id);
                            }}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <Dialog
              className="delete-header"
              visible={visible}
              // modal={false}
              style={{ width: "50vw" }}
              onHide={() => {
                if (!visible) return;
                setVisible(false);
              }}
            >
              <div
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ height: "100%", flexDirection: "column" }}
              >
                <div>
                  <h3>are you sure</h3>
                </div>
                <div className=" d-flex mt-2" style={{ gap: "40px" }}>
                  <div className="delete-png-addto">
                    <img src={image} alt="" onClick={deleted} />
                  </div>
                  <div className="close-png-img">
                    <img src={close} alt="" onClick={() => setVisible(false)} />
                  </div>
                </div>
              </div>
            </Dialog>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
