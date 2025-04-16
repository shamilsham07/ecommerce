import React, { useEffect, useState } from "react";
import "./production.css";

import { Sidebar } from "primereact/sidebar";

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

import { FilterMatchMode, FilterOperator } from "primereact/api";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";

import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Slider } from "primereact/slider";
import { Tag } from "primereact/tag";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import MainSidebar from "./sidebar";

export default function ProductsSection() {
  const navigate = useNavigate();
  const [productName, setproductname] = useState("");
  const [price, setPrice] = useState("");
  const [productcategory, setcategory] = useState("");
  const [productstock, setproductstock] = useState("");
  const [productimage, setproductimage] = useState(null);
  const [productdiscount, setproductdiscount] = useState("");
  const [visibleRight, setVisibleRight] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [filters, setFilters] = useState(null);
  const[theid,settheid]=useState()
  const[deletevisible,setdeletevisible]=useState(false)

  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const dispatch = useDispatch();

 




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
      <div className="flex justify-content-end" style={{background:"white",border:"none"}}>
        <IconField iconPosition="left">
          {/* <InputIcon className="pi pi-search" /> */}
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="p-2"
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
   
      <div>
          <span className="MdDelete mx-2"onClick={()=>navigate("/transfertoviewimage")}>
          <i class="bi bi-eye-fill"></i>


          </span>
        <span className="MdModeEditOutline" onClick={() => updates(rowData.id)}>
          {" "}
          <MdModeEditOutline />
        </span>
        <span className="MdDelete"    
      
        
          onClick={()=>{setdeletevisible(true)
            settheid(rowData.id)

          }}
          >
          <MdDelete />
        </span>
      </div>
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
        setCustomers([]);
      }
      if (result.error) {
      }
    };
    adminproduct();
  }, []);

  const updates = async (id) => {
    navigate("/Updatepage", { state: { id } });
  };

  const deletes = async (id) => {
    const res = await fetch("http://localhost:8000/onDelete", {
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: theid }),
    });
    const result = await res.json();
    if (result.data) {
      setCustomers(result.data);
      setdeletevisible(false)
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
        dispatch(loading(false));
        setVisible(true);
        setVisibleRight(false);

        // {
        //   setInterval(() => {
        //     clearform();
        //   }, 3000);
        // }
      }

      if (result.error) {
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
        <div className="row w-100">
          <div className="col-2"style={{height:"100vh"}}>
            <MainSidebar />
          </div>
          <div className="col-10">
            {value ? (
              <Loading />
            ) : (
              <div className="products-main-section p-5">
                <div className="prorductsHeading d-flex justify-content-between">
                  <div className="ml-3">
                    <h1>products</h1>
                  </div>
                  <div>
                    <div className="ms-3">
                      <button
                        className="btn-dark"
                        onClick={() => navigate("/Addproduct")}
                      >
                        <span className="MdAdd">
                          <MdAdd />
                        </span>
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card p-5">
                  <DataTable
                    value={customers}
                    paginator
                    showGridlines
                    color="color:white;"
                    className="background-table"
                    rows={10}
                    // loading={loading}
                    dataKey="id"
                    globalFilterFields={[
                      "name",
                      "country.name",
                      "representative.name",
                      "category",
                      "status",
                    ]}
                    header={header}
                    emptyMessage="there is no product exist."
                    filters={filters}
                    onFilter={(e) => setFilters(e.filters)}
                  >
                    <Column
                      field="name"
                      header="Name"
                      style={{ width: "180px" }}
                       className="p-1 mt-1"
                    />

                    <Column
                      header="image"
                      style={{ width: "180px" }}
                      body={representativeBodyTemplate}
                       className="p-1 mt-1"

                    />
                    <Column
                      header="price"
                      filterField="price"
                      dataType="numeric"
                      style={{ width: "180px" }}
                      body={priceBodyTemplate}
                       className="p-1 mt-1"

                    />
                    <Column
                      header="category"
                      filterField="balance"
                      dataType="numeric"
                      style={{ width: "180px" }}
                      body={category}
                       className="p-1 mt-1"

                      // filter
                      // filterElement={balanceFilterTemplate}
                    />
                    <Column
                      field="stock"
                      header="stock"
                      // filterMenuStyle={{ width: "14rem" }}
                      style={{ width: "180px" }}
                      body={stockbodytemplate}
                       className="p-1 mt-1"

                      // filter
                      // filterElement={stockfiltertemplate}
                    />
                        <Column
                      field="stock"
                      header="stock"
                      // filterMenuStyle={{ width: "14rem" }}
                      style={{ width: "180px" }}
                      body={stockbodytemplate}
                       className="p-1 mt-1"

                      // filter
                      // filterElement={stockfiltertemplate}
                    />
                    <Column
                      field="update"
                      header="update"
                      bodyClassName="text-update"
                      style={{ width: "180px" }}
                      className="p-1 mt-1"

                   
                      body={updatebodytamplate}
                    />
                 
                  </DataTable>
                </div>
                {deletevisible&&
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
            onClick={deletes}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
                }
          
               
              </div>
           
            )}
          </div>
        </div>
        {console.log("the loader", value)}
      </div>
    </>
  );
}
