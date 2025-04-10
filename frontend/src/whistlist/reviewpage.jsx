import React, { useEffect } from "react";
import MainSidebar from "../components/admin/sidebar";
import "./whistlist.css";
import { useState } from "react";
import csrftoken from "../csrf";
import image from "../assets/41jOEM5KONL._SX569_.jpg";
export default function Reviewpage() {
  const [count, setcount] = useState(0);
  const [totalstar, setstar] = useState(0);
  const [details, setdetails] = useState([]);
  const [deleteid, setdeleteid] = useState();
  const [product_id, setproduct_id] = useState();

  const deleteReview = async () => {
    const result = await fetch("http://localhost:8000/deleteReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ id: deleteid,product_id:product_id}),
    });
    const res=await result.json()
    if(res.data){
      setdetails(res.data)
    }
  };

  const gettotalreview = async () => {
    const result = await fetch("http://localhost:8000/gettotalreview", {
      method: "GET",
    });
    const res = await result.json();

    if (res.data) {
      console.log(res.data);
      setcount(res.data.count);
      setstar(res.data.total);
    } else {
      setcount(0);
    }
  };
  const getallusers = async () => {
    const result = await fetch("http://localhost:8000/getallusers", {
      method: "GET",
    });
    const res = await result.json();
    if (res.data) {
      console.log("jjjj", res.data);
      setdetails(res.data);
    }
  };

  useEffect(() => {
    gettotalreview();
    getallusers();
  }, []);

  var date = new Date();
  var ourdate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  return (
    <>
      <div className="row m-0 p-0">
        <div className="col-2">
          <MainSidebar />
        </div>
        <div className="col-10">
          <div className="container">
            <div className="reviews-heading text-start mt-3 p-3 d-flex justify-content-between align-items-center">
              <div>
                <h2>Reviews</h2>
              </div>
              <div className="calender-back d-flex align-items-center ml-5 p-2">
                <h6>March 2025 - february 2025</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <div className="review-card-1 p-3">
                  <h6 className="review-card-1-heading text-start">
                    total reviews
                  </h6>
                  <h6 className="count-reviews text-start">{count}</h6>
                </div>
              </div>
              <div className="col-2 ml-2">
                <div className="review-card-2 p-3">
                  <h6 className="review-card-1-heading text-start">
                    Average Rating
                  </h6>
                  <div className="d-flex align-items-center">
                    <div>
                      <h6 className="count-reviews m-0 p-0">{totalstar}</h6>
                    </div>
                    <div className="ml-2 star-review">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={
                            i < totalstar
                              ? "bi bi-star-fill text-warning"
                              : "bi bi-star text-warning"
                          }
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
            <div className="row justify-content-center align-items-center">
              {details.map((item, index) => (
                <div
                  className="col-6 review-p-image d-flex align-items-center"
                  key={index}
                >
                  <div className="w-25">
                    <img
                      src={`http://127.0.0.1:8000/${item.image}`}
                      alt=""
                      className="image-of-review w-100"
                    />
                  </div>
                  <div className="d-flex justify-content-between align-items-center w-75 p-3">
                    <div className="review-page-heading text-start mt-3 ml-1">
                      <h6>{item.name}</h6>
                      <h6>Total Spend:$ {item.totalprice}</h6>
                      <h6>Total Review: {item.totalcount}</h6>
                    </div>
                    <div className="review-page-second-stars text-start ">
                      <div>
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={
                              i < item.stars
                                ? "bi bi-star-fill text-warning"
                                : "bi bi-star text-warning"
                            }
                          ></i>
                        ))}
                        <span className="ml-2 fw-bold text-dark">
                          {" "}
                          {item.date}
                        </span>
                      </div>
                      <div className="mt-1 d-flex">
                        <div>
                          <button className="replay-bt">Replay</button>
                        </div>
                        <div className="ml-3 d-flex align-items-center justify-content-center delete-dicv">
                          <i
                            className="bi bi-trash3-fill delete-review"
                            onClick={() => {
                              setdeleteid(item.user_id);
                              setproduct_id(item.product_id);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
        </div>
        {
          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title text-dark" id="staticBackdropLabel">
                    DELETE
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body text-dark">Are you sure?</div>
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
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={() => deleteReview()}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}
