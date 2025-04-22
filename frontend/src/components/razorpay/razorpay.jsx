import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import csrftoken from "../../csrf";
import { useNavigate } from "react-router-dom";

const PaymentComponent = () => {
  const [name, setname] = useState("");
  const generateorderid = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    const randomorderid = `order_${timestamp}${random}`;
    console.log(randomorderid);
    return randomorderid;
  };
  const navigation = useNavigate("");

  const successpayment = async (response, order_id) => {
    try {
      console.log("theresponse", response);
      const result = await fetch("http://localhost:8000/successpayment", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          payment_id: response.razorpay_payment_id,
          order_id: order_id,
        }),
      });
      const res = await result.json();
      if (res.message) {
        console.log("inta ponno");
        navigation("/");
      } else {
        console.log("something happend");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const { id } = useParams();
  const [price, setprice] = useState(0);

  const getrazordetails = async () => {
    const result = await fetch("http://localhost:8000/getrazordetails", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const res = await result.json();
    console.log("goog", res.data);
    setprice(res.data.totalprice);
    setname(res.data.name);
  };

  useEffect(() => {
    console.log("tthe", id);
    getrazordetails();
  }, []);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onRazerPay = async (amount) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      console.log("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: "rzp_test_ehMro1piDK3Rjk",
      amount: price * 100,
      currency: "INR",
      name: "phone cart",
      description: "Premium Subscription",
      handler: function (response) {
        console.log("Payment ID:", response.razorpay_payment_id);
        const order_id = generateorderid();
        successpayment(response, order_id);
      },
      prefill: {
        name: name,
        email: "sdfsdfsdf",
        contact: "sdfsdfdsf",
      },
      notes: {
        address: "address",
      },
      theme: {
        color: "#1a202b",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

 useEffect(()=>{
if(price){
  onRazerPay(price)
}
 },[price])
};

export default PaymentComponent;
