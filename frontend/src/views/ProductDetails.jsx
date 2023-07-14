import React, { useState } from 'react'
import Footer from '../components/Footer/Footer'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import products from '../assets/data/products'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/productUI/CommonSection'
import { motion } from 'framer-motion'
import ProductList from '../components/productUI/ProductList'
import { useDispatch } from "react-redux"
import { cartActions } from '../redux/slices/cartSlices'
import { toast } from 'react-toastify'
import NumberInput from 'semantic-ui-react-numberinput';

import "../styles/product-details.css"
import { useRef } from 'react'
import { useEffect } from 'react'
import api from '../api/posts'

const ProductDetails = () => {

  const [tab, setTab] = useState('desc');
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const dispatch = useDispatch()

  const [rating, setRating] = useState(null);

  const { id } = useParams()
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get('/product');
        setProducts(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }

    getProducts();
  },[]);
  
  const product = products.find(item => item._id === id)
  const { image, title, price, description, brand, reviews, category } = product

  const [quantity, setQuantity] = useState(1);

  const someReviews = reviews.slice(0, 5);

  const relatedProducts = products.filter(item => item.category === category)

  const submitHandler = (e) => {
    e.preventDefault();

    const reviewUserName = reviewUser.current.value
    const reviewUserMsg = reviewMsg.current.value

    const reviewObj = {
      username: reviewUserName,
      comment: reviewUserMsg,
      rating,
    }
    console.log(reviewObj);
    toast.success('Review submitted');
  }

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id,
      imgUrl: image ? image : '',
      title,
      price,
      quantity
    }))

    toast.success("Product added to cart")
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product])


  return (
    <Helmet title={title}>

      <CommonSection title={title} />

      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg="6">
              <img src={image} alt='' />
            </Col>
            <Col lg="6">
              <div className="product_details">
                <h2>{title}</h2>
                <div className="product_rating">
                  <div>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-s-fill"></i>
                    </span>
                    <span>
                      <i className="ri-star-half-s-fill"></i>
                    </span>
                  </div>

                  {/* <p>({avgRating} ratings)</p> */}
                </div>

                <div className='d-flex align-items-center gap-5'>
                  <span className='product_price'>${price}</span>
                  <span>By: __owner__</span>
                </div>
                <p className='mt-3'>{brand}</p>

                <div className="d-flex align-items-baseline gap-5">
                  <motion.button whileTap={{ scale: 1.2 }} className='buy_button cart_btn' onClick={addToCart}
                  >Add to Cart
                  </motion.button>
                  <NumberInput
                    className="numberInput"
                    minValue={0}
                    maxValue={10}
                    // buttonPlacement="leftAndRight"
                    value={quantity}
                    onChange={(num) => { setQuantity(num) }}
                    size="large"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab_wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active_tab' : ""}`} onClick={() => setTab('desc')}>Description</h6>
                <h6 className={`${tab === 'rev' ? 'active_tab' : ""}`} onClick={() => setTab('rev')}>Reviews ({reviews.length})</h6>
              </div>

              {
                tab === 'desc' ? (
                  <div className="tab_content mt-5">
                    <p>
                      {description}
                    </p>
                  </div>
                ) : (
                  <div className='product_review mt-5'>
                    <div className="review_wrapper">
                      <ul>
                        {

                          someReviews.map((item, index) => (
                            <li key={index}>
                              <span>
                                <i className="ri-star-s-fill"></i>
                                {item.rating} (rating)</span>
                              <p>{item.text}</p>
                            </li>
                          ))
                        }
                      </ul>
                    </div>

                    <div className="review_form">
                      <h3 className='text-center'>Add Review</h3>
                      <form action="" onSubmit={submitHandler}>
                        <div className="form_group">
                          <input type="text" placeholder="Enter name" ref={reviewUser} required />
                        </div>

                        <div className="form_group d-flex align-items-center gap-5 rating_grp">
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4<i className="ri-star-s-fill"></i></motion.span>
                          <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5<i className="ri-star-s-fill"></i></motion.span>
                        </div>

                        <div className="form_group">
                          <textarea rows={5} type="text" placeholder='Write review...' ref={reviewMsg} required ></textarea>
                        </div>

                        <motion.button whileTap={{ scale: 1.2 }} className='buy_button cart_btn'>Submit</motion.button>
                      </form>
                    </div>
                  </div>
                )
              }
            </Col>

            <Col lg="12" className='mt-5'>
              <h2 className='related_title'>You might also like</h2>
            </Col>

            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>

  )
}

export default ProductDetails