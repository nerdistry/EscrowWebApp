import React from 'react'
import { Col, Container, Form, FormGroup, Row } from 'reactstrap'
import Footer from '../components/Footer/Footer'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../components/productUI/CommonSection'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

import '../styles/checkout.css'

const Checkout = () => {

  const totalQty = useSelector((state) => state.cart.totalQuantity)
  const subTotal = useSelector((state) => state.cart.totalAmount)
  const shippingFee = 0.3 * subTotal;
  const totalAmount = subTotal + shippingFee;

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />

      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 fw-bold'>BIlling Information</h6>
              <Form className='billing_form'>
                <FormGroup className='form_group'>
                  <input type='text' placeholder='Username' />
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='text' placeholder='Email' />
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='text' placeholder='Phone Number' />
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='text' placeholder='Address' />
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='text' placeholder='Postal Code' />
                </FormGroup>
                <FormGroup className='form_group'>
                  <input type='text' placeholder='Town/City' />
                </FormGroup>
              </Form>
            </Col>

            <Col lg='4'>
              <div className="checkout_items">
                <h6>Total Qty: <span>{totalQty} items</span></h6>
                <h6>Subtotal: <span>${subTotal}</span></h6>
                <h6>Shipping Fee: <span>${shippingFee}</span></h6>
                <hr />
                <h4>Total Cost: <span>${totalAmount}</span></h4>

                <motion.button whileTap={{scale: 1.2}} className='buy_button checkout_btn w-100'>Place an Order</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </Helmet>
  )
}

export default Checkout