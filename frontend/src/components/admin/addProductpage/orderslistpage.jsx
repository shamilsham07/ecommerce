import React, { useEffect, useState } from "react";
import MainSidebar from "../sidebar";
import "./addproduct.css";
import { Await, useNavigate } from "react-router-dom";
import csrftoken from "../../../csrf";
import Loading from "../../loading/loading";

export default function Orderslistpage() {
  const [user_id, setuserid] = useState();
  const [loader, setloader] = useState(false);
  const [productSearch, setproductsearch] = useState("");
  const [products, setproducts] = useState([]);
  const [backup, setbackup] = useState([]);

  const search = (event) => {
    setproductsearch(event.target.value);

    if (products.includes("name")) {
      console.log("set ann");
    }

    if (event.target.value.length > 0) {
      const filtereddata = backup.filter((product) => {
        const value = product.name.includes(event.target.value);
        const orgprice =
         parseInt(product.price) >= parseInt(event.target.value);
       
        return value || orgprice 
      });
      setproducts(filtereddata);
    } else {
      setproducts(backup);
    }
  };

  const settingvalue = async (e, id) => {
    console.log(user_id);

    setvalue(e);
    const result = await fetch("http://localhost:8000/updatetheorder", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, value: e, user_id: user_id }),
    });
    const res = await result.json();
    if (res.data) {
      setproducts(res.data);
      setbackup(res.data);
      setloader(false);
    }
  };

  const [value, setvalue] = useState("");
  let newDate = new Date();
  const navigation = useNavigate("");

  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  const orderupdate = async () => {
    const result = await fetch("http://localhost:8000/orderupdate", {
      method: "GET",
    });
    const res = await result.json();
    if (res.message) {
      console.log("first");
      setproducts(res.message);
      setbackup(res.message);
    } else {
      console.log("bad");
    }
  };

  useEffect(() => {
    console.log(date);
    orderupdate();
  }, []);
  const goback = () => {
    console.log("first");
    window.history.back();
  };
  return (
    <div className="row  m-0 p-0">
      <div className="col-2">
        <MainSidebar />
      </div>
      {loader ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="col-10">
          <div className="container">
            <div className="row">
              <div className="col-1">
                <div
                  className="
       arrows-round
        "
                  onClick={() => goback()}
                >
                  <i class="bi bi-arrow-left-circle-fill "></i>
                </div>
              </div>
              <div className="col-2 ">
                <div
                  className="d-flex  text-start "
                  style={{ flexDirection: "column" }}
                >
                  <h2 className="orders-heading m-0 p-0 w-100">Orders</h2>
                  <p className="m-0 p-0 orders-found w-100">20 orders found</p>
                </div>
              </div>
              <div className="col-9 align-items-center justify-content-center ">
                <div
                  className="text-end d-flex justify-content-end align-items-end"
                  style={{ height: "62px" }}
                >
                  <div className="date-div d-flex justify-content-center align-items-center mx-3 mb-3 ">
                    <div className="mx-2">
                      <i class="bi bi-calendar3 text-dark"></i>
                    </div>
                    <div className="date-text fw-bold">
                      {date}/{month}/{year}
                    </div>
                  </div>
                </div>
                <div className="text-end mx-3">
                  <input
                    type="text"
                    placeholder="Search by product name"
                    className="p-2 search-field-product"
                    onChange={(event) => {
                      search(event);
                    }}
                  />
                </div>
              </div>
            </div>

            <table className="table " style={{ background: "black" }}>
              <thead className="table-heads w-100">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Payment Method</th>
                </tr>
              </thead>
              {products.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td className="text-dark fw-bold text-dark">{index + 1}</td>
                    <td className="fw-bold text-dark">{item.date}</td>
                    <td className="fw-bold text-success">
                      {item.is_orderConfirm?
                      <select
                        class={
                          (item.status == "ordered" &&
                            "form-select bg-warning text-white red") ||
                          (item.status == "delivered" &&
                            "form-select green bg-danger text-white") ||
                          (item.status == "shipped" &&
                            "form-select green bg-success text-white")
                        }
                        aria-label="Default select example"
                        value={value == "" ? item.status : setvalue[item.id]}
                        onChange={(e) => {
                          settingvalue(e.target.value, item.id);
                          //   setloader(true);
                        }}
                      >
                        <option value="ordered" className="bg-white text-dark">
                          ordered
                        </option>
                        <option
                          value="delivered"
                          className="bg-white text-dark"
                        >
                          delivered
                        </option>
                        <option value="shipped" className="bg-white text-dark">
                          shipped
                        </option>
                      </select>:
                      <select disabled   class={
                        (item.status == "ordered" &&
                          "form-select  text-white red") ||
                        (item.status == "delivered" &&
                          "form-select green bg-danger text-white") ||
                        (item.status == "shipped" &&
                          "form-select green bg-success text-white")
                      }
                      aria-label="Default select example"
                      value={value == "" ? item.status : setvalue[item.id]}
                      onChange={(e) => {
                        settingvalue(e.target.value, item.id);
                        //   setloader(true);
                      }}>
                       
                      
                        <option value="ordered" className="bg-white text-dark">
                          ordered
                        </option>
                        <option
                          value="delivered"
                          className="bg-white text-dark"
                        >
                          delivered
                        </option>
                        <option value="shipped" className="bg-white text-dark">
                          shipped
                        </option>

                      </select>
                      
                      }
                    </td>
                    <td className="fw-bold text-dark">{item.name}</td>
                    <td className="fw-bold text-dark">{item.price}</td>
                    <td className="fw-bold text-dark">{item.quantity}</td>
                    <td className="fw-bold text-dark">{item.totalprice}</td>
                   
                    <td className="fw-bold text-dark">{
                     item.is_orderConfirm?
                    
                    item.paymentmethod:
                    <span className="text-danger">
failed
                    </span>
                    }</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
