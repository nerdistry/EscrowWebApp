import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Form, FormGroup, Label } from 'reactstrap'
import '../styles/admin.css'

const AddProduct = () => {

  const [productName, setProductName] = useState('');
  const [prodCategory, setProdCategory] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [prodImg, setProdImg] = useState('');

  const addProduct = (e) => {
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
      productName: productName,
      category: prodCategory,
      shortDesc: shortDesc,
      description: description,
      price: price,
      quantity: quantity,
      productImage: prodImg,
    }

    console.log(productObj);

    toast.success("Product added successfully");

    setProductName('');
    setProdCategory('');
    setShortDesc('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setProdImg('');
  }

  const clearInputs = (e) => {
    e.preventDefault();

    setProductName('');
    setProdCategory('');
    setShortDesc('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setProdImg('');
  }

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
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                  <li className="breadcrumb-item active">Add Product</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
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

                    <Form className='billing_form' onSubmit={addProduct}>
                      <FormGroup className='form_group'>
                        <Label>Product Name</Label>
                        <input type='text' required onChange={(text) => setProductName(text.target.value)} value={productName}/>
                      </FormGroup>
                      <FormGroup className='form_group'>
                        <Label>Product Category</Label>
                        <select required onChange={(text) => setProdCategory(text.target.value)} value={prodCategory}>
                          <option> -- Select Category -- </option>
                          <option value="sofa">Sofas</option>
                          <option value="mobile">Mobile</option>
                          <option value="chair">Chair</option>
                          <option value="watch">Watches</option>
                          <option value="wireless">Wireless</option>
                        </select>
                      </FormGroup>
                      <FormGroup className='form_group'>
                        <Label>Short Description</Label>
                        <input type='text' required onChange={(text) => setShortDesc(text.target.value)} value={shortDesc} />
                      </FormGroup>
                      <FormGroup className='form_group'>
                        <Label>Description</Label>
                        <textarea type='text' rows='4' required onChange={(text) => setDescription(text.target.value)} value={description} />
                      </FormGroup>
                      <FormGroup className='form_group'>
                        <Label>Price</Label>
                        <input type='number' required onChange={(text) => setPrice(text.target.value)} value={price} />
                      </FormGroup>
                      <FormGroup className='form_group'>
                        <Label>Quantity</Label>
                        <input type='number' required onChange={(text) => setQuantity(text.target.value)} value={quantity} />
                      </FormGroup>
                      <FormGroup className='form_group'>
                        <Label>Upload Photo</Label>
                        <input type='file' required onChange={(val) => setProdImg(val.target.value)} value={prodImg} />
                      </FormGroup>

                      <button type="submit" className='buy_button'>Add</button>
                      <button className='float-right buy_button' onClick={clearInputs} >Clear</button>
                    </Form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AddProduct