import React, { useEffect, useRef } from "react";
import Mainsidebar from "./sidebar";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { GiExitDoor } from "react-icons/gi";
import "./production.css";
import { useLocation } from "react-router-dom";
import csrftoken from "../../csrf";
import { useNavigate } from "react-router-dom";

export default function Updatepage() {
  const [productdetails, setproductdetails] = useState({});
  const [input, setinput] = useState([]);
  const generateId = () => Date.now() + Math.random().toString(36).substring(2);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);
  const loaction = useLocation();
  const navigate = useNavigate();
  const [productname, setproductname] = useState("");
  const [updateimage, setupdateimage] = useState(null);
  const [updateprice, setupdateprice] = useState("");
  const [updatestock, setupdatestock] = useState("");
  const [updatediscount, setdiscount] = useState("");
  const [description, setdescription] = useState("");

  const [selectedItem, setSelectedItem] = useState("");
  const items = [
    { name: "samsung", value: "samsung" },
    { name: "iphone", value: "iphone" },
    { name: "laptop", value: "laptop" },
  ];
  const idobject = loaction.state || {};
  const id = idobject.id;
  const handleChange = (e, reference) => {
    if (e.key === "Enter") {
      reference.current.focus();
    }
  };
  const update = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();

      formdata.append("productname", productname);
      formdata.append("id", id);
      formdata.append("updatediscount", updatediscount);
      formdata.append("updateimage", updateimage);
      formdata.append("updatestock", updatestock);
      formdata.append("updateprice", updateprice);
      formdata.append("selectedItem", selectedItem);
      formdata.append("description", description);

      input.forEach((item) => {
        if (item.file) {
          formdata.append("otherimage", item.file);
        }
      });

      const res = await fetch("http://localhost:8000/updates", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: formdata,
      });

      const result = await res.json();

      if (result.message) {
        navigate("/ProductsSection");
      } else if (result.error) {
        console.log("errrrrrror");
      } else {
        console.log("nodataaaaaaa");
      }
    } catch (error) {
      console.log("error", error);
    }
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
  const deletes = (id) => {
    setinput((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const getproductfirst = async () => {
      const res = await fetch("http://localhost:8000/getproductfirst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({ id: id }),
      });
      const result = await res.json();
      if (result.data) {
        console.log(result.data);
        setproductdetails(result.data);

        setproductname(result.data.name || "");
        setdiscount(result.data.discount || "");
        setupdateprice(result.data.price || "");
        setupdatestock(result.data.stock_count || "");
        setSelectedItem(result.data.category || "");
        setdescription(result.data.description || "");
      }
    };

    getproductfirst();
  }, [id]);

  return (
    <>
      <div className="row">
        <div className="col-2">
          <Mainsidebar />
        </div>
        <div className="col-10">
          <div className="">
            <div className="upadate-heading-section d-flex align-items-center justify-content-between w-100">
              <div className="update-heading">Update</div>
              <div className="GiExitDoor">
                <span>goback</span>
                <span className="GiExit">
                  <GiExitDoor style={{ marginTop: "-5px" }} />
                </span>
              </div>
            </div>
            <hr />
            <div className="update-form-section">
              <div
                className="top w-100"
                style={{ backgroundColor: "rgb(68, 10, 10)" }}
              ></div>
              <div className="update-form-top">
                <form action="">
                  <div className="update-form row">
                    <div className="col-6">
                      <div className="right-side-form mb-3">
                        <label className="form-label update-name">
                          {" "}
                          Product name <span>*</span>
                        </label>
                        <input
                          type="name"
                          class="form-control"
                          ref={input1Ref}
                          value={productname}
                          onKeyDown={(e) => handleChange(e, input2Ref)}
                          onChange={(event) =>
                            setproductname(event.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div class="right-side-form mb-3">
                        <label class="form-label update-price">
                          Price <span>*</span>
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          ref={input2Ref}
                          value={updateprice}
                          onKeyDown={(e) => handleChange(e, input3Ref)}
                          onChange={(e) =>
                            setupdateprice(parseInt(e.target.value))
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="update-form row">
                    <div className="col-6">
                      <div className="right-side-form mb-3">
                        <label className="form-label stock-update">
                          {" "}
                          Stock <span>*</span>
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          value={updatestock}
                          ref={input3Ref}
                          onKeyDown={(e) => handleChange(e, input4Ref)}
                          onChange={(e) =>
                            setupdatestock(parseInt(e.target.value))
                          }
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div class="mb-3">
                        <label class="form-label update-discount">
                          Discount <span>*</span>
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          value={updatediscount}
                          ref={input4Ref}
                          onKeyDown={(e) => handleChange(e, input5Ref)}
                          onChange={(e) =>
                            setdiscount(parseFloat(e.target.value))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-100" style={{ paddingInline: "10px" }}>
                    <div class="form-floating">
                      <textarea
                        className="update-description form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea"
                        ref={input5Ref}
                        value={description}
                        onKeyDown={(e) => handleChange(e, input6Ref)}
                        onChange={(e) => setdescription(e.target.value)}
                      ></textarea>
                      <label for="floatingTextarea">Description</label>
                    </div>
                  </div>

                  <div
                    className="row justify-content-center mt-3"
                    style={{
                      width: "80%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    <div className="col-4">
                      <div className="card flex justify-content-center">
                        <Dropdown
                          value={selectedItem}
                          onChange={(e) => setSelectedItem(e.value)}
                          options={items}
                          ref={input6Ref}
                          placeholder=" Select category"
                          className="w-100"
                          optionLabel="name"
                          style={{ height: "51px", color: "rgb(68, 10, 10);" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-100"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  >
                    <div className="w-100 d-flex justify-content-center">
                      <div class="input-group w-50">
                        <input
                          type="file"
                          class="form-control"
                          id="inputGroupFile04"
                          aria-describedby="inputGroupFileAddon04"
                          aria-label="Upload"
                          style={{ border: "none" }}
                          onChange={(e) => setupdateimage(e.target.files[0])}
                        />
                      </div>
                      <div className=" ms-3 addmore-update-page-btn">
                        <button type="button" onClick={(e) => count(e)}>
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
                            onChange={(event) =>
                              handleFileChange(event, item.id)
                            }
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
                    <div>no daaaaa</div>
                  )}

                  <div
                    className="row justify-content-center align-items-center"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                  >
                    <div className="col-12">
                      <button
                        type="button"
                        className="update-btn"
                        onClick={update}
                      >
                        update
                      </button>
                    </div>
                  </div>
                  <div></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
