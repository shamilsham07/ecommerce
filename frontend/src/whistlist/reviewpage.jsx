import React from "react";
import MainSidebar from "../components/admin/sidebar";
import "./whistlist.css";
export default function Reviewpage() {
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
                  <h6 className="count-reviews text-start">7000</h6>
                </div>
              </div>
              <div className="col-2 ml-2">
                <div className="review-card-2 p-3">
                  <h6 className="review-card-1-heading text-start">
                    Average Rating
                  </h6>
                  <div className="d-flex align-items-center">
                    <div>
                      <h6 className="count-reviews m-0 p-0">4.0</h6>
                    </div>
                    <div className="ml-2 star-review">
                      <i class="bi bi-star m-0 p-0"></i>
                      <i class="bi bi-star"></i>
                      <i class="bi bi-star"></i>
                      <i class="bi bi-star"></i>
                      <i class="bi bi-star"></i>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
