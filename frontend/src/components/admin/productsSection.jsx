import React, { useEffect, useState } from "react";
import "./production.css";

import { Sidebar } from "primereact/sidebar";
import Updatepage from "./updatepage";


import { Dropdown } from "primereact/dropdown";
import csrftoken from "../../csrf";
import { change } from "../redux/reducers";
import Loading from "../loading/loading";
import { useNavigate } from "react-router-dom";
import { loading } from "../redux/reducers";
import { FaCheck } from "react-icons/fa";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MdAdd } from "react-icons/md";

import { Dialog } from "primereact/dialog";

import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Link } from "react-router-dom";

import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { ProgressBar } from "primereact/progressbar";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Slider } from "primereact/slider";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Navigate } from "react-router-dom";
import MainSidebar from "./sidebar";

export default function ProductsSection() {
  const navigate=useNavigate()
  const [productName, setproductname] = useState("");
  const [price, setPrice] = useState("");
  const [productcategory, setcategory] = useState("");
  const [productstock, setproductstock] = useState("");
  const [productimage, setproductimage] = useState(null);
  const [productdiscount, setproductdiscount] = useState("");
  const [product, setProduct] = useState([]);
  const [visibleRight, setVisibleRight] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  
  const [formvalid, setformvalid] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categorys = [
    { name: "samsung", value: "samsung" },
    { name: "iphone", value: "iphone" },
    { name: "laptop", value: "laptop" },
  ];

  const value = useSelector((state) => state.cn.setLoading);

  const getSeverity = (status) => {
    switch (status) {
      case "unqualified":
        return "danger";

      case "qualified":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      case "renewal":
        return null;
    }
  };
  const countryBodyTemplate = (rowData) => {
    return rowData.country?.code || "N/A"; // Safely access country.code
  };

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => ({
      ...d,
      country: d.country || { code: "Unknown" },
      representative: d.representative || {
        name: "Unknown",
        image: "default.png",
      },
      date: d.date ? new Date(d.date) : null,
    }));
  };

  const formatprice = (value) => {
    if (value == null) {
      return "N/A";
    }
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const formatCurrency = (value) => {
    if (value == null) {
      return "N/A"; // Handle undefined or null values
    }
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const clearFilter = () => {
    initFilters();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      price: {
        // Add filter for the `price` field
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }], // Use EQUALS for exact match
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue("");
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter}
        />
        <IconField iconPosition="left">
          {/* <InputIcon className="pi pi-search" /> */}
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
    );
  };

  const filterClearTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-times"
        onClick={options.filterClearCallback}
        severity="secondary"
      ></Button>
    );
  };

  const filterApplyTemplate = (options) => {
    return (
      <Button
        type="button"
        icon="pi pi-check"
        onClick={options.filterApplyCallback}
        severity="success"
      ></Button>
    );
  };

  const filterFooterTemplate = () => {
    return <div className="px-3 pt-0 pb-3 text-center">Filter by Country</div>;
  };

  const representativeBodyTemplate = (rowData) => {
    const representative = rowData.image || {};

    return (
      <div className="flex align-items-center gap-2">
        <img
          alt={representative.name || "Unknown"}
          src={`http://127.0.0.1:8000${representative}`}
          width="60"
        />
      </div>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return rowData.price ? formatprice(rowData.price) : "N/A";
  };

  const dateFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value)} // Correctly pass the numeric value
        mode="decimal" // Ensure decimal mode is used for numeric values
        placeholder="Enter price"
        minFractionDigits={2} // Format for 2 decimal places if needed
        maxFractionDigits={2}
      />
    );
  };

  const category = (rowData) => {
    return formatCurrency(rowData.category);
  };

  const balanceFilterTemplate = (options) => {
    return (
      <InputNumber
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        mode="currency"
        currency="USD"
        locale="en-US"
      />
    );
  };

  const stockbodytemplate = (rowData) => {
    return rowData.stock_count;
  };

  const stockfiltertemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={stockitemtemplate}
        placeholder="Select One"
        className="p-column-filter"
        showClear
      />
    );
  };

  const stockitemtemplate = (option) => {
    return <Tag value={option} severity={getSeverity(option)} />;
  };

  const dicountbodytemplate = (rowData) => {
    return rowData.discount;
  };

  const activityFilterTemplate = (options) => {
    return (
      <React.Fragment>
        <Slider
          value={options.value}
          onChange={(e) => options.filterCallback(e.value)}
          range
          className="m-3"
        ></Slider>
        <div className="flex align-items-center justify-content-between px-2">
          <span>{options.value ? options.value[0] : 0}</span>
          <span>{options.value ? options.value[1] : 100}</span>
        </div>
      </React.Fragment>
    );
  };

  const updatebodytamplate = (rowData) => {
    return (
      <i>
        <span className="MdModeEditOutline" onClick={()=>updates(rowData.id)}>
          {" "}
          <MdModeEditOutline/>
        </span>
        <span className="MdDelete" onClick={() => deletes(rowData.id)}>
          <MdDelete />
        </span>
      </i>
    );
  };

  const verifiedFilterTemplate = (options) => {
    return (
      <div className="flex align-items-center gap-2">
        <label htmlFor="verified-filter" className="font-bold">
          Verified
        </label>
        <TriStateCheckbox
          inputId="verified-filter"
          value={options.value}
          onChange={(e) => options.filterCallback(e.value)}
        />
      </div>
    );
  };

  const header = renderHeader();

  useEffect(() => {
    // CustomerService.getCustomersMedium().then((data) => {
    //   setCustomers(getCustomers(data));
    //   setLoading(false);
    dispatch(change(false));
    initFilters();

    const adminproduct = async () => {
      const res = await fetch("http://localhost:8000/adminProduct", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
      });
      const result = await res.json();
      if (result.data) {
        setCustomers(result.data);
      }
      if (!result.data) {
        console.error("No data received from the server");
        setCustomers([]);
      }
      if (result.error) {
        console.log("hello");
      }
    };
    adminproduct();
  }, []);

const updates=async(id)=>{
  console.log("idis",id)
  
  navigate("/Updatepage",{state:{id}})
 
// const res=await fetch("http://localhost:8000/updates",{
// method:"POST",
// headers:{
//   "X-CSRFToken": csrftoken,
//   "Content-Type": "application/json",
// },
// body :JSON.stringify({id:id})
// })
// try{
//   const result=await res.json()
//   if(result.message){
//     console.log("message is",result.message)
//   }
//   if(result.error){
//     console.log("error is ",result.error)
//   }



// }
// catch(error){
//   console.log("error is simple",error)
// }

}





  const deletes = async (id) => {
    console.log("thisssss", id);
    const res = await fetch("http://localhost:8000/onDelete", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const result = await res.json();
    if (result.data) {
      console.log("hhhhhhhhhhhhhhhh");
      setCustomers(result.data);
    }
    if (result.error) {
      console.log("sssssssssssssss");
    }
  };

  const clearform = () => {
    setproductname("");
    setproductimage("");
    setPrice("");
    setcategory("");
    setproductstock("");
    setproductdiscount("");
    setVisibleRight(false);
  };

  // addd
  const productAdd = async (event) => {
    event.preventDefault();
    dispatch(loading(true));
    {
      setTimeout(() => {
        dispatch(loading(false));
      }, 3000);
    }

    const formdata = new FormData();
    formdata.append("productName", productName);
    formdata.append("price", price);
    formdata.append("productcategory", productcategory);
    formdata.append("productdiscount", productdiscount);
    formdata.append("productstock", productstock);
    formdata.append("productimage", productimage);
    console.log("the dataa", price, productName, productcategory);

    if (parseInt(price) > 0 && productName != "" && productcategory != "") {
      const res = await fetch("http://localhost:8000/productAdds", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: formdata,
      });

      const result = await res.json();
      dispatch(change(false));

       
      if (result.message) {
        dispatch(loading(false))
      setVisible(true)
    setVisibleRight(false);
    


        console.log("here isme");
        console.log(result.message);
// {
//   setInterval(() => {
//     clearform();
//   }, 3000);
// }

       }
    

      if (result.error) {
        console.log("result is :", result.error);
        dispatch(loading(false));
        alert("not created");
        clearform();
      }
    } else {
      dispatch(loading);
      alert("something fishy");
      clearform();

    }
  };

  return (
    <>
    <div>
      <div className="row">
        <div className="col-2">
        <MainSidebar/>

        </div>
        <div className="col-10">

        {value ? (
        <Loading />
      ) : (
        <div className="products-main-section">
          <div className="prorductsHeading d-flex justify-content-between">
            <div>
              <h1>products</h1>
            </div>
            <div>
              <div>
                <button
                  className="btn-dark"
                  onClick={() => setVisibleRight(true)}
                >
                  <span className="MdAdd">
                    <MdAdd />
                  </span>
                  add product
                </button>
              </div>
            </div>
          </div>
          <div className="card">
            <DataTable
              value={customers}
              paginator
              showGridlines
              rows={10}
              // loading={loading}
              dataKey="id"
              filters={filters}
              globalFilterFields={[
                "name",
                "country.name",
                "representative.name",
                "category",
                "status",
              ]}
              header={header}
              emptyMessage="there is no product exist."
              onFilter={(e) => setFilters(e.filters)}
            >
              <Column
                field="name"
                header="Name"
                filter
                filterPlaceholder="Search by name"
                style={{ minWidth: "12rem" }}
              />

              <Column
                header="image"
                style={{ minWidth: "14rem" }}
                body={representativeBodyTemplate}
              />
              <Column
                header="price"
                filterField="price"
                dataType="numeric"
                style={{ minWidth: "10rem" }}
                body={priceBodyTemplate}
                filter
                filterElement={dateFilterTemplate}
              />
              <Column
                header="category"
                filterField="balance"
                dataType="numeric"
                style={{ minWidth: "10rem" }}
                body={category}
                filter
                filterElement={balanceFilterTemplate}
              />
              <Column
                field="stock"
                header="stock"
                filterMenuStyle={{ width: "14rem" }}
                style={{ minWidth: "12rem" }}
                body={stockbodytemplate}
                filter
                filterElement={stockfiltertemplate}
              />
              <Column
                field="discount"
                header="discount"
                showFilterMatchModes={false}
                style={{ minWidth: "12rem" }}
                body={dicountbodytemplate}
                filter
                filterElement={activityFilterTemplate}
              />
              <Column
                field="update"
                header="update"
                bodyClassName="text-center"
                style={{ minWidth: "8rem" }}
                body={updatebodytamplate}
              />
            </DataTable>
          </div>

          <Sidebar
            visible={visibleRight}
            position="right"
            onHide={() => setVisibleRight(false)}
          >
            <h2 className="newproduct-heading">add new product</h2>
            <hr />
            <form className="ms-1" onSubmit={productAdd}>
              <div className="w-75">
                <label className="text-dark">Product Name</label>
                <input
                  type="text"
                  className="form-control w-100"
                  onChange={(event) => setproductname(event.target.value)}
                />
              </div>
              <div className="w-75">
                <label
                  for="exampleInputPassword1"
                  className="form-label text-dark"
                >
                  Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(event) => setPrice(event.target.value)}
                />
              </div>
              <div className="w-75">
                <label
                  for="exampleInputPassword1"
                  className="form-label text-dark"
                >
                  Stock
                </label>
                <input
                  type="number"
                  className="form-control"
                  onChange={(event) => setproductstock(event.target.value)}
                />
              </div>
              <div className="w-75">
                <label className="form-label text-dark">Discount</label>
                <input
                  type="number"
                  className="form-control "
                  onChange={(event) => setproductdiscount(event.target.value)}
                />
              </div>
              <div className="w-50">
                <label className="form-label text-dark">Category</label>
                <div className="card flex justify-content-center">
                  <Dropdown
                    value={productcategory}
                    onChange={(e) => setcategory(e.target.value, "category")}
                    options={categorys}
                    optionLabel="name"
                    placeholder="Select the category"
                    className="w-full w-100"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="" className="form-label text-dark">
                  image
                </label>
                <input
                  class="form-control"
                  type="file"
                  multiple
                  onChange={(event) => setproductimage(event.target.files[0])}
                />
              </div>
              <div className="card flex justify-content-center w-100">
                <div className="mt-3" style={{marginLeft:"auto",marginRight:"auto"}}>
                  <Button
                    label="Submit"
                    icon="pi pi-external-link"
                    className="dialogbtn"
                
                  />
                </div>
                <Dialog
                  header="product added succesfully"
                  visible={visible}
                  onHide={() => {
                    if (!visible) return;
                    setVisible(false);
                  }}
                  style={{ width: "24vw" }}
                  breakpoints={{ "960px": "75vw", "641px": "100vw" }}
                >
                <div className="text-center">
                  <div className="mainFaCheck">
                  <FaCheck className="FaCheck" />
                  </div>
               
                </div>
                </Dialog>
              </div>
            </form>
          </Sidebar>
        </div>
          )}




        </div>

      </div>
      {console.log("the loader", value)}
     
    </div>
   
    
    </>
  );
}
