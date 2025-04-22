import React, { useEffect, useState } from "react";
import Nav2 from "../nav2";
import "./cartpage.css";
import { useNavigate } from "react-router-dom";
import csrftoken from "../../csrf";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd, MdDomainVerification } from "react-icons/md";
import Loading from "../loading/loading";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import image from "../../assets/41jOEM5KONL._SX569_.jpg";
import { setaddreass } from "../redux/reducer";
import image1 from "../../assets/check (2).png";
import emoji from "../../assets/emoji.png";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";


export default function Adreass() {
  const dispatch = useDispatch();

  const [PaymentMethod, setpaymentMethod] = useState("COD");
  const [product_id, setProductId] = useState();
  const [product, setproduct] = useState([]);
  const [stock, setstock] = useState();
  const [visible, setVisible] = useState(false);
  const [addreassid, setaddreassid] = useState(null);
  const [addressdetails, setaddreassdetails] = useState([]);
  const userdetails = useSelector((state) => state.auth.userdata);
  const [value, setvaalue] = useState(false);
  const [discount, setdiscount] = useState();
  const [coupenvalue, setcoupenvalue] = useState("");
  const user_id = userdetails ? userdetails.id : null;
  const [popper, setpopper] = useState(false);
  const [totalprice, settotalprice] = useState();
  const [visibleofprice, setofvisbleprice] = useState(false);

  const [originalprice, setoriginalprice] = useState();
  const [variable, setvariable] = useState(false);

  const [loader, setloader] = useState(true);





  const navigation = useNavigate();
  const { id } = useParams();
  const AddnewAddreass = () => {
    navigation(`/Addresspage/${id}`);
  };

  const deliver = (id) => {
    document.querySelectorAll(".deliver-btn-handle").forEach((el) => {
      el.classList.remove("cardactive");
      el.textContent="deliver here"
    });
    
    const selected=document.querySelector(`.deliver-btn-handle[data-id="${id}"]`)
    if(selected){
      selected.classList.add("cardactive")
      selected.textContent="selected"
    }
     
  };

  const buyit = async () => {
    console.log(PaymentMethod);
    console.log(user_id);
    console.log(addreassid);
    console.log(product);
    try {
      if (addreassid && user_id && PaymentMethod) {
        if (PaymentMethod == "COD") {
          const result = await fetch("http://localhost:8000/buyingproduct", {
            method: "POST",
            headers: {
              "X-CSRFToken": csrftoken,
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              product: product.map((item) => item.id),
              paymentmethod: PaymentMethod,
              user_id: user_id,
              addreassid: addreassid,
              coupenvalue: coupenvalue,
              discount: discount,
              originalprice: originalprice,
            }),
          });

          const res = await result.json();
          if (res.message) {
            console.log(res.message);
            setVisible(true);
            setTimeout(() => {
              navigation("/");
            }, 4000);
          }
          if (res.outofstock) {
            alert(res.outofstock);
          }
          if (res.error) {
            alert(res.error);
          }
        }
        if (PaymentMethod == "RAZER PAY") {
          const result=await fetch("http://localhost:8000/razerpay",{
            method:"POST",
            headers:{
              "X-CSRFToken": csrftoken,
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              product: product.map((item) => item.id),
              paymentmethod: PaymentMethod,
              user_id: user_id,
              addreassid: addreassid,
              coupenvalue: coupenvalue,
              discount: discount,
              originalprice: originalprice,
            })

          })
          const res=await result.json()
          if(res.message){
            console.log(res.message)
            navigation(`/PaymentComponent/${res.message}`)
          }
          else if(res.outofstock){
            alert(res.outofstock)
          }
        
        }
      } else if (addreassid == null) {
        alert("please choose the specific addreass");
      }
    } catch (error) {
      console.log(error, "e");
    }
  };

  const getdetails = async () => {
    try {
      if (user_id) {
        const res = await fetch("http://localhost:8000/getaddreass", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrftoken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: user_id }),
        });

        const result = await res.json();
        if (result.data) {
          setaddreassdetails(result.data);
          setvaalue(true);
        }
        if (result.error) {
          console.log("ccccccc");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const apllypromocode = async () => {
    setloader(false);
    console.log("coupenvalue", coupenvalue);
    if (coupenvalue == "") {
      setofvisbleprice(false);
      alert("enter valid coupen");

      setloader(true);
    } else {
      console.log("first");
      const result = await fetch("http://localhost:8000/apllypromocode", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coupenvalue: coupenvalue }),
      });
      const res = await result.json();
      if (res.data) {
        console.log("discount", res.data);
        setdiscount(res.data);
        setofvisbleprice(true);
        console.log(discount)
        const org = (discount / 100) * totalprice;
        console.log("org", org);
        setoriginalprice(org);
      }
      if (res.error) {
        console.log("firstly");
        setvariable(true);
        setofvisbleprice(false);
        setTimeout(() => {
          setloader(true);
        }, 500);
        alert("thecoupen already used");
      }
      if (res.errors) {
        setofvisbleprice(false);
        setTimeout(() => {
          setloader(true);
        }, 500);
        alert("the coupen is not found");
      } else if (res.wrong) {
        setloader(true);
        setofvisbleprice(false);

        console.log("firstzzzzzzzzzzz");
      }
    }
  };

  const gettheproduct = async () => {
    if (user_id && id) {
      console.log("here", id);
      console.log("here", user_id);
      if (addreassid) {
        console.log(addreassid);
      }

      const result = await fetch("http://localhost:8000/getproductforbuy", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: id, userid: user_id }),
      });

      const res = await result.json();
      if (res.data) {
        console.log("Product data received:", res.data);
        setproduct([res.data]);
        console.log("jelli", res.stocks);
        settotalprice(res.data.totalprice);
        if (res.stocks != null) {
          setstock(true);
          console.log("kk", res.stocks);
        } else {
          console.log("janson");
          setstock(false);
        }
      } else {
        console.log("No product data found or invalid format.");
        setproduct([]); // Ensure it's always an array
      }
      console.log(product);
    }
  };

  useEffect(() => {
    if (user_id) {
      getdetails();
    }
  }, [user_id]);
  useEffect(() => {
    if (user_id && id) {
      gettheproduct();
    }
  }, [user_id, id]);
  return (
    <>
      <div style={{ background: "#fafafa" }}>
        <Nav2 />
        <div className="container">
          {visible && (
            <div className="d-flex justify-content-center align-items-center">
              <Dialog
                header=""
                visible={visible}
                className="dig-visible"
                onHide={() => {
                  if (!visible) return;
                  setVisible(false);
                }}
                style={{ width: "40vw" }}
                breakpoints={{ "960px": "75vw", "641px": "100vw" }}
              >
                <div>
                  <div className="tick-image-img d-flex justify-content-center align-items-center">
                    <img src={image1} alt="" />
                  </div>
                  <div className="text-center mt-2">
                    <h4 className="item-purchase-dialog">
                      item purchased succesfully
                    </h4>
                  </div>
                </div>
              </Dialog>
            </div>
          )}

          <div className="d-padding">
            <div className="row m-0 p-0 mt-5 ">
              <div
                className="col-8  mt-5 m-0 p-0"
                style={{
                  backgroundColor: "#e6e6e6",
                }}
              >
                <div className="deliver-adreass-div-back w-100 text-start align-items-center justify-content-center">
                  <h3 className="ml-2">Delivery address</h3>
                </div>
                {addressdetails.map((item, index) => (
                  <div className="row m-0 p-0" key={item.id}>
                    <div className="col-9 p-3 ml-3">
                      <div className="">
                        <div className="text-start home-delivery-addreass">
                          <h6>home</h6>
                        </div>
                      </div>
                      <div className="w-100 text-start home-delivery-addreass-name ">
                        <h5>
                          {item.name},<span>{item.phonenumber}</span>
                        </h5>
                      </div>
                      <div className="w-100 text-start home-delivery-addreass-name ">
                        <h5>
                          {item.addreass}
                          <span className="fw-bold">-{item.pincode}</span>
                        </h5>
                      </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                      <div className="deliver-here-btn"  >
                        <button
                          className="deliver-btn-handle"
                          data-id={item.id}
                         
                          onClick={() => {
                            // handleAddreass(item.id);
                            setaddreassid(item.id);
                            deliver(item.id);
                          }}
                        >
                          {" "}
                          deliver here
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}

                <div className="w-100 text-start ml-1 d-flex align-items center">
                  <div className="mb-2 ml-2">
                    <button
                      className="addreass-here-btns"
                      onClick={AddnewAddreass}
                    >
                      {" "}
                      add adreass
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="col-3 mt-5 ml-4 m-0 p-0"
                style={{ backgroundColor: "#e6e6e6" }}
              >
                <div>
                  <div className="w-100 price-details text-start deliver-adreass-div-back">
                    <h3 className="ml-2">price details</h3>
                  </div>
                  {product.map((item, index) => (
                    <div className="row m-0 p-3 mt-3" key={index}>
                      <div className="col-6 text-start">
                        <h6 className="price-details-price">price</h6>
                      </div>
                      <div className="col-6 text-end">
                        <h6 className="price-details-prices">{item.price}</h6>
                      </div>
                      <div className="col-6 text-start">
                        <h6 className="price-details-price">quantity</h6>
                      </div>
                      <div className="col-6 text-end">
                        <h6 className="price-details-prices">
                          {item.quantity}
                        </h6>
                      </div>
                      {stock ? (
                        <div className="col-12 text-start price-details-prices text-success fw-bold">
                          in Stock
                        </div>
                      ) : (
                        <div className="col-12 text-start price-details-prices text-danger fw-bold">
                          out of Stock
                        </div>
                      )}

                      <hr className="mt-3" />
                      <div className="row m-0 align-items-center">
                        {visibleofprice ? (
                          <div className="col-12 m-0 p-0">
                            <div className="row align-item-center m-0 p-0">
                              <div className="col-6 text-start d-flex justify-content-between align-items-center">
                                <h6 className="price-details-price m-0 p-0">
                                  totalprice
                                </h6>
                              </div>
                              <div className="col-6 text-end">
                                <del className="price-details-price m-0 p-0">
                                  {item.totalprice}
                                </del>
                              </div>
                            </div>
                            <div className="row align-item-center justify-content-between m-0 p-0">
                              <div className="col-6 text-start d-flex justify-content-between align-items-center">
                                <h6 className="price-details-price m-0 p-0">
                                  coupen
                                </h6>
                              </div>
                              <div className="col-6 text-end">
                                <h6 className="price-details-price m-0 p-0 w-100">
                                  {coupenvalue}
                                </h6>
                              </div>
                            </div>
                            <div className="row align-item-center justify-content-between m-0 p-0">
                              <div className="col-6 text-start d-flex justify-content-between align-items-center">
                                <h6 className="price-details-price m-0 p-0 w-100">
                                  discount
                                </h6>
                              </div>
                              <div className="col-6 text-end">
                                <h6 className="price-details-price m-0 p-0 w-100">
                                  {discount}%
                                </h6>
                              </div>
                            </div>
                            <div className="row align-item-center justify-content-between m-0 p-0">
                              <div className="col-6 text-start d-flex justify-content-between align-items-center">
                                <h6 className="price-details-price m-0 p-0 w-100">
                                  totalpayable
                                </h6>
                              </div>
                              <div className="col-6 text-end">
                                <h6 className="price-details-price m-0 p-0 w-100">
                                  {totalprice-((discount / 100) * totalprice)}
                                </h6>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="col-12 m-0 p-0 d-flex align-items-center justify-content-between">
                            <h6 className="price-details-price m-0 p-0">
                              {" "}
                              total price{" "}
                            </h6>
                            <h6 className="price-details-price m-0 p-0">
                              {item.totalprice}
                            </h6>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-8 m-0 p-0 mt-3">
                <div className="w-100 price-details text-start deliver-adreass-div-back">
                  <h3 className="ml-2">order summary</h3>
                </div>
                {product.map((item, index) => (
                  <div className="row m-0 p-0 mt-2" key={item.id}>
                    <div className="col-2">
                      <img src={`http://localhost:8000/${item.image}`} alt="" className="delivery-page-img" />
                    </div>
                    <div className="col-9">
                      <div className=" text-start">
                        <h6 className="price-details-price">{item.name}</h6>
                      </div>
                      <div className=" text-start">
                        <h6 className="price-details-pricez fw-bold">
                          promo code
                        </h6>
                      </div>
                      <div className="text-start">
                        <input
                          type="text"
                          className="promo-code-inp"
                          placeholder="Enter your code"
                          value={coupenvalue}
                          onChange={(e) => setcoupenvalue(e.target.value)}
                        />
                        <button
                          className="promo-code-apply"
                          onClick={() => {
                            apllypromocode();
                          }}
                        >
                          apply
                        </button>
                        <div className="mt-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              value="COD"
                              defaultChecked
                              checked={PaymentMethod === "COD"}
                              onChange={(e) => setpaymentMethod(e.target.value)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault1"
                            >
                              COD
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault2"
                              value="RAZER PAY"
                              checked={PaymentMethod === "RAZER PAY"}
                              onChange={(e) => setpaymentMethod(e.target.value)}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            >
                              Razer Pay
                            </label>
                          </div>
                          <div className="order-summary-btn text-start mt-3">
                            <button onClick={buyit}>buy</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
