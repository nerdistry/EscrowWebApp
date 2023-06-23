import React, { useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import useAuth from "../../custom-hooks/useAuth"

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
    path: "category",
    display: "Category",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  // const navigate = useNavigate();
  const totalQuantity = useSelector(state => state.cart.totalQuantity)

  const { currentUser } = useAuth();
  console.log(currentUser);
  // const uName = currentUser?.displayName;

  const headerRef = useRef(null);
  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    })
  }
  const profileActionRef = useRef(null);

  const logout = () => {
    signOut(auth).then(() => {
      toast.success("Logout Successful")
      window.location.reload(); 

    }).catch((err) => {
      toast.error(err.message);
    })
  }

  useEffect(() => {
    stickyHeaderFunc()
    return () => window.removeEventListener("scroll", stickyHeaderFunc)
  });

  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle('show_profileActions');
  };

  return (
    <header className="header" ref={headerRef} >
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
              <span className="cart__icon"><i className="ri-shopping-cart-2-fill"></i><span className="badge">{totalQuantity}</span></span>

              <div className="profile">
                <motion.div whileTap={{ scale: 1.05 }} whileHover={{ opacity: 0.7 }} className="account" onClick={toggleProfileActions}>
                  <img src={currentUser ? (currentUser.photoURL ? currentUser.photoURL : userIcon) : userIcon} alt="" />&nbsp;
                  {currentUser ? currentUser.displayName : "Account"}
                </motion.div>

                <div className="account_actions" ref={profileActionRef} onClick={toggleProfileActions}>
                  {
                    currentUser ? (
                      <div>
                        <Link to="/profile" className="account_action">
                          Profile
                        </Link>
                        <span onClick={logout}>
                          Logout
                        </span>
                      </div>
                    ) : (
                      <div>
                        <Link to="login" className="account_action">
                          Login
                        </Link>
                        <Link to="signup" className="account_action">
                          Sign Up
                        </Link>
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
    </header>
  );
};

export default Header;
