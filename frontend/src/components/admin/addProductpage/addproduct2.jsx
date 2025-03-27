import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./addproduct.css";
import csrftoken from "../../../csrf";

export default function Addproduct2() {
  const [selectedCategory, setSelectedCategory] = useState("Select a category");
  const [category, setCategory] = useState([]);

  const [item, setitem] = useState("");
  const [image, setupdateimage] = useState(null);
  const [description, setdescription] = useState("");

  const [input, setinput] = useState([]);

  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [discount, setDiscount] = useState();
  const [stock, setStock] = useState();
  const addTheproduct = async () => {
    console.log("kkjk",item)

    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("discount", discount);
    formdata.append("stock", stock);
    formdata.append("image", image);
    formdata.append("category", item);
    formdata.append("description", description);

    input.forEach((item) => {
      if (item.file) {
        formdata.append("otherimage", item.file);
      }
    });
    console.log("fiet",item)
if(item !=="Select Category"&&item!==''){
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
}
else{
  alert("select category")
}

}
    

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

  const getCategory = async () => {
    try {
      const result = await fetch("http://localhost:8000/getcategory", {
        method: "GET",
      });
      const res = await result.json();

      if (res.data) {
        console.log(res.data);
        setCategory(res.data);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <section>
      <div className="add-product-heading-section">
        <h1>add product</h1>
      </div>
      <form
        onSubmit={handle}
        action=""
        className="mt-5 d-flex justify-content-center align-items-center"
      >
        <div className="w-50 text-start border-for-form p-5">
          <div className="d-flex mt-1">
            <div className="w-50">
              <div className=" w-100">
                <label htmlFor="" className="add-product-2-name-label fw-bold">
                  Category
                </label>
              </div>
              <div className="w-100">
                <select
                  class="form-select p-2 selector-category"
                  aria-label="Default select example"
                  onChange={(event)=>setitem(event.target.value)}
                >
                  <option selected >Select Category</option>
                  {category.map((item, index) => (
                    <option value={item.categoryName} >{item.categoryName}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-50 ml-1">
              <div className="100">
                <label htmlFor="" className="add-product-2-name-label fw-bold">
                  Name
                </label>
              </div>
              <div className="w-100">
                <input
                  type="text"
                  className="add-product-2-name p-2 w-100"
                  name="name"
                  onChange={(event) => {
                    setname(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="d-flex mt-1">
            <div className="w-50 ml-1">
              <div className="100">
                <label htmlFor="" className="add-product-2-name-label fw-bold">
                  Price
                </label>
              </div>
              <div className="w-100">
                <input
                  type="number"
                  className="add-product-2-name p-2 w-100"
                  name="price"
                  onChange={(event) => {
                    setprice(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="w-50 ml-1">
              <div className="100">
                <label htmlFor="" className="add-product-2-name-label fw-bold">
                  Stock
                </label>
              </div>
              <div className="w-100">
                <input
                  type=""
                  className="add-product-2-name p-2 w-100"
                  name="stock"
                  onChange={(event) => {
                    setStock(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="d-flex mt-1">
            <div className="w-50 ml-1">
              <div className="100">
                <label htmlFor="" className="add-product-2-name-label fw-bold">
                  Discount
                </label>
              </div>
              <div className="w-100">
                <input
                  type="number"
                  className="add-product-2-name p-2 w-100"
                  name="discount"
                  onChange={(event) => {
                    setDiscount(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="w-100 mt-1">
            <div className="w-100 ml-1">
              <label htmlFor="" className="add-product-2-name-label fw-bold">
                Description
              </label>
            </div>
            <div class="form-floating ml-1">
              <textarea
                class="form-control description-text-area"
                placeholder="Leave a comment here"
                id="floatingTextarea"
                onChange={(event)=>{
                  setdescription(event.target.value)}}
              ></textarea>
            </div>
          </div>
          <div className="w-100 mt-1">
            <div className="w-100 ml-1">
              <label htmlFor="" className="add-product-2-name-label fw-bold">
                Cover Image
              </label>
            </div>
            <div className="d-flex justify-content-center">
              <div className="image-cover-input input-group mb-3 ">
                <input
                  type="file"
                  class=" form-control"
                  id="inputGroupFile02"
                  onChange={(event) => setupdateimage(event.target.files[0])}
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
            <div>
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
            </div>
          </div>
          <div className="add-products-btn-submit w-100">
                  <div className="w-100 mt-5 text-center">
                    <button onClick={addTheproduct}>add product</button>
                  </div>
                </div>
        </div>
      </form>
    </section>
  );
}
