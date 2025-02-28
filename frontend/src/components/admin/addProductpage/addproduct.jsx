import React from "react";
import MainSidebar from "../sidebar";
import "./addproduct.css";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import csrftoken from "../../../csrf";

import { MdDelete } from "react-icons/md";
export default function Addproducts() {
  const [item, setitem] = useState("");
  const [image, setupdateimage] = useState(null);
  const[description,setdescription]=useState('')

  const [input, setinput] = useState([]);

  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [discount, setDiscount] = useState();
  const [stock, setStock] = useState();
  const addTheproduct = async () => {
   
    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("discount", discount);
    formdata.append("stock", stock);
    formdata.append("image", image);
    formdata.append("category", item);
    formdata.append("description",description);

    input.forEach((item) => {
      if (item.file) {
        formdata.append("otherimage", item.file);
      }
    });

    const res = await fetch("http://localhost:8000/productAdds", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
      },

      body: formdata,
    });
    const result = await res.json();
    if (result.message) {
      console.log("good");
    } else {
      console.log("soemthig went wrong");
    }
  };

  const generateId = () => Date.now() + Math.random().toString(36).substring(2);
  const handle = (e) => {
    e.preventDefault();
    const filteredFiles = input.filter((file) => file !== null);
    console.log("Final files:", filteredFiles);
  };

  const deletes = (id) => {
    setinput((prev) => prev.filter((item) => item.id !== id));
  };

  const count = (e) => {
    e.preventDefault();
    setinput((prev) => [...prev, { id: generateId(), file: null }]);
  };

  const handleFileChange = (event, id) => {
    const selectedFile = event.target.files[0];
    setinput((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, file: selectedFile } : item
      )
    );
  };

  return (
    <>
      <section className="w-100" style={{ background: "#eeeeee" }}>
        <div className="container">
          <div className="c-padding">
            <div style={{ borderRadius: "45px", background: "#eeeeee" }}>
              <div className="product-details-heading w-100">
                <h3>product details</h3>
              </div>

              <form
                action=""
                className="add-product-form-submit p-5"
                onSubmit={handle}
              >
                <div
                  className="w-100 d-flex justify-content-center"
                  style={{ gap: "10px" }}
                >
                  <div class="form-floating mb-3 w-25">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      id="floatingInput"
                      placeholder="name"
                      name="name"
                      onChange={(event) => {
                        setname(event.target.value);
                      }}
                    />
                    <label for="floatingInput">Product Name</label>
                  </div>
                  <div class="form-floating mb-3 w-25">
                    <input
                      type="number"
                      class="form-control"
                      id="floatingInput"
                      placeholder="price"
                      name="price"
                      onChange={(event) => {
                        setprice(event.target.value);
                      }}
                    />
                    <label for="floatingInput">Price</label>
                  </div>
              
                  </div>

                  <div
                    className="w-100 d-flex mt-3 justify-content-center"
                    style={{ gap: "10px" }}
                  >
                    <div class="form-floating mb-3 w-25">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInput"
                        placeholder="name"
                        name="discount"
                        onChange={(event) => {
                          setDiscount(event.target.value);
                        }}
                      />
                      <label for="floatingInput">Discount</label>
                    </div>
                    <div class="form-floating mb-3 w-25">
                      <input
                        type="number"
                        class="form-control"
                        id="floatingInput"
                        placeholder="price"
                        name="stock"
                        onChange={(event) => {
                          setStock(event.target.value);
                        }}
                      />
                      <label for="floatingInput">stock</label>
                    </div>
                  </div>

                  <div class="form-floating d-flex justify-content-center w-100">
                    <div className="w-50">
                      <label for="floatingTextarea2" className="">
                        description
                      </label>

                      <textarea
                        class="form-control "
                        placeholder=""
                        id="floatingTextarea2"
                        onChange={(event)=>{
                          setdescription(event.target.value)}}
                      ></textarea>
                    </div>
                  </div>

                  <div
                    className="w-100 mt-5 d-flex justify-content-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        marginLeft: "14px",
                        marginBottom: "10px",
                        textTransform: "capitalize",
                      }}
                    >
                      <label htmlFor="" className="text-center">
                        cover image
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <div className="image-cover-input input-group mb-3 ">
                        <input
                          type="file"
                          class=" form-control"
                          id="inputGroupFile02"
                          onChange={(event) =>
                            setupdateimage(event.target.files[0])
                          }
                        />
                      </div>
                      <div className="ms-3">
                      <button
                        className="add-product-add-more-btn"
                        type="button"
                        onClick={(e) => count(e)}
                      >
                        add more
                      </button>
                    </div>
                    </div>

                   
                  </div>
              

                {input.length > 0 ? (
                  input.map((item, index) => (
                    <div
                      key={item.id}
                      className="mt-3 w-100  d-flex justify-content-center"
                    >
                      <div className="remove-input-image">
                        <input
                          type="file"
                          class="form-control w-100"
                          id={`file-${item.id}`}
                          onChange={(event) => handleFileChange(event, item.id)}
                        />
                      </div>
                      <div className="ms-3">
                        <button
                          className="add-product-add-more-btn1"
                          onClick={() => deletes(item.id)}
                        >
                          remove 
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div></div>
                )}
                <div className="d-flex justify-content-center w-100">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      {item == "" ? " category" : item}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setitem("samsung")}>
                        samsung
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setitem("laptop")}>
                        laptop
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setitem("iphone")}>
                        iphone
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="add-products-btn-submit w-100">
                  <div className="w-100 mt-5">
                    <button onClick={addTheproduct}>add product</button>
                  </div>
                </div>



              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
