import React, { useEffect, useState } from "react";
import MainSidebar from "../sidebar";
import "./addproduct.css";
import { useNavigate } from "react-router-dom";
import csrftoken from "../../../csrf";

export default function Categorypage() {
  const navigate = useNavigate("");
  const [visible, setvisble] = useState(false);
  const [updatevisble, setupdatevisble] = useState(false);
  const [image, setimage] = useState(null);
  const [categoryname, setcategoryname] = useState("");
  const [category, setcategory] = useState([]);
  const [deletevisible, setdeletevisible] = useState(false);
  const [deleteid, setdeleteid] = useState(0);
  const [updateid, setupdateid] = useState(0);
  const[updatename,setupdatename]=useState('')
  const[updateimage,setupdateimage]=useState(null)
  const[valuename,setvaluename]=useState('')

  const viewmodal = () => {
    setvisble(true);
    console.log("hi");
  };
  const closeModal = () => {
    setvisble(false);
  };
  const submit = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", categoryname);
      formdata.append("image", image);
      const result = await fetch("http://localhost:8000/Createcategoy", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: formdata,
      });
      const res = await result.json();
      if (res.data) {
        console.log("first");
        console.log(res.data);
        setcategory(res.data);
        setvisble(false);
      }
      if (res.alert) {
        alert("the category is alredy exists");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const deletes = () => {
    setdeletevisible(true);
  };
  const handleDelete = async () => {
    const result = await fetch("http://localhost:8000/deletecategory", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: deleteid }),
    });
    const res = await result.json();
    if (res.data) {
      setcategory(res.data);
      setdeletevisible(false);
    }
  };

  const updates = () => {
    setupdatevisble(true);
    
  };
  const handleupdate = async() => {
    const formdata= new FormData()
    formdata.append("name",updatename)
    formdata.append("image",updateimage||null)
    formdata.append("id",updateid)

    const result=await fetch("http://localhost:8000/updatecategory",{
      method:"POST",
      headers:{
        "X-CSRFToken": csrftoken,
       
      },
      body: formdata,
    })
    const res=await result.json()
    if(res.data){
      console.log("updated")
      setcategory(res.data)
      setupdatevisble(false)
    }
    else{
      console.log("somehtind not good")
    }
  };

  const getcategory = async () => {
    const result = await fetch("http://localhost:8000/getcategory", {
      method: "GET",
    });
  
    const res = await result.json();
    if (res.data) {
      setcategory(res.data);
      console.log("first");
    } else {
      console.log("not good");
    }
  };
  useEffect(() => {
    getcategory();
  }, []);
  return (
    <>
      <div className="row w-100 m-0 p-0"style={{zIndex:"1"}}>
        <div className="col-2">
          <MainSidebar />
        </div>
        <div className="col-10">
          <div className="container">
            <div className="d-padding">
              <div className="text-start ml-5 mb-3 ">
                <i
                  class="bi bi-arrow-left-circle"
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={() => navigate("/adminproductpage")}
                ></i>
                <i
                  class="bi bi-arrow-right-circle text-dark ml-1"
                  style={{ fontSize: "20px" }}
                ></i>
              </div>
              <div className="add-category-main">
                <div className="ml-5">
                  <h2 className="category-page-heading">category</h2>
                </div>
                <div className="mx-5">
                  <button className="add-category-btn-cate" onClick={viewmodal}>
                    add category
                  </button>
                </div>
              </div>
              <div>
                <table className="table " style={{ background: "black" }}>
                  <thead className="table-heads w-100">
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">image</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  {category.map((item, index) => (
                    <tbody key={item.id}>
                      <tr>
                        <th scope="row" style={{ verticalAlign: "middle" }}>
                          {index + 1}
                        </th>
                        <td
                          className="text-dark"
                          style={{ verticalAlign: "middle" }}
                        >
                          {item.categoryName}
                        </td>
                        <td>
                          <img
                            src={`http://localhost:8000/${item.image}`}
                            className="image-of-cart"
                            alt=""
                          />
                        </td>
                        <td
                          className="text-dark"
                          style={{ verticalAlign: "middle" }}
                        >
                          <button
                            className=" update-category-btn"
                            onClick={() => {
                              setupdateid(item.id);
                              setvaluename(item.categoryName)
                              updates();
                            }}
                          >
                            update
                          </button>
                          <button
                            className="delete-category-btn ml-2"
                            onClick={() => {
                              deletes();
                              setdeleteid(item.id);
                            }}
                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>

                {deletevisible && (
                  <div className="modal fade show d-block">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title text-dark">
                            Confirm Deletion
                          </h5>
                          <button
                            className="btn-close"
                            onClick={() => setdeletevisible(false)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <p className="text-dark">
                            Are you sure you want to delete this item?
                          </p>
                        </div>
                        <div className="modal-footer">
                          <button
                            className="btn btn-secondary"
                            onClick={() => setdeletevisible(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {updatevisble && (
                  <div className="modal fade show d-block">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title text-dark">update</h5>
                          <button
                            className="btn-close"
                            onClick={() => setupdatevisble(false)}
                          ></button>
                        </div>
                        <div className="modal-body">
                          <form action="w-100">
                            <div className="w-100">
                              <div className="text-start">
                                <label htmlFor="">Name</label>
                              </div>
                              <div className="w-100">
                                <input type="text" 
                                value={valuename}
                                className="w-100 update-input-cat"
                                onChange={(event)=>{setupdatename(event.target.value)
                                  setvaluename(event.target.value)}
                                } />
                              </div>
                            </div>
                            <div className="text-start w-100">
                                <label htmlFor="" className="text-start">
                                  image
                                </label>
                                <input
                                  className="form-control input-file-cat p-2"
                                  type="file"
                                  id="formFile"
                                  onChange={(event) =>
                                    setupdateimage(event.target.files[0])
                                  }
                                />
                              </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button
                            className="btn btn-secondary"
                            onClick={() => setupdatevisble(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={handleupdate}
                          >
                            update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {visible && (
                  <div className="modal-dialog modal-lg">
                    <div className="modal fade show d-block" tabIndex="-1">
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header header-of-modal-category">
                            <h5 className="modal-title">add category</h5>
                            <button
                              type="button"
                              className="btn-close"
                              onClick={closeModal}
                            ></button>
                          </div>
                          <form action="" className="w-100">
                            <div className="modal-body body-of-modal-category w-100">
                              <div className="text-start w-100">
                                <label htmlFor="" className="text-start">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  name="category"
                                  className="w-100 p-2 input-modal-catgory"
                                  placeholder="Enter the category"
                                  onChange={(event) =>
                                    setcategoryname(event.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="modal-body body-of-modal-category w-100">
                              <div className="text-start w-100">
                                <label htmlFor="" className="text-start">
                                  image
                                </label>
                                <input
                                  className="form-control input-file-cat p-2"
                                  type="file"
                                  id="formFile"
                                  onChange={(event) =>
                                    setimage(event.target.files[0])
                                  }
                                />
                              </div>
                            </div>
                          </form>

                          <div className="modal-footer footer-of-modal-category">
                            <div className="row w-100">
                              <div className="col-6"></div>
                              <div className="col-6">
                                <div className="w-100 text-end">
                                  <button
                                    type="button"
                                    className="btn btn-secondary mx-1"
                                    onClick={closeModal}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn submit-category-btn"
                                    onClick={submit}
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
