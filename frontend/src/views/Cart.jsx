import React from 'react'
import Footer from '../components/Footer/Footer'
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/productUI/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import { cartActions } from '../redux/slices/cartSlices'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  // const navigateToProducts = () => {
  //   navigate('/products');
  // }

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />

      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {
                cartItems.length === 0 ? (
                  <div className='no_products'>
                    <h2 className='fs-4'>No items added to Cart</h2>
                    {/* <button className='buy_button' onClick={navigateToProducts}>Continue Shopping <i className="ri-arrow-right-line"></i></button> */}
                  </div>
                ) : (
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    <tbody>

                      {
                        cartItems.map((item, index) => (
                          <Tr key={index} item={item} />
                        ))
                      }

                    </tbody>
                  </table>
                )
              }

            </Col>

            <Col lg='3'>
              <div className="subtotal_wrapper">
                <div className='d-flex align-items-center justify-content-between'>
                  <h6>Subtotal</h6>
                  <span className='fs-4 fw-bold'>${totalAmount}</span>
                </div>
                <div className='nav_btns'>
                  <Link to='/checkout' className='buy_button'>Checkout</Link>
                  <Link to='/products' className='buy_button'>Continue Shopping</Link>

                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </Helmet>
  )
}

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id))
  }

  return (
    <tr>
      <td>
        <Link to={`/product/${item.id}`} ><img src={item.imgUrl} alt='' /></Link>
      </td>
      <td><Link to={`/product/${item.id}`} >{item.productName}</Link></td>
      <td>${item.price}</td>
      <td>{item.quantity}</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="ri-delete-bin-fill"
        ></motion.i>
      </td>
    </tr>


  );
}

export default Cart