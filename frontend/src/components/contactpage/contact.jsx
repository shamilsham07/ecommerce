import React from "react";
import Nav2 from "../nav2";
import { useState } from "react";
import { useRef } from "react";
import csrftoken from "../../csrf";
import "./contact.css";

import Footer from "../footer";
import image1 from "../../assets/closeup-businessmen-using-mobile-phone.jpg";
import validator from "validator";
import Loading from "../loading/loading";


export default function ContactPage() {
  const input1ref = useRef(null);
  const input2ref = useRef(null);
  const input3ref = useRef(null);
  const input4ref = useRef(null);
  const input5ref = useRef(null);
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [message, setmessage] = useState("");
  const [email, setemail] = useState("");
  const [phone, setPhone] = useState();

  const [loader, setLoading] = useState(false);

  const clearFunction = () => {
    setPhone("");
    setemail("");
    setfirstname("");
    setlastname("");
    setmessage("");
  };

  const submit = async (e) => {
    if (
      email == "" &&
      phone == "" &&
      firstname == "" &&
      lastname == "" &&
      message == ""
    ) {
      if (email == "") {
        setEmailerror("Enter valid Email!");
      }
      if (phone == "") {
        setPhoneerror("Enter valid Number!");
      }
    }
    if (
      email != "" &&
      phone != "" &&
      firstname != "" &&
      lastname != "" &&
      message != ""
    ) {
      const phones=parseInt(phone)
      
      setLoading(true);

      const result = await fetch("http://localhost:8000/contactdetails", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          phone: phones,
          message: message,
          firstname: firstname,
          lastname: lastname,
        }),
      });
      const res=await result.json()

      if (res.message) {
      
       
        setLoading(false);
   
      }
      if(res.error){
      
      }
    }
  };
  const handlekeydown = (e) => {
    if (
      email == "" &&
      phone == "" &&
      firstname == "" &&
      lastname == "" &&
      message == ""
    ) {
      if (email == "") {
        setEmailerror("Enter valid Email!");
      }
      if (phone == "") {
        setPhoneerror("Enter valid Number!");
      }
    }
    if (
      email != "" &&
      phone != "" &&
      firstname != "" &&
      lastname != "" &&
      message != ""
    ) {
      if (e.key == "Enter") submit(e);
    }
  };

  const [emailError, setEmailerror] = useState("");
  const [phoneerror, setPhoneerror] = useState("");

  const handlemove = (e, ref) => {
    if (e.key == "Enter") {
      ref.current.focus();
    }
  };

  const validateEmail = (e) => {
    const emailvalue = e.target.value;
    setemail(emailvalue);

    if (validator.isEmail(emailvalue)) {
      setEmailerror("");
    } else {
      setEmailerror("Enter valid Email!");
     
    }
  };
  const validatePhone = (e) => {
    const valuephone = e.target.value;
    setPhone(valuephone);
    // parseInt(phone)
    if (valuephone.length > 10) {
      setPhoneerror("");
    } else {
      setPhoneerror("Enter valid Number!");
    }
  };

  return (
    <>
      <Nav2 />
      <section
        className="contact-us-image"
        style={{
          backgroundImage: `url(${image1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="contact-us-heading-div">
          <div>
            <h3 className=""> contact us</h3>
          </div>
          <div>
            <h5 className="">get in touch</h5>
          </div>
        </div>
      </section>

      {loader ? (
        <Loading />
      ) : (
        <section style={{ backgroundColor: "#fafafa" }}>
          <div className="container">
            <div className="row">
              <div className="col-5">
                <div className="left-contact-page p-5">
                  <div className="left-contact-page-heading mt-5">
                    <h2 className="text-start"> Contact Us</h2>
                  </div>
                  <div>
                    <p className="text-start text-white p-5">
                      If you have any questions or need assistance, feel free to
                      contact us. We're here to help and eager to provide you
                      with the support you need. Whether you're seeking product
                      information, assistance with an order, or simply want to
                      learn more about our services, our team is ready to assist
                      you promptly and efficiently.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-7">
                <div className="p-5">
                  <div>
                    <h4 className="contact-right-side-heading text-start">
                      {" "}
                      get in touch with us
                    </h4>
                  </div>
                  <div>
                    <h6 className="contact-right-side-sub-heading text-start">
                      and we will get back to you
                    </h6>
                  </div>
                  <div className="blank-content"></div>

                  <form
                    action=""
                    className="contact-form-input"
                    onSubmit={(e) => submit(e)}
                  >
                    <div className="row w-100">
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name"
                            name="name"
                            ref={input1ref}
                            onChange={(e) => setfirstname(e.target.value)}
                            onKeyDown={(e, ref) => handlemove(e, input2ref)}
                          />
                          <label for="floatingInput">First Name</label>
                        </div>
                      </div>
                      <div className="col-6">
                        <div class="form-floating mb-3">
                          <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            name="name"
                            placeholder="name"
                            ref={input2ref}
                            onChange={(e) => setlastname(e.target.value)}
                            onKeyDown={(e, ref) => handlemove(e, input3ref)}
                          />
                          <label for="floatingInput">Last Name</label>
                        </div>
                      </div>
                    </div>
                    <div className="row w-100">
                      <div className="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="email"
                            class="form-control"
                            id="floatingInput"
                            name="email"
                            placeholder="name@example.com"
                            onChange={(e) => validateEmail(e)}
                            ref={input3ref}
                            onKeyDown={(e, ref) => handlemove(e, input4ref)}
                          />
                          <label for="floatingInput">Email address</label>
                        </div>
                      </div>
                    </div>
                    <div className="w-100">
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {emailError}
                      </span>
                    </div>
                    <div className="row w-100">
                      <div className="col-12">
                        <div class="form-floating mb-3">
                          <input
                            type="number"
                            class="form-control"
                            id="floatingInput"
                            placeholder="phone number"
                            name="number"
                            onChange={(e) => validatePhone(e)}
                            ref={input4ref}
                            onKeyDown={(e, ref) => handlemove(e, input5ref)}
                          />
                          <label for="floatingInput">Phone Number</label>
                        </div>
                      </div>
                    </div>
                    <div className="w-100">
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "red",
                        }}
                      >
                        {phoneerror}
                      </span>
                    </div>

                    <div className="row w-100">
                      <div className="col-12">
                        <div class="form-floating">
                          <textarea
                            class="form-control"
                            placeholder="Leave a comment here"
                            id="floatingTextarea"
                            ref={input5ref}
                            onChange={(e) => setmessage(e.target.value)}
                            onKeyDown={handlekeydown}
                          ></textarea>
                          <label for="floatingTextarea">Message</label>
                        </div>
                      </div>
                    </div>
                    <div className="text-start">
                      <button
                        className="contact-submit-form"
                        type="button"
                        onClick={submit}
                      >
                        {" "}
                        submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
