import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, FormGroup, Label } from "reactstrap";
import "../styles/admin.css";
import api from "../api/posts";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [prodCategory, setProdCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [prodImg, setProdImg] = useState(null); // Updated line
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/category");
        setAllCategories(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };

    getCategories();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    const productObj = {
      title: productName,
      category: prodCategory,
      brand: brand,
      description: description,
      price: price,
      quantity: quantity,
    };

    try {
      const formData = new FormData();
      formData.append("title", productObj.title);
      formData.append("category", productObj.category);
      formData.append("brand", productObj.brand);
      formData.append("description", productObj.description);
      formData.append("price", productObj.price);
      formData.append("quantity", productObj.quantity);
      formData.append("image", prodImg);

      await api.post("/product", formData);

      toast.success("Product added successfully");

      clearInputs();
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearInputs = (e) => {
    e.preventDefault();

    setProductName("");
    setProdCategory("");
    setBrand("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setProdImg("");
  };

  return (
    <div>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Add Product</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Add Product</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {/* /.card-header */}
                  <div className="card-body">
                    <Form
                      className="billing_form"
                      onSubmit={addProduct}
                      enctype="multipart/form-data"
                    >
                      <FormGroup className="form_group">
                        <Label>Product Name</Label>
                        <input
                          type="text"
                          required
                          onChange={(text) => setProductName(text.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Product Category</Label>
                        <select
                          required
                          onChange={(text) =>
                            setProdCategory(text.target.value)
                          }
                        >
                          <option> -- Select Category -- </option>
                          {allCategories.map((category) => (
                            <option value={category.title} key={category._id}>
                              {category.title}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Brand</Label>
                        <input
                          type="text"
                          required
                          onChange={(text) => setBrand(text.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Description</Label>
                        <textarea
                          type="text"
                          rows="4"
                          required
                          onChange={(text) => setDescription(text.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form_group d-flex gap-2">
                        <div>
                          <Label>Price</Label>
                          <input
                            type="number"
                            required
                            onChange={(text) => setPrice(text.target.value)}
                          />
                        </div>

                        <div>
                          <Label>Quantity</Label>
                          <input
                            type="number"
                            required
                            onChange={(text) => setQuantity(text.target.value)}
                          />
                        </div>
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Upload Photo</Label>
                        <input
                          type="text"
                          required
                          value={productName}
                          onChange={(event) =>
                            setProductName(event.target.value)
                          }
                        />
                      </FormGroup>

                      <button type="submit" className="buy_button">
                        Add
                      </button>
                      <button
                        className="float-right buy_button"
                        onClick={clearInputs}
                      >
                        Clear
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddProduct;
