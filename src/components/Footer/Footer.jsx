import React from 'react'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import './footer.css'
// import Logo from "../../assets/images/logo_bg.png";
import { Link } from 'react-router-dom';


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer_container">
      <Container>
        <Row>
          <Col lg="4">
            <div className="logo">
              <div>
                <h1 className='text-white'>EasyBuy</h1>
              </div>
            </div>
            <p className="footer_text mt-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum architecto tenetur deserunt autem earum minus ratione voluptatibus, magnam nostrum ab quas, sed facilis illo! Illum amet dolorum sequi maxime possimus.
            </p>
          </Col>

          <Col lg="3">
            <div className="footer_quick_links">
              <h4 className="quick_link_title">Top Categories</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="#">Mobile Phone</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="#">Mordern Sofas</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="#">Arm Chair</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="#">Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="2">
            <div className="footer_quick_links">
              <h4 className="quick_link_title">Useful Link</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="/home">Home</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="/category">Category</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to="/cart">Cart</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="3">
          <div className="footer_quick_links">
              <h4 className="quick_link_title">Developers</h4>
              <ListGroup className='mb-3 footer_contact'>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-award-line"></i></span>
                  <p>Arabella Mutende</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-award-line"></i></span>
                  <p>Bryan Lwaya</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span><i className="ri-map-pin-line"></i></span>
                  <p>Strathmore University, Ole Sangale Campus</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12">
            <p className="footer_copyright">
              Copyright &copy; {year} - EasyBuy . All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer