import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label } from "reactstrap";
import products from "../assets/data/products";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const { productName, price, description, shortDesc, category } = product;

  const [newProductName, setProductName] = useState("");
  const [newProdCategory, setProdCategory] = useState("");
  const [newShortDesc, setShortDesc] = useState("");
  const [newDescription, setDescription] = useState("");
  const [newPrice, setPrice] = useState("");
  const [newQuantity, setQuantity] = useState("");
  const [newProdImg, setProdImg] = useState("");

  const handleUpdate = (e) => {
    e.preventDefault();

    // ******* JUST IN CASE *******

    // const newProductName = productName.current.value
    // const newProdCategory = prodCategory.current.value
    // const newShortDesc = shortDesc.current.value
    // const newDescription = description.current.value
    // const newPrice = price.current.value
    // const newQuantity = quantity.current.value
    // const newProdImg = prodImg.current.value

    const productObj = {
      productName: newProductName,
      category: newProdCategory,
      shortDesc: newShortDesc,
      description: newDescription,
      price: newPrice,
      quantity: newQuantity,
      productImage: newProdImg,
    };

    console.log(productObj);
    navigate("/admin/view-products");
    window.location.reload();
    toast.success("Product updated");
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
                <h1 className="m-0">Edit Product</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/admin">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/admin/view-products">Products</a>
                  </li>
                  <li className="breadcrumb-item active">Edit Product</li>
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
                    <Form className="billing_form" onSubmit={handleUpdate}>
                      <FormGroup className="form_group">
                        <Label>Product Name</Label>
                        <input
                          type="text"
                          value={productName}
                          required
                          onChange={(text) => setProductName(text.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Product Category</Label>
                        <select
                          required
                          disabled
                          onChange={(text) => setProdCategory(text.target.value)
                          }
                        >
                          <option selected value={category}>
                            {category}
                          </option>
                          <option value="sofa">Sofas</option>
                          <option value="mobile">Mobile</option>
                          <option value="chair">Chair</option>
                          <option value="watch">Watches</option>
                          <option value="wireless">Wireless</option>
                        </select>
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Short Description</Label>
                        <input
                          type="text"
                          value={shortDesc}
                          required
                          onChange={(text) => setShortDesc(text.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Description</Label>
                        <textarea
                          type="text"
                          rows="4"
                          required
                          onChange={(text) => setDescription(text.target.value)}
                        >
                          {description}
                        </textarea>
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Price</Label>
                        <input
                          type="number"
                          value={price}
                          required
                          onChange={(text) => setPrice(text.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Quantity</Label>
                        <input
                          type="number"
                          value={20}
                          required
                          onChange={(text) => setQuantity(text.target.value)}
                        />
                      </FormGroup>
                      <FormGroup className="form_group">
                        <Label>Upload Photo</Label>
                        <input
                          type="file"
                          onChange={(val) => setProdImg(val.target.value)}
                        />
                      </FormGroup>
                      <button type="submit" className="buy_button">
                        Update
                      </button>
                      <a
                        href="/admin/view-products"
                        className="buy_button float-right"
                      >
                        Cancel
                      </a>
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

export default UpdateProduct;
