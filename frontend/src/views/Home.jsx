import React, { useState, useEffect } from 'react'
import "../styles/home.css"

import Helmet from '../components/Helmet/Helmet'
import heroImg from '../assets/images/hero.png'
import Services from '../components/services/services'
import ProductList from '../components/productUI/ProductList'
import products from '../assets/data/products'

import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer/Footer'

const Home = () => {

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === 'mobile'
    );

    const filteredNewArrivalProducts = products.filter(
      (item) => item.category === 'sofa'
    );

    setNewArrivals(filteredNewArrivalProducts);
    setTrendingProducts(filteredTrendingProducts);
  }, []);

  return (
    <Helmet title={"Home"}>
      <section className="hero_section">
        <Container>
          <Row>
            <Col lg="6" md="5">
              <div className="hero_content">
                <p>
                  Get the best of {year}
                </p>
                <h1>
                  Discover, buy and sell products
                </h1>
                <h3 className="hero_subtitle">
                  Discover the most outstanding products and get the chance to list
                  your own products and sell them!
                </h3>

                <Link to="/category"><motion.button whileTap={{ scale: 1.05 }} className='buy_button'>SHOP NOW</motion.button></Link>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero_img">
                <img src={heroImg} alt="" height={500} />
              </div>
            </Col>
          </Row>

        </Container>
      </section>

      <Services />

      <section className="trending_products">
        <h2 className="section_title">
          Trending Products
        </h2>
        <Container>
          <Row>
            <ProductList data={trendingProducts} />
          </Row>
        </Container>
      </section>

      <section className="new_arrivals">
        <h2 className="section_title">
          New Arrivals
        </h2>
        <Container>
          <Row>
            <ProductList data={newArrivals} />
          </Row>
        </Container>
      </section>

      <Footer />
    </Helmet>
  )
}

export default Home