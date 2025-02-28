import React from "react";
import Nav2 from "../components/nav2";
import Footer from "../components/footer";
import "./whistlist.css";
import { MdDelete } from "react-icons/md";
import image from "../assets/41jOEM5KONL._SX569_.jpg";
export default function Wishlist() {
  return (
    <>
      <Nav2 />
      <section style={{ background: "#fafafa" }}>
        <div className="container">
          <div className="d-padding">
            <div className="text-start wishlist-heading mt-3">
              <h3>My whishlist (0)</h3>
            </div>
            <hr />

            <div className="row">
              <div className="col-2">
                <img src={image} alt="" className="wishlist-image" />
              </div>
              <div className="col-8">
                <div className="text-start">
                    <div>
                        <h5 className="text-dark wishlist-p-name">{"samsung"}</h5>
                    </div>
                  <div>
                    <h5 className="text-success">in stock</h5>
                  </div>
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Cupiditate eligendi magnam velit dignissimos quae
                      recusandae, doloremque numquam! Illo doloribus laudantium
                      corporis, sint ea praesentium accusamus, ipsum voluptates
                      at quae nobis!
                    </p>
                  </div>
                  <div>
                    <h6 className="wishlist-rupee">₹{78889}</h6>
                  </div>
                </div>
              </div>
              <div className="col-2 p-5">
                <div>
                  <div className="text-end">
                    <i className="wishlist-delete"><MdDelete/></i>
                  </div>
                  <div>
                    <button type="button" className="wish-list-btn">add to cart</button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
