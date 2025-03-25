import React, { useEffect, useState } from "react";
import MainSidebar from "../sidebar";
import "./userauth.css";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import csrftoken from "../../../csrf";
export default function Coupen() {
  const [visible, setvisible] = useState(false);
  const [coupenvalue, setcoupenvalue] = useState("");
  const [coupendisc, setcoupendisc] = useState();
  const [valuealert, setvaluealert] = useState(false);
  const [coupen, setcoupen] = useState([]);
  const[id,setid]=useState()
  const [discvaluealert, setdiscvaluealert] = useState(false);

  const getcoupeninitally = async () => {
    const result = await fetch("http://localhost:8000/getcoupeninitally", {
      method: "GET",
    });
    const res = await result.json();
    if (res.data) {
      setcoupen(res.data);
    } else {
      setcoupen([]);
    }
  };

  const deletecoupen = async () => {
    console.log("id",id)
    const result = await fetch("http://localhost:8000/coupendelete", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body:JSON.stringify({id:id})
    });
    const res=await result.json()
    if(res.data){
        setcoupen(res.data)
        console.log("oooooooooooooooooooo")
    }
  };

  const coupenadd = async () => {
    console.log("first");
    if (coupenvalue == "") {
      console.log("first");
      setvaluealert(true);
    }
    if (coupendisc == null) {
      console.log("first");
      setdiscvaluealert(true);
    }
    if (coupenvalue != "" && coupendisc != null) {
      const result = await fetch("http://localhost:8000/coupenadd", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coupenvalue: coupenvalue,
          coupendisc: coupendisc,
        }),
      });
      const res = await result.json();
      if (res.data) {
        console.log(res.data);
        setcoupen(res.data);
        setvisible(false);
      } else {
        setcoupen([]);
      }
    }
  };
  useEffect(() => {
    getcoupeninitally();
  }, []);
  return (
    <div className="row w-100">
      <div className="col-2">
        <MainSidebar />
      </div>
      <div className="col-10">
        <div className="container">
          <div className="p-5">
            <div className="w-100 d-flex justify-content-between align-items-center main-userauth-cont">
              <div className="text-start ml-5 ">
                <i
                  class="bi bi-arrow-left-circle"
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  //   onClick={() => navigate("/adminproductpage")}
                ></i>
                <i
                  class="bi bi-arrow-right-circle text-dark ml-1"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <div className="mx-5">
                <h3 className="user-managment-heading">coupen</h3>
              </div>
            </div>
            <div className="w-100  text-end mt-5">
              <button
                className="add-coupen-btn mx-5 "
                onClick={() => setvisible(true)}
              >
                add coupen
              </button>
            </div>
            <table className="table mt-3" style={{ background: "black" }}>
              <thead className="table-heads w-100">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Coupen</th>
                  <th scope="col">discount</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              {coupen.map((item, index) => (
                <tbody key={item.id}>
                  <tr>
                    <th scope="row" style={{ verticalAlign: "middle" }}>
                      {index + 1}
                    </th>
                    <td
                      className="text-dark"
                      style={{ verticalAlign: "middle" }}
                    >
                      {item.CoupenName}
                    </td>
                    <td
                      className="text-dark"
                      style={{ verticalAlign: "middle" }}
                    >
                      {item.discount}%
                    </td>
                    <td
                      className="text-dark"
                      style={{ verticalAlign: "middle" }}
                    >
                      <button className="delete-coupen-btn"
                      onClick={()=>{
                        setid(item.id)
                        deletecoupen()
                      }}
                      
                      >delete</button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
            {visible && (
              <div
                className="modal fade show d-block"
                tabIndex="-3"
                role="dialog"
              >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title add-coupen-title-modal">
                        Add Coupon
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setvisible(false)}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form action="">
                        <div className="w-100 text-start">
                          <label htmlFor="" className="label-coupen">
                            coupen
                          </label>
                          <br />
                          <input
                            type="text"
                            className="w-100 p-2 coupen-input"
                            value={coupenvalue}
                            onChange={(event) => {
                              setcoupenvalue(event.target.value);
                              if (event.target.value != "") {
                                setvaluealert(false);
                              }
                            }}
                          />
                          {valuealert ? (
                            <p className="w-100 text-start m-0 p-0 text-danger">
                              Please enter coupen code !
                            </p>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="w-100 text-start mt-1">
                          <label htmlFor="" className="label-coupen">
                            discount
                          </label>
                          <br />
                          <input
                            type="number"
                            className="w-100 p-2 coupen-input"
                            value={coupendisc}
                            onChange={(event) => {
                              setcoupendisc(event.target.value);
                              if (event.target.value != "") {
                                setdiscvaluealert(false);
                              }
                            }}
                          />
                          {discvaluealert ? (
                            <p className="m-0 p-0 w-100 text-start text-danger">
                              Please enter discount !
                            </p>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </form>
                    </div>
                    <div className="modal-footer">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setvisible(false)}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() => coupenadd()}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
