import React, { useEffect, useState } from "react";
import MainSidebar from "./sidebar";
import csrftoken from "../../csrf";
import Secondloader from "../loading/secondloader";

import "./production.css";
import Categorypage from "./addProductpage/categorypage";
export default function Transfertoviewimage() {
  const [updatesection, setupdatesection] = useState(false);
  const [id, setid] = useState();
  const [value, setvalue] = useState(null);
  const [flag, setFlage] = useState(false);
  const [active, setactiveP] = useState(false)
  const goback = () => {
    console.log("first");
    window.history.back();
  };

  const deletetheimg = async () => {
    try {
      const result = await fetch("http://localhost:8000/deletetheimg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ id: id }),
      });
      const res = await result.json();
      if (res.data) {
        setcoverimage(res.data);
        setshowdialog(false);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatetheimages = async () => {
    if (value !== null) {
      setFlage(true);

      const formdata = new FormData();
      formdata.append("file", value);
      formdata.append("id", id);

      const result = await fetch("http://localhost:8000/updatetheimages", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: formdata,
      });
      const res = await result.json();
      if (res.data) {
        console.log("good");
        setcoverimage(res.data);
        setupdatesection(false);
        setvalue(null);
        setTimeout(() => {
          setFlage(false);
        }, 2000);
      } else {
        console.log("not good");
        setvalue(null);

        setTimeout(() => {
          setFlage(false);
        }, 2000);
      }
    } else {
      setactiveP(true);
    }
  };

  const [showdialog, setshowdialog] = useState(false);

  const [coverimage, setcoverimage] = useState([]);

  const getallcoveriamge = async () => {
    const result = await fetch("http://localhost:8000/getallcoveriamge", {
      method: "GET",
    });
    const res = await result.json();
    if (res.data) {
      setcoverimage(res.data);
    } else {
      console.log("hi");
    }
  };
  useEffect(() => {
    getallcoveriamge();
  }, []);

  return (
    <div className="row m-0 p-0">
      {flag && <Secondloader />}
      <div className="col-2">
        <MainSidebar />
      </div>
      <div className="col-10">
        <div className="container">
          {showdialog && (
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-dark">Confirm Deletion</h5>
                    <button
                      className="btn-close"
                      onClick={() => setshowdialog(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p className="text-dark">
                      Are you sure you want to delete this item?
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setshowdialog(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletetheimg()}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {updatesection && (
            <div className="modal fade show d-block">
              <div className="modal-dialog modal-dialog-top">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-dark">Confirm update</h5>
                    <button
                      className="btn-close"
                      onClick={() => setupdatesection(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p className="text-dark text-start">
                      Are you sure you want to{" "}
                      <span className="fw-bold">UPDATE </span> this item?
                    </p>

                    <div className="w-100  ">
                      <div className="text-start w-100">
                        <label htmlFor="" className="fw-bold text-dark">
                          file:*
                        </label>
                      </div>
                      <div className="w-100">
                        <input
                          type="file"
                          className="form-control w-100"
                          id="inputGroupFile04"
                          aria-describedby="inputGroupFileAddon04"
                          aria-label="Upload"
                          onChange={(e) => {
                            setvalue(e.target.files[0]);
                            setactiveP(false)
                          }}
                        ></input>
                      </div>
                      {active && (
                        <div>
                          <p className="text-danger text-center m-0 p-0">
                            please choose specific adreass
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setupdatesection(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => updatetheimages()}
                    >
                      update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row m-0 p-3">
            <div className="col-6 d-flex align-items-center  update-product-images">
              <i
                class="bi bi-arrow-left-circle-fill"
                onClick={() => goback()}
              ></i>
              <h3 className="ml-2 update-product-images">product images</h3>
            </div>
            <div className="col-6 text-end">
              <button className="viewimage-add--product">Add image</button>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <table className="table " style={{ background: "black" }}>
            <thead className="table-heads w-100">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {coverimage.map((item, index) => (
              <tbody key={index}>
                <tr>
                  <th scope="row" style={{ verticalAlign: "middle" }}>
                    {index + 1}
                  </th>
                  <td className="text-dark" style={{ verticalAlign: "middle" }}>
                    {item.totalname}
                  </td>
                  <td>
                    <img
                      className="image-of-cart"
                      alt=""
                      src={`http://localhost:8000/${item.image}`}
                    />
                  </td>
                  <td className="text-dark" style={{ verticalAlign: "middle" }}>
                    <button
                      className=" update-category-btn"
                      onClick={() => {
                        setupdatesection(true);
                        setid(item.id);
                      }}
                    >
                      update
                    </button>
                    <button
                      className="delete-category-btn ml-2"
                      onClick={() => {
                        setshowdialog(true);

                        setid(item.id);
                      }}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
