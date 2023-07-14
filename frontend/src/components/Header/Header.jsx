import React, { useRef, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";
import { Container, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { motion } from "framer-motion";
import useAuth from "../../custom-hooks/useAuth"
import api from '../../api/posts'

import Logo from "../../assets/images/logo_bg.png";
import userIcon from "../../assets/images/user-icon.png";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const nav_links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "products",
    display: "Products",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [apply, setApply] = useState(false);

  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)

  const { currentUser } = useAuth();
  const uName = currentUser?.displayName;
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    const getUser = async () => {
      try {
        const userId = currentUser?.uid;
        const response = await api.get(`/user/${userId}`);
        if (response.status === "200") {
          const user = (response.data.getaUser);
          setUserRole(user.role);
        }
        console.log(response.data.getaUser);

      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        } else {
          console.log(error.message);
        }
      }
    };

    getUser();
  }, []);

  const navigateToCart = () => {
    navigate('/cart');
  }

  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (headerRef.current) {
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
          headerRef.current.classList.add("sticky_header");
        } else {
          headerRef.current.classList.remove("sticky_header");
        }
      }
    })
  }
  const profileActionRef = useRef(null);

  const logout = async () => {
    try {
      // await api.get('/user/logout');

      signOut(auth).then(() => {
        toast.success("Logout Successful")
        window.location.reload();

      })
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc)
  });

  const toggleProfileActions = () => {
    if (profileActionRef.current) {
      profileActionRef.current.classList.toggle('show_profileActions');
    }
  };

  const applyAsVendor = (e) => {
    e.preventDefault();

    toast.success('Application Submitted: Wait for Approval');
  }

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={Logo} alt="logo" />
              <div>
                <h1>EasyBuy</h1>
              </div>
            </div>

            <div className="navigation">
              <ul className="menu">
                {
                  nav_links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''}>
                        {item.display}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon"><i className="ri-heart-line"></i><span className="badge">1</span></span>
              <motion.span whileTap={{ scale: 1.1 }} className="cart__icon" onClick={navigateToCart}><i className="ri-shopping-cart-2-fill"></i><span className="badge">{totalQuantity}</span></motion.span>
              <motion.div whileTap={{ scale: 1.05 }} whileHover={{ opacity: 0.7 }} className="fav__icon account wallet"><i className="ri-wallet-fill"></i>Connect</motion.div>

              <div className="profile">
                <motion.div whileTap={{ scale: 1.05 }} whileHover={{ opacity: 0.7 }} className="account" onClick={toggleProfileActions}>
                  <img src={currentUser ? (currentUser.photoURL ? currentUser.photoURL : userIcon) : userIcon} alt="" />&nbsp;
                  {currentUser ? uName : "Account"}
                </motion.div>

                <div className="account_actions" ref={profileActionRef} onClick={toggleProfileActions}>
                  {
                    currentUser ? (
                      <div>
                        <NavLink to="/profile" className="account_action">
                          <i className="ri-user-fill" />
                          Profile
                        </NavLink>
                        {
                          userRole === 'user' ? (
                            <span onClick={setApply} className="account_action">
                              <i className="ri-pencil-fill" />
                              Sell
                            </span>
                          ) : (
                            <a href="/vendor" className="account_action">
                              <i className="ri-pencil-fill" />
                              Sell
                            </a>
                          )
                        }


                        <span onClick={setModal} className="account_action">
                          <i className="ri-shut-down-line" />
                          Logout
                        </span>
                      </div>
                    ) : (
                      <div>
                        <NavLink to="login" className="account_action">
                          Login
                        </NavLink>
                        <NavLink to="signup" className="account_action">
                          Sign Up
                        </NavLink>
                      </div>
                    )
                  }
                </div>
              </div>

              <div className="mobile__menu">
                <span><i className="ri-menu-3-line"></i></span>
              </div>
            </div>
          </div>

        </Row>
      </Container>

      <Modal
        isOpen={apply}
        toggle={() => setApply(false)}
        backdrop="static"
        keyboard={false}
        className="popup"
      >
        <ModalHeader toggle={() => setApply(false)} className="popup_header">
          Apply as Vendor
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="form_group">
              <Label>Shop Name</Label>
              <input type="text" placeholder="My Shop" />
            </FormGroup>
            <FormGroup className="form_group">
              <Label>Shop Description</Label>
              <textarea type="text" placeholder="Description..." />
            </FormGroup>
            <FormGroup className="form_group">
              <Label>KRA Pin Certificate</Label>
              <input type="file" />
            </FormGroup>

            <motion.button
              whileTap={{ scale: 1.1 }}
              className="modal-info"
              onClick={(e) => {
                e.preventDefault();
                setApply(false);
              }}
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              whileTap={{ scale: 1.1 }}
              className="modal-info-bg"
              onClick={() => {
                setApply(false);
                applyAsVendor();
              }}
            >
              Apply
            </motion.button>
          </Form>
        </ModalBody>

      </Modal>

      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        backdrop="static"
        keyboard={false}
        className="popup"
      >
        <ModalHeader toggle={() => setModal(false)} className="popup_header">
          Logout
        </ModalHeader>
        <ModalBody>
          Are you sure you want to LogOut
        </ModalBody>
        <ModalFooter>
          <motion.button
            whileTap={{ scale: 1.1 }}
            className="modal-danger"
            onClick={() => {
              setModal(false);
              logout();
            }}
          >
            Logout
          </motion.button>
          <motion.button
            whileTap={{ scale: 1.1 }}
            className="modal-danger-bg"
            onClick={() => {
              setModal(false);
            }}
          >
            Cancel
          </motion.button>
        </ModalFooter>
      </Modal>
    </header>
  );
};

export default Header;