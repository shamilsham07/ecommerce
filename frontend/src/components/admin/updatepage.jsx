import React, { useEffect, useRef } from "react";
import Mainsidebar from "./sidebar";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { GiExitDoor } from "react-icons/gi";
import "./production.css";
import { useLocation } from "react-router-dom";
import csrftoken from "../../csrf";
import image from "../../assets/41jOEM5KONL._SX569_.jpg";
import { useNavigate } from "react-router-dom";

export default function Updatepage() {
  const [productdetails, setproductdetails] = useState({});
  const [input, setinput] = useState([]);
  const [coverimage, setcoverimage] = useState([]);
  const generateId = () => Date.now() + Math.random().toString(36).substring(2);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);
  const loaction = useLocation();
  const navigate = useNavigate();
  const [preview, setpreview] = useState(null);
  const [productname, setproductname] = useState("");
  const [updateimage, setupdateimage] = useState(null);
  const [updateprice, setupdateprice] = useState("");
  const [updatestock, setupdatestock] = useState("");
  const [updatediscount, setdiscount] = useState("");
  const [description, setdescription] = useState("");
  const [getcategory, setgetcategory] = useState([]);
  const[imageid,setimageid]=useState()
  const changes = (e, id) => {
    setimageid(id)
    const file = e.target.files[0];
    if (id && file) {
      const updatedImages = coverimage.map((item) =>
        item.id === id
          ? { ...item, url: file }
          : item
      );
      setcoverimage(updatedImages);
    }
  };

  const getcategorys = async () => {
    const result = await fetch("http://localhost:8000/getcategory", {
      method: "GET",
    });
    const res = await result.json();
    if (res.data) {
      console.log("first");
      setgetcategory(res.data);
      console.log(res.data);
    }
  };

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
    console.log("......", coverimage);
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
      formdata.append("imageid",imageid)
      coverimage.forEach((item) => {
   
       if(item.url){
        formdata.append("images",item.url)
       }
      });

      input.forEach((item) => {
        if (item.url) {
          formdata.append("otherimage", item.url);
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

        console.log(result.data.image);
        setpreview(result.data.image);
      }
      if (result.datas) {
        console.log(result.datas);
        setcoverimage(result.datas);
      }
    };
    getcategorys();
    getproductfirst();
  }, [id]);

  const handle = (e) => {
    console.log("ssssssssssssssss");
    setupdateimage(e.target.files[0].name);
  };

  return (
    <>
      <div className="row m-0 p-0">
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
            <div>
              <form action="">
                <div className="p-5 update-form-section">
                  <div className="w-100 d-flex mt-2">
                    <div className="w-50">
                      <div className="w-50 text-start">
                        <label htmlFor="" className="name-updates-form">
                          Category
                        </label>
                      </div>
                      <select
                        class="form-select p-2 name-input-form"
                        onChange={(e) => setSelectedItem(e.target.value)}
                      >
                        {getcategory.map((item, index) => (
                          <option
                            value={item.categoryName}
                            selected={item.categoryName === selectedItem}
                            key={index}
                          >
                            {item.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-50">
                      <div className="w-100">
                        <div className="w-100 text-start ml-2">
                          <label
                            htmlFor=""
                            className="text-start name-updates-form"
                          >
                            Name
                          </label>
                        </div>
                        <div className="w-100 ml-2">
                          <input
                            className="w-100 p-2 name-input-form"
                            type="text"
                            name="name"
                            onKeyDown={(e) => handleChange(e, input2Ref)}
                            onChange={(event) =>
                              setproductname(event.target.value)
                            }
                            ref={input1Ref}
                            value={productname}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-100 d-flex mt-1">
                    <div className="w-50">
                      <div className="text-start">
                        <label htmlFor="" className="name-updates-form">
                          Price
                        </label>
                      </div>
                      <div className="text-start w-100">
                        <input
                          className="w-100 p-2 name-input-form"
                          type="number"
                          name="price"
                          ref={input2Ref}
                          value={updateprice}
                          onKeyDown={(e) => handleChange(e, input3Ref)}
                          onChange={(e) =>
                            setupdateprice(parseInt(e.target.value))
                          }
                        />
                      </div>
                    </div>
                    <div className="w-50">
                      <div className="w-100">
                        <div className="w-100 text-start ml-2">
                          <label
                            htmlFor=""
                            className="text-start name-updates-form"
                          >
                            Discount
                          </label>
                        </div>
                        <div className="w-100 ml-2">
                          <input
                            className="w-100 p-2 name-input-form"
                            type="number"
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
                  </div>
                  <div className="w-50">
                    <div className="text-start">
                      <label htmlFor="" className="name-updates-form">
                        Stock
                      </label>
                    </div>
                    <div className="w-100">
                      <input
                        type="number"
                        className="w-100 p-2 name-input-form"
                        name="stock"
                        value={updatestock}
                        ref={input3Ref}
                        onKeyDown={(e) => handleChange(e, input4Ref)}
                        onChange={(e) =>
                          setupdatestock(parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>

                  <div className="w-100 mt-2">
                    <div className="w-100 text-start">
                      <label htmlFor="" className="name-updates-form">
                        Description
                      </label>
                    </div>
                    <div class="form-floating">
                      <textarea
                        className="w-100 p-2 name-input-form"
                        ref={input5Ref}
                        value={description}
                        onKeyDown={(e) => handleChange(e, input6Ref)}
                        onChange={(e) => setdescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-100 more-files mt-2">
                    <h5>More Files</h5>
                  </div>
                  <div class="mb-3 mt-2">
                    <label
                      for="formFileMultiple"
                      className="form-label text-start w-100 ml-1 file-for-input"
                    >
                      File:*
                    </label>
                    <div className="w-100 d-flex justify-content-center align-items-center">
                      {updateimage ? (
                        <div className="">
                          <img
                            src={updateimage}
                            alt="good"
                            className="update-image-first-get"
                          />
                        </div>
                      ) : (
                        <div className="">
                          <img
                            src={`http://localhost:8000/${preview}`}
                            alt="good"
                            className="update-image-first-get"
                          />
                        </div>
                      )}

                      <input
                        class="form-control w-75"
                        type="file"
                        id="formFileMultiple"
                        multiple
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setupdateimage(file);

                          if (file) {
                            const reader = new FileReader();
                            reader.onload = function (event) {
                              const imgElement =
                                document.getElementsByClassName(
                                  "update-image-first-get"
                                )[0];
                              if (imgElement) {
                                imgElement.setAttribute(
                                  "src",
                                  event.target.result
                                );
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <button
                        className="ml-5 Add-files"
                        onClick={(e) => count(e)}
                      >
                        Add Files
                      </button>
                    </div>
                  </div>

                  {coverimage.map((item, index) => (
                    <div
                      key={index}
                      className="mt-2 d-flex justify-content-center allign-items-center"
                    >
                      <img
                        src={`http://localhost:8000/${item.url}`}
                        alt=""
                        className="update-image-first-get"
                        id={`all-image-${index}`}
                      />
                      <input
                        class="form-control w-75 ml-2 mb-2"
                        type="file"
                        style={{
                          height: "40px",
                        }}
                        id="formFileMultiple"
                        multiple
                        onChange={(e, id) => {
                          changes(e, item.id);
                          const reader = new FileReader();
                          const file = e.target.files[0];
                          reader.onload = function (event) {
                            const imgElement = document.getElementById(
                              "all-image-" + index
                            );
                            if (imgElement) {
                              imgElement.setAttribute(
                                "src",
                                event.target.result
                              );
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <button className="update-file ml-2 mb-2">update</button>
                    </div>
                  ))}

                  {input.length > 0 ? (
                    input.map((item, index) => (
                      <div key={item.id} className="mt-2 w-100 d-flex">
                        <input
                          type="file"
                          class="form-control w-75 add-input-img "
                          id={`file-${item.id}`}
                          onChange={(event) => handleFileChange(event, item.id)}
                        />

                        <button
                          className="delete-btn-img ml-5"
                          onClick={() => deletes(item.id)}
                        >
                          remove
                        </button>
                      </div>
                    ))
                  ) : (
                    <div></div>
                  )}

                  <div className="w-100 text-center mt-2">
                    <button
                      type="button"
                      className="upd-btn-product"
                      onClick={update}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
