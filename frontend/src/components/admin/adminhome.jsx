import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import "./admin.css";
import "animate.css";
import csrftoken from "../../csrf";
import image from "../../assets/in-stock.png";

export default function Adminhome() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [productcount, setproductcount] = useState(0);
  const [review, setreviewcount] = useState(0);
  const [ordercount, setordercount] = useState(0);
  const [usercount, setusercount] = useState(0);
  const [samsungproduct, setsamsungproduct] = useState(0);
  const [iphoneproduct, setiphoneproduct] = useState(0);
  const [laptopproduct, setlaptopproduct] = useState(0);

  const getadminproductcount = async () => {
    try {
      const result = await fetch("http://localhost:8000/getadminproductcount", {
        method: "GET",
      });
      const res = await result.json();
      if (res.message) {
        console.log("good");
        console.log(res.message);
        console.log("jjjj", res.review);
        setproductcount(res.message || 0);
        setreviewcount(res.review || 0);
        setordercount(res.order || 0);
        setusercount(res.userscount || 0);
        setsamsungproduct(res.samsungproduct || 0);
        setlaptopproduct(res.laptopproduct || 0);
        setiphoneproduct(res.appleproduct || 0);
      } else {
        console.log("worng");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getadminproductcount();
  }, []);

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["products", "order", "review"], // Use meaningful labels
      datasets: [
        {
          data: [productcount, ordercount, review],
          backgroundColor: [
            documentStyle.getPropertyValue("--primary-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--red-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--primary-500"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--red-400"),
          ],
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
          },
        },
      },
      responsive: true, // Ensure chart responsiveness
      maintainAspectRatio: false,
    };

    setChartData(data);
    setChartOptions(options);
  }, [productcount, review, ordercount, usercount]);

  return (
    <div className="card flex justify-content-center p-3">
      <div className="text-start dashboard-heading">
        <h2>dashbord</h2>
      </div>
      <hr />

      <div className="row">
        <div className="col-4">
          <div className="dashboard-card p-3 d-flex">
            <div className="text-start">
              <div
                className=""
                style={{
                  background: "rgb(10, 50, 109)",
                  height: "70px",
                  width: "60px",

                  borderRadius: "10px",
                }}
              >
                <div
                  className="product-dashboards"
                  style={{
                    color: "white",
                  }}
                >
                  <i class="bi bi-tag" style={{ fontSize: "23px" }}></i>
                </div>
              </div>
            </div>
            <div className="text-start mt-1 ml-3">
              <h4 className="total-products-card">Total products</h4>
              <h2 className="total-products-card">{productcount}</h2>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="dashboard-card p-3 d-flex">
            <div className="text-start">
              <div
                className=""
                style={{
                  background: "#307c32",
                  height: "70px",
                  width: "60px",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="product-dashboards"
                  style={{
                    color: "white",
                  }}
                >
                  <i class="bi bi-bag-fill" style={{ fontSize: "23px" }}></i>
                </div>
              </div>
            </div>
            <div>
              <div className="text-start mt-1 ml-3">
                <h4 className="total-products-card">orders</h4>
                <h2 className="total-products-card">{ordercount}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="dashboard-card p-3 d-flex">
            <div className="text-start">
              <div
                className=""
                style={{
                  background: "#fe0e1a",
                  height: "70px",
                  width: "60px",
                  borderRadius: "10px",
                }}
              >
                <div
                  className="product-dashboards"
                  style={{
                    color: "white",
                  }}
                >
                  <i class="bi bi-chat-heart" style={{ fontSize: "23px" }}></i>
                </div>
              </div>
            </div>
            <div className="text-start mt-1 ml-3">
              <h4 className="total-products-card">Reviews</h4>
              <h2 className="total-products-card">{review}</h2>
            </div>
          </div>
        </div>
        <div className="col-3"></div>
      </div>

      <div className="d-flex justify-content-around align-items-center">
        <div>
          <Chart
            type="pie"
            data={chartData}
            options={chartOptions}
            className="w-full md:w-30rem"
          />
        </div>
        <div className="total-users p-3">
          <div className="text-center">
            <h4 className="text-danger">overview</h4>
          </div>
          <div className="text-center d-flex justify-content-center">
            <div className="blank"></div>
          </div>
          <div className="text-start mt-3">
            <h5 className="text-success">No of users : {usercount}</h5>
          </div>
          <div className="text-start mt-3">
            <h5 className="text-success">samsung : {samsungproduct}</h5>
          </div>
          <div className="text-start mt-3">
            <h5 className="text-success">iphone : {iphoneproduct}</h5>
          </div>
          <div className="text-start mt-3">
            <h5 className="text-success">laptop : {laptopproduct}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
