import React, { useState } from 'react'
import Footer from '../components/Footer/Footer'
import CommonSection from '../components/productUI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Row } from 'reactstrap'

import "../styles/products.css"

import ProductList from '../components/productUI/ProductList'
import { useEffect } from 'react'
import api from '../api/posts'

const Category = () => {

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get('/product');
        setProductData(response.data);
        setProducts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    const getCategory = async () => {
    try {
        const response = await api.get('/category');
        setCategoryData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
  }

    getCategory();
    getProducts();
  }, [])

  const [productData, setProductData] = useState([]);
  const [products, setProducts] = useState([]);
  
  const [categoryData, setCategoryData] = useState([]);

  const handleFilter = (e) => {
    const filterValue = e.target.value

    // eslint-disable-next-line array-callback-return
    categoryData.map((category) => {
      if (filterValue === category.title) {
        const filteredProducts = products.filter(
          (item) => item.category === category.title
        );

        setProductData(filteredProducts);
      }
    })

  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = products.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    setProductData(searchedProducts)
  }

  return (
    <Helmet title="Products">
      <CommonSection title={"PRODUCTS"} />

      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter_widget">
                <select onChange={handleFilter}>
                  <option>Filter By Category</option>
                  {
                    categoryData.map((item) => (
                      <option value={item.title} key={item._id}>{item.title}</option>
                    ))
                  }                 

                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className="filter_widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search_box">
                <input type="text" placeholder="Search" onChange={handleSearch} />
                <span><i className="ri-search-line"></i></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {
              productData.length === 0 ? <h1 className='text-center fs-4  '>No products Found!</h1>
                : <ProductList data={productData} />
            }
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  )
}

export default Category