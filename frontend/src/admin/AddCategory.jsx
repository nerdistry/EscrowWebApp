import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Form, FormGroup, Label } from 'reactstrap'
import '../styles/admin.css'

const AddCategory = () => {

    const[newCategory,setNewCategory] = useState('')

    const addCategory = (e) => {
      e.preventDefault();
      
      const categoryObj = {
        category: newCategory,
      }

      console.log(categoryObj);
      toast.success("Category added successfully");
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
                <h1 className="m-0">Add Category</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item active">Add Category</li>
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

                    <Form className='billing_form' onSubmit={addCategory}>
                      <FormGroup className='form_group'>
                        <Label>Category Name</Label>
                        <input type='text' placeholder='Shoes / mobile / furniture...' required onChange={(text) => setNewCategory(text.target.value)}/>
                      </FormGroup>
                      
                      <button type="submit" className='buy_button'>Add</button>
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

export default AddCategory