// import React from "react";
// import "./cartpage.css";
// import Nav2 from "../nav2";
// import image from "../../assets/41jOEM5KONL._SX569_.jpg";

// export default function Deliveryadreass() {
//   return (
//     <>
//       <div style={{ background: "#fafafa" }}>
//         <Nav2 />
//         <div className="container">
//           <div className="d-padding">
//             <div className="row m-0 p-0 mt-5 ">
//               <div
//                 className="col-8  mt-5 m-0 p-0"
//                 style={{
//                   backgroundColor: "#e6e6e6",
//                 }}
//               >
//                 <div className="deliver-adreass-div-back w-100 text-start align-items-center justify-content-center">
//                   <h3 className="ml-2">Delivery address</h3>
//                 </div>
//                 <div className="row">
//                   <div className="col-9 p-3 ml-3">
//                     <div className="">
//                       <div className="text-start home-delivery-addreass">
//                         <h6>home</h6>
//                       </div>
//                     </div>
//                     <div className="w-100 text-start home-delivery-addreass-name ">
//                       <h5>
//                         shamil mt,<span>8156971351</span>
//                       </h5>
//                     </div>
//                     <div className="w-100 text-start home-delivery-addreass-name ">
//                       <h5>
//                         moorkath House,karippol,valenchery
//                         <span className="fw-bold">-81569</span>
//                       </h5>
//                     </div>
//                   </div>
//                   <div className="col-2 d-flex justify-content-center align-items-center">
//                     <div className="deliver-here-btn">
//                       <button> deliver here</button>
//                     </div>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="row">
//                   <div className="col-9 p-3 ml-3">
//                     <div className="">
//                       <div className="text-start home-delivery-addreass">
//                         <h6>home</h6>
//                       </div>
//                     </div>
//                     <div className="w-100 text-start home-delivery-addreass-name ">
//                       <h5>
//                         shamil mt,<span>8156971351</span>
//                       </h5>
//                     </div>
//                     <div className="w-100 text-start home-delivery-addreass-name ">
//                       <h5>
//                         moorkath House,karippol,valenchery
//                         <span className="fw-bold">-81569</span>
//                       </h5>
//                     </div>
//                   </div>
//                   <div className="col-2 d-flex justify-content-center align-items-center">
//                     <div className="deliver-here-btn">
//                       <button> deliver here</button>
//                     </div>
//                   </div>
//                 </div>
//                 <hr />
//                 <div className="w-100 text-start ml-1 d-flex align-items center">
//                   <div className="mb-2 ml-2">
//                     <button className="addreass-here-btns"onClick={AddnewAddreass}> add adreass</button>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className="col-3 mt-5 ml-4 m-0 p-0"
//                 style={{ backgroundColor: "#e6e6e6" }}
//               >
//                 <div>
//                   <div className="w-100 price-details text-start deliver-adreass-div-back">
//                     <h3 className="ml-2">price details</h3>
//                   </div>
//                   <div className="row m-0 p-3 mt-3">
//                     <div className="col-6 text-start">
//                       <h6 className="price-details-price">price</h6>
//                     </div>
//                     <div className="col-6 text-end">
//                       <h6 className="price-details-prices">2000</h6>
//                     </div>
//                     <div className="col-6 text-start">
//                       <h6 className="price-details-price">quantity</h6>
//                     </div>
//                     <div className="col-6 text-end">
//                       <h6 className="price-details-prices">2</h6>
//                     </div>
//                     <div className="col-12 text-start price-details-prices text-success fw-bold">
//                       in Stock
//                     </div>
//                     <hr className="mt-3" />
//                     <div className="col-6 text-start">
//                       <h6 className="price-details-price">total payable</h6>
//                     </div>
//                     <div className="col-6 text-end">
//                       <h6 className="price-details-prices">200000</h6>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-8 m-0 p-0 mt-3">
//                 <div className="w-100 price-details text-start deliver-adreass-div-back">
//                   <h3 className="ml-2">order summary</h3>
//                 </div>
//                 <div className="row m-0 p-0 mt-2">
//                   <div className="col-2">
//                     <img src={image} alt="" className="delivery-page-img" />
//                   </div>
//                   <div className="col-9">
//                     <div className=" text-start">
//                       <h6 className="price-details-price">Samsung</h6>
//                     </div>
//                     <div className=" text-start">
//                       <h6 className="price-details-pricez fw-bold">promo code</h6>
//                     </div>
//                     <div className="text-start">
//                  <input type="text" className="promo-code-inp" placeholder="Enter your code" />
//                  <button className="promo-code-apply">apply</button>
//                  <div className="mt-2">
//                  <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="flexRadioDefault"
//                           id="flexRadioDefault1"
//                           value="COD"
//                           defaultChecked
//                         //   checked={PaymentMethod === "COD"}
//                         //   onChange={(e) => setpaymentMethod(e.target.value)}
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor="flexRadioDefault1"
//                         >
//                           COD
//                         </label>
//                       </div>
//                       <div className="form-check">
//                         <input
//                           className="form-check-input"
//                           type="radio"
//                           name="flexRadioDefault"
//                           id="flexRadioDefault2"
//                           value="RAZER PAY"
//                         //   checked={PaymentMethod === "RAZER PAY"}
//                         //   onChange={(e) => setpaymentMethod(e.target.value)}
//                         />
//                         <label
//                           className="form-check-label"
//                           htmlFor="flexRadioDefault2"
//                         >
//                           Razer Pay
//                         </label>
//                       </div>
//                       <div className="order-summary-btn text-start mt-3">
//                         <button >buy</button>
//                       </div>
//                     </div>

//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
