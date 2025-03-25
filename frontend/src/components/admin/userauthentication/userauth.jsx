import React from "react";
import MainSidebar from "../sidebar";
import "./userauth.css";
import csrftoken from "../../../csrf";
import Cookies from "universal-cookie";

import { useState, useEffect } from "react";

export default function Userauthuenticationpage() {
  const [userdetails, setuserdetails] = useState([]);
  const [visible, setvisible] = useState(false);
  const [hidden, sethidden] = useState(false);
  const [id, setid] = useState();
  const [value, setvalue] = useState();
  const cookies = new Cookies();

  const sortedusers = [...userdetails].sort(
    (item, item1) => item1.order_count - item.order_count
  );
  const getuserauthpage = async () => {
    const result = await fetch("http://localhost:8000/getuserauthpage", {
      method: "GET",
    });
    const res = await result.json();
    if (res.data) {
      console.log(res.data);
      setuserdetails(res.data);
    } else {
      console.log("wrong");
    }
  };
  const userdelete = async () => {
    const result = await fetch("http://localhost:8000/userdeletes", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const res = await result.json();
    if (res.data) {
      console.log("jiii");
      setuserdetails(res.data);
      setvisible(false);
    }
  };
  const userblock = async () => {
    try {
      console.log("hi", id);
      const result = await fetch("http://localhost:8000/userblock", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      const res = await result.json();
      if (res.data) {
        console.log("first");
        setuserdetails(res.data);
        sethidden(false);

        if (value) {
          setvalue(false);
        } else {
          cookies.remove("email");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const cancel = () => {
    setvisible(false);
    sethidden(false);
  };

  useEffect(() => {
    getuserauthpage();
  }, []);
  return (
    <>
      <div className="row w-100 m-0 p-0">
        <div className="col-2">
          <MainSidebar />
        </div>
        <div className="col-10 ">
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
                  <h3 className="user-managment-heading">user managment</h3>
                </div>
              </div>

              <div className="mt-5">
                <table class="table">
                  <thead className="headings-f-table">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">PhoneNumber</th>
                      <th scope="col">Email</th>
                      <th scope="col">Orders</th>
                      <th scope="col">Total Amount</th>
                      <th scope="col">Approve</th>
                    </tr>
                  </thead>
                  {sortedusers.map((item, index) => (
                    <tbody key={item}>
                      <tr>
                        <th scope="row" style={{ verticalAlign: "middle" }}>
                          {index + 1}
                        </th>
                        <td style={{ verticalAlign: "middle", color: "black" }}>
                          {item.name}
                        </td>
                        <td style={{ verticalAlign: "middle", color: "black" }}>
                          {item.phonenumber}
                        </td>
                        <td style={{ verticalAlign: "middle", color: "black" }}>
                          {item.email}
                        </td>
                        <td style={{ verticalAlign: "middle", color: "black" }}>
                          {item.order_count}
                        </td>
                        <td style={{ verticalAlign: "middle", color: "black" }}>
                          {item.order_totalprice}
                        </td>
                        <td>
                          {item.is_active ? (
                            <button
                              className="block-user-btn"
                              onClick={() => {
                                sethidden(true);
                                setid(item.id);
                              }}
                            >
                              <i class="bi bi-ban text-white"> Block</i>
                            </button>
                          ) : (
                            <button
                              className="blocks-user-btn"
                              onClick={() => {
                                sethidden(true);
                                setid(item.id);
                                setvalue(true);
                              }}
                            >
                              <i class="bi bi-ban text-white"> Unblock</i>
                            </button>
                          )}

                          <button
                            className="ml-1 delete-user-btn"
                            onClick={() => {
                              setvisible(true);
                              setid(item.id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>

          {visible && (
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-dark">Confirm Deletion</h5>
                    <button className="btn-close" onClick={cancel}></button>
                  </div>
                  <div className="modal-body">
                    <p className="text-dark">
                      Are you sure you want to delete the user?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={cancel}>
                      Cancel
                    </button>
                    <button className="btn btn-danger" onClick={userdelete}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {hidden && (
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    {value ? (
                      <h5 className="modal-title text-dark">UNBLOCK</h5>
                    ) : (
                      <h5 className="modal-title text-dark">BLOCK</h5>
                    )}
                    <button className="btn-close" onClick={cancel}></button>
                  </div>
                  <div className="modal-body">
                    {value ? (
                      <p className="text-dark">
                        Are you sure you want to UNBLOCK the user?
                      </p>
                    ) : (
                      <p className="text-dark">
                        Are you sure you want to BLOCK the user?
                      </p>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={cancel}>
                      Cancel
                    </button>
                    {value ? (
                      <button className="btn btn-danger" onClick={userblock}>
                        Unblock
                      </button>
                    ) : (
                      <button className="btn btn-danger" onClick={userblock}>
                        Block
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
