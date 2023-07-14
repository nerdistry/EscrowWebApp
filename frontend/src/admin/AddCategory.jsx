import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, FormGroup, Label } from "reactstrap";
import "../styles/admin.css";
import api from "../api/posts";

const AddCategory = () => {
  const [category, setNewCategory] = useState("");
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/category/");
        setAllCategories(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };

    getCategories();
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
  
    try {
      const categoryValue = category;
      console.log('Category:', categoryValue);
  
      const requestData = {
        title: categoryValue,
      };
      console.log('Request data:', requestData);
  
      const response = await api.post('/category/create-category', requestData);
  
      console.log('Response data:', response.data);
  
      toast.success('Category added successfully');
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
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
                <h1 className="m-0">Add Category</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Add Category</li>
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
                    <Form className="billing_form" onSubmit={addCategory}>
                      <FormGroup className="form_group">
                        <Label for="cat">Category Name</Label>
                        <input
                          type="text"
                          id="cat"
                          placeholder="Shoes / mobile / furniture..."
                          required
                          value={category}
                          onChange={(event) =>
                            setNewCategory(event.target.value)
                          }
                        />
                      </FormGroup>

                      <button type="submit" className="buy_button">
                        Add
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {/* /.card-header */}
                  <div className="card-body">
                    <h3>Categories</h3>
                    <br />
                    <table className="table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Category Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allCategories.map((item, index) => (
                          <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.title}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default AddCategory;
