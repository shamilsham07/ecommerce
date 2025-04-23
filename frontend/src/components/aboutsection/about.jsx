import React from "react";
import Nav2 from "../nav2";
import Footer from "../footer";
import { useRef } from "react";
import "./about.css";
import background from "../../assets/html-css-collage-concept-with-person.jpg";
import image from "../../assets/business-people-are-brainstorming.jpg";
import second from "../../assets/m3-macbook-air-blue-removebg-preview.png";
import { useNavigate } from "react-router-dom";

export default function About() {
  const btnref = useRef(null);
  const navigation = useNavigate("");
  const sethome = () => {
    if (btnref.current) {
      btnref.current.style.boxShadow = "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px";
      btnref.current.style.borderRadius = "5px";
      const buttons = document.getElementsByClassName("about-us-btn");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "transparent";
        buttons[i].style.boxShadow = "none";
      }
    }
    setTimeout(() => {
      navigation("/");
    }, 1000);
  };

  return (
    <>
      <Nav2 />
      <section className="w-100">
        <div className="container">
          <div className="d-padding">
            <div className="p-5">
              <div className="" style={{}}>
                <h1 className="about-us-heading">About Us</h1>
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  gap: "10px",
                }}
              >
                <div className="about-home-btn">
                  <button onClick={sethome} ref={btnref}>
                    home
                  </button>
                </div>
                <div className="blank-content-about"></div>
                <div>
                  <button className="about-us-btn">about us</button>
                </div>
              </div>

              <div className="grid mt-3">
                <div className="col-12 lg:col-6">
                  <div className="about-image-first-page">
                    <img src={background} alt="" />
                  </div>
                </div>
                <div className="col-12 lg:col-6 ">
                  <div className="p-3">
                    <h3 className="heaidng-about-section1">
                      Welcome to{" "}
                      <span style={{ color: " #154373" }}>PHONECART</span>{" "}
                 <br />
                      Your Ultimate Destination
                    </h3>
                    <p className="sub-content-about-first">
                      At PHONECART, we specialize in offering the latest and
                      most advanced gadgets to enhance your lifestyle. From
                      cutting-edge smartphones and smartwatches to
                      high-performance accessories and tech essentials, we bring
                      you a curated selection of top-quality products at
                      competitive prices.
                    </p>
                  </div>
                  <div className="text-center w-100 d-flex justify-content-center align-items-center mt-4">
                    <div className="null-content"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "  #154373" }}>
        <div className="d-padding">
          <div className="container">
            <div
              className="text-center d-flex justify-content-center align-items-center"
              style={{
                flexDirection: "column",
              }}
            >
              <h3 className="overview-about">overview</h3>
              <p className="text-center overview-about-sub">
                PHONECART is a trusted online retailer specializing in
                high-quality gadgets and tech accessories. We offer a carefully
                curated selection of the latest smartphones, smartwatches, audio
                devices, and other innovative tech products at competitive
                prices. Our platform is designed to provide a seamless, secure,
                and enjoyable shopping experience, ensuring customer
                satisfaction at every step. With a strong commitment to quality,
                affordability, and customer service, PHONECART aims to be a
                leading name in the world of online gadget shopping. Whether
                you're a tech enthusiast or simply looking for the best devices
                to complement your lifestyle, we have something for everyone.
                Explore our collection today and experience the convenience of
                shopping with PHONECART!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="d-padding">
          <div
            className="grid"
            style={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <div className="col-12 order-1 lg:col-6 order-lg-0">
              <div>
                <div className="text-start p-5 mission-div">
                  <h3 className="our-mission-about">our mission</h3>
                  <p className="mission-p-tag">
                    At PHONECART, our mission is to make cutting-edge technology
                    accessible to everyone by offering high-quality gadgets and
                    accessories at competitive prices. We are dedicated to
                    providing a seamless, secure, and customer-centric shopping
                    experience that prioritizes trust, convenience, and
                    satisfaction. Through our carefully curated selection of the
                    latest smartphones, smartwatches, audio devices,
                  </p>
                </div>
                <div className="d-flex justify-content-center">
                <div className="null-contents">

                </div>

                </div>
                <div className="text-start p-5 mission-div">
                  <h3 className="our-mission-about">our vision</h3>
                  <p className="mission-p-tag">
                    At PHONECART, we strive to be your go-to destination for
                    high-quality gadgets and tech accessories. Our mission is to
                    provide a seamless, secure, and enjoyable shopping
                    experience, offering a carefully curated selection of the
                    latest smartphones, smartwatches, audio devices, and
                    more—all at competitive prices.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 order-0 lg:col-6 order-lg-1">
              <img src={image} alt="" className="image-about-second" />
            </div>
          </div>
        </div>
      </section>
      <section
        className=""
        style={{
          background: "#fafafa",
        }}
      >
        <div className="row w-100">
          <div className="col-6">
            <div className="w-100">
              <img src={second} alt="" className="second-about-img" />
            </div>
          </div>
          <div className="col-6">
            <div className="p-5 third-page-about-page">
              <h3 className="third-page-about">
                we are always ready to help you
              </h3>
              <button
                className="get-started-button"
                onClick={() => navigation("/")}
              >
                get started
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
