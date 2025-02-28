import React from 'react'
import image from "../assets/LOGO-1.png"
import "./home.css";

export default function Footer() {
  return (
<footer className="footer-section">
        <div className="container">
            <div className="footer-padding">
                <div className="row align-items-center">
                    <div className="col-4">
                        <div className="footer-logo">
                            <img src={image} alt="" width="110"/>
                        </div>
                    </div>
                    <div className=" col-md-4">
                        <div className="footer-page">
                            <a className="nav-link text-dark" href="index.html">Home</a>
                            <a className="nav-link  text-dark" href="about.html">About</a>
                            <a className="nav-link text-dark " href="services.html">Our Services</a>
                            <a className="nav-link text-dark " href="gallery.html">Gallery</a>
                            <a className="nav-link text-dark active" href="contact.html">Contact Us</a>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer-icon-div">
                            <a href="">
                                <div className="footer-icons">
                                    <i className="bi bi-facebook"></i>
                                </div>
                            </a>
                            <a href="">
                                <div className="footer-icons">
                                    <i className="bi bi-whatsapp"></i>
                                </div>
                            </a>
                            <a href="">
                                <div className="footer-icons">
                                    <i className="bi bi-instagram"></i>
                                </div>
                            </a>
                            <a href="">
                                <div className="footer-icons">
                                    <i className="bi bi-envelope"></i>
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="footer-align mt-4">
                    <hr/>
                    <p className=" m-0">Powered by <a href="" target="_blank"
                            className="fw-bold text-theme">Shamil Sham</a></p>
                </div>
            </div>
        </div>
    </footer>

        
  )
}
