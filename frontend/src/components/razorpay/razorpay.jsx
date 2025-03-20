import React, { useEffect } from "react";

const PaymentComponent = () => {



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
      amount: amount * 100,
      currency: "INR",
      name: "Hive AI",
      description: "Premium Subscription",
      handler: function (response) {
        console.log("Payment ID:", response.razorpay_payment_id);
      },
      prefill: {
        name: "Shamil",
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
  


  return ( 
    <div>
      <h1>Payment Page</h1>

      <button onClick={onRazerPay(100)}>Pay Now</button>
    </div>
  );
};

export default PaymentComponent;
