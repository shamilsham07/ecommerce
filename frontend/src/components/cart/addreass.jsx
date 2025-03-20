import React, { useEffect, useState } from "react";
import Nav2 from "../nav2";
import "./cartpage.css";
import { useNavigate } from "react-router-dom";
import csrftoken from "../../csrf";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import image from "../../assets/41jOEM5KONL._SX569_.jpg";
import { setaddreass } from "../redux/reducer";
import image1 from "../../assets/check (2).png";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
export default function Adreass() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [PaymentMethod, setpaymentMethod] = useState("COD");
  const [product_id, setProductId] = useState();
  const [product, setproduct] = useState([]);
  const [stock, setstock] = useState();
  const [visible, setVisible] = useState(false);
  const [addreassid, setaddreassid] = useState(null);
  const [addressdetails, setaddreassdetails] = useState([]);
  const userdetails = useSelector((state) => state.auth.userdata);
  const [value, setvaalue] = useState(false);
  const user_id = userdetails ? userdetails.id : null;
  const { id } = useParams();

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

            //just added copen not workee pending work

            body: JSON.stringify({
              product: product.map((item) => item.id),
              paymentmethod: PaymentMethod,
              user_id: user_id,
              addreassid: addreassid,
              coupen: "",
            }),
          });

          const res = await result.json();
          if (res.message) {
            console.log(res.message);
            setVisible(true);
          }
          if (res.outofstock) {
            alert(res.outofstock);
          }
          if (res.error) {
            alert(res.error);
          }
        }
        if (PaymentMethod == "RAZER PAY") {
          navigation("/PaymentComponent");
        }
      } else if (addreassid == null) {
        alert("please choose the specific addreass");
      }
    } catch (error) {
      console.log(error, "e");
    }
  };

  const AddnewAddreass = () => {
    navigation(`/Addresspage/${id}`);
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
        console.log("jelli",res.stocks)
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

  const ondeleteaddreass = async (id) => {
    const addreass_id = id;
    try {
      const res = await fetch("http://localhost:8000/deleteaddreass", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: addreass_id, user_id: user_id }),
      });
      const result = await res.json();

      if (result.data) {
        setaddreassdetails(result.data);
      } else {
        console.log("errorrrrrrrrrr");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleAddreass = (id) => {
    {
      document.querySelectorAll(".addreass-card").forEach((el) => {
        el.classList.remove("card-active");
      });
      document
        .querySelector(`.addreass-card[data-id="${id}"]`)
        ?.classList.add("card-active");
    }
    console.log("the adreass", id);

    dispatch(setaddreass(id));
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
  useEffect(() => {
    console.log("updated product", product);
  }, [product]);

  return (
    <>
      <Nav2 />

      <div className="adreass-section container">
        <div className="card flex justify-content-center">
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
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="heading-main-add">Addresses</h2>
          </div>
          <div>
            <button className="new-add-btn" onClick={AddnewAddreass}>
              {" "}
              <span>
                <MdAdd />
              </span>
              add new addreass
            </button>
          </div>
        </div>

        {value ? (
          <div className="row p-5 w-100">
            <div className="col-9">
              <div className="row">
                {addressdetails.map((addreass, index) => (
                  <div className="col-4" key={index}>
                    <div
                      className="card addreass-card"
                      data-id={addreass.id}
                      onClick={() => {
                        handleAddreass(addreass.id);
                        setaddreassid(addreass.id);
                      }}
                    >
                      <div class="card-body  body-of-card">
                        <h5 class="card-title card-heads text-dark">
                          {addreass.city}
                        </h5>

                        <h6 class="card-subtitle mb-2 card-names text-dark">
                          {addreass.name}
                        </h6>
                        <p class="card-text w-100 text-dark card-addreass-p m-0 p-0 ">
                          PH: {addreass.phonenumber}
                        </p>
                        <p className="card-text card-ph m-0">
                          {addreass.email}
                        </p>
                        <p className="card-text card-ph m-0">
                          {addreass.addreass}
                        </p>
                        <div className="addreass-edit">
                          <span className="md-addreass">
                            <MdDelete
                              className="text-white"
                              onClick={() => ondeleteaddreass(addreass.id)}
                            />
                          </span>
                          <span className="md-addreass">
                            <FaPencilAlt className="text-white" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-3">
              <div className="product-details-buy">
                <h5>Order Summary</h5>
                <hr />

                <div className="d-flex">
                  <div className="summaryimage">
                    <img src={image} alt="jj" />
                  </div>

                  <div>
                    {product.map((item) => (
                      <div className="ml-5 mt-4" key={item.id}>
                        <div>{item.name}</div>
                        <div>Quantity: {item.quantity}</div>
                        <div className="text-danger">
                          price: {item.totalprice}
                        </div>
                        <div className="">
                          {stock ? (
                            <div className="text-danger">out of stock</div>
                          ) : (
                            <div className="text-success">in stock</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mt-4 promocode">
                    <h5>Promo Code</h5>
                  </div>
                  <div className="promoinput">
                    <input type="text" placeholder="Enter your code" />
                    <button>Apply</button>
                  </div>
                  <hr />
                  <div>
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
                    <div className="order-summary-btn">
                      <button onClick={buyit}>buy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>nodataaaaaaa</div>
        )}
      </div>
    </>
  );
}
