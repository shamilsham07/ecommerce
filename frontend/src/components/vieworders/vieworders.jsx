import React, { useEffect, useState, useRef } from "react";
import Nav2 from "../nav2";
import { useSelector } from "react-redux";
import Footer from "../footer";
import "./vieworders.css";
import csrftoken from "../../csrf";
import logo from "../../assets/LOGO-1.png";
import { useNavigate } from "react-router-dom";
export default function Vieworders() {
  const navigation=useNavigate("")
  const userdetails = useSelector((state) => state.auth.userdata);
  const userid = userdetails.id;
  const pdfRef = useRef();
  const[order_id,setorderid]=useState(0)
  const date = new Date();
  const formattedDate = date.toLocaleDateString();
  const [product, setproduct] = useState([]);
  const [showinvoice, setshowinvoice] = useState(false);
  const [hidefront, sethideFront] = useState(true);

  const fetchinvoicedata = async (id) => {
    try {
      console.log("first", id);
      const result = await fetch("http://localhost:8000/getinvoiceproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ id: id }),
      });
      const res = await result.json();
      if (Array.isArray(res.data)) {
        console.log("kl6", res.data);
        setproduct(res.data);
        console.log("iam hhungry");
        sethideFront(false);
        setshowinvoice(true);
        setTimeout(() => {
          window.print();
        }, 500);
      }
      if (res.error) {
        console.log("kkkkk");

        setproduct([]);
      }
    } catch (error) {
      console.log("error", error);
      setproduct([]);
    }
  };
  const [orders, setorders] = useState([]);

  const getmyorders = async () => {
    console.log("FIFIFIFI", userid);
    if (userid) {
      const result = await fetch("http://localhost:8000/getmyorders", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userid }),
      });
      const res = await result.json();
      if (res.data) {
        setorders(res.data || 0);
        console.log("ll", res.data);
      } else {
        setorders(0);
      }
    } else {
    }
  };

  useEffect(() => {
    getmyorders();
  }, [userid]);

  return (
    <>
      {hidefront && (
        <div>
          <Nav2 />
          <div>
            <div className="container">
              <div className="d-padding">
                <div
                  style={{
                    borderTop: "1px solid #e6e6e6",
                  }}
                >
                  <div className="order-view-heading d-flex justify-content-between align-items-center p-3">
                    <div>
                      <h3>My Orders</h3>
                    </div>
                    <div>
                      <button onClick={()=>navigation("/")}>
                        <i class="bi bi-arrow-left"></i> continue shopping
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">image</th>

                          <th scope="col">price</th>

                          <th scope="col">quantity</th>
                          <th scope="col">orderId</th>
                          <th scope="col">totalprice</th>
                        </tr>
                      </thead>

                      {orders.map((item, index) => (
                        <tbody>
                          <tr className="verticls" key={index}>
                            <td className="text-dark">{item.name}</td>
                            <td>
                              <img
                                src={`http://localhost:8000/${item.image}`}
                                alt=""
                                className="image-of-cart"
                              />
                            </td>
                            <td className="text-dark">{item.price}</td>
                            <td className="text-dark">{item.quantity}</td>
                            <td className="text-dark">{item.order_id}</td>
                            <td className="text-dark">{item.totalprice}</td>
                            <td className="">
                              <button
                                type="submit"
                                onClick={async () => {
                                  await fetchinvoicedata(item.id);
                                  setorderid(item.order_id)
                                }}
                                className="download-invoice-btn"
                              >
                                Download Invoice
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}

      {showinvoice && (
      
        <div className="invoice">
          
          <div>
            <title>Invoice</title>
            <div
              ref={pdfRef}
              style={{ padding: 20, background: "#fff" }}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="p-5">
                <div className="">
                  <img src={logo} alt="" />
                </div>
                <div className="d-flex justify-content-around p-5 ml-5">
                  <div className="invoice-addreass text-start mt-3 ml-5 ">
                    <h6 className="">addreass</h6>
                    <p>Shamil Mt</p>
                    <p style={{ width: "250px" }}>
                      musliyam veetil thalkattu karuksathi
                    </p>
                    <p>shamilsham248@gmail.com</p>

                    <h6 className="mt-3">8156971351</h6>
                  </div>
                  <div className="mt-3 order-id-invoice">
                    <h6>orderId: {order_id}</h6>
                    <p>date:{formattedDate}</p>
                  </div>
                </div>

                <div className="mt-3 p-5">
                  <table class="table w-75 heretable">
                    <thead
                      className="table-headings"
                      style={{ backgroundColor: "#15154a" }}
                    >
                      <tr>
                        <th scope="col">item</th>
                        <th scope="col">date</th>
                        <th scope="col">price</th>
                        <th scope="col">quantity</th>
                        <th scope="col">total</th>
                      </tr>
                    </thead>
                    {product.map((item, index) => (
                      <tbody key={index}>
                        <tr>
                          <td>{item.name}</td>
                          <td>{item.date}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.totalprice}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
