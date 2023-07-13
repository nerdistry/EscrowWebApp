import React, { useState } from 'react'
import Footer from '../components/Footer/Footer'
import CommonSection from '../components/productUI/CommonSection'
import Helmet from '../components/Helmet/Helmet'
import { Col, Container, Row } from 'reactstrap'

import "../styles/products.css"

import products from '../assets/data/products'
import ProductList from '../components/productUI/ProductList'

const Category = () => {

  const [productData, setProductData] = useState(products);
  const categoryData = [
    {
      name: 'sofa',
      display: 'Sofas',
    },
    {
      name: 'mobile',
      display: 'Mobile',
    },
    {
      name: 'chair',
      display: 'Chair',
    },
    {
      name: 'watch',
      display: 'Watch',
    },
    {
      name: 'wireless',
      display: 'Wireless',
    }
  ];

  const handleFilter = (e) => {
    const filterValue = e.target.value

    // eslint-disable-next-line array-callback-return
    categoryData.map((category) => {
      if (filterValue === category.name) {
        const filteredProducts = products.filter(
          (item) => item.category === category.name
        );

        setProductData(filteredProducts);
      }
    })


  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()))

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
                  <option value="sofa">Sofas</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watches</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6'className='text-end'>
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