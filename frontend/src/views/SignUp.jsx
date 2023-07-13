import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import "../styles/login-signup.css";
import googleImg from "../assets/images/google.png";
import facebookImg from "../assets/images/facebook.svg";
import twitterImg from "../assets/images/twitter.svg";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
//Auth
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

// import ConfirmPasswordInputField from "./ConfirmPasswordInputField";
// import { ref, uploadBytesResumable, getDowloadURL } from 'firebase/storage'

/********ADDED*******/

// import PhoneInput from 'react-phone-number-input'
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

/********DONE*******/

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /********ADDED*******/
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const [phoneNumber, setPhoneNumber] = useState("");
  /********DONE*******/

  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [modal, setModal] = useState(false);

  /********ADDED*******/

  const handleEmailInput = (e) => {
    setEmail(e.target.value);

    if (!emailRegex.test(e.target.value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);

    if (!passwordRegex.test(e.target.value)) {
      setPasswordError(
        "Password must be 6-20 characters and contain at least one number, one uppercase letter, and one lowercase letter"
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);

    if (e.target.value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  }; /********DONE*******/

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      sendEmailVerification(user);
      setModal(true);

      updateProfile(user, {
        displayName: username,
      });

      setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        username: username,
        email,
        phoneNumber,
        photoURL: null,
        phoneNo: null,
        userRole: "buyer", // ?????????????????????????????????????????????????????
      });

      // const storageRef = ref(storage, `images/${Date.now() + username}`);
      // const uploadTask = uploadBytesResumable(storageRef, userCredential.user.photoURL);

      // uploadTask.on((error)=>{
      //   toast.error(error.message)
      // }, ()=>{
      //   getDowloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
      //    await updateProfile(user, {
      //       photoURL: downloadURL,
      //     })
      //   })
      // })

      setLoading(false);
      toast.success(
        "Account created successfully: Check email for activation link."
      );
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/weak-password") {
        toast.error("Weak Password");
      } else if (error.code === "auth/email-already-in-use") {
        toast.error("Account already exists");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        toast.error("Account already exists");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid Email");
      } else {
        console.log(error.message);
        toast.error(error.message);
        toast.error("Something went wrong. Try Again");
      }
    }
  };

  const signUpWithFacebook = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fbprovider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, fbprovider);
      const user = result.user;

      const accessToken = result.access_token;
      fetch(
        `https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`
      )
        .then((response) => response.blob())
        .then((blob) => {
          setProfilePicture(URL.createObjectURL(blob));
          updateProfile(user, {
            photoURL: profilePicture,
          });
        });

      setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : null,
        phoneNo: user.phoneNumber,
        userRole: "buyer",
      });

      setLoading(false);
      toast.success("Account created successfully");
      navigate("/home");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);

      if (error.code === "auth/popup-closed-by-user") {
        console.log(error.message);
      } else if (error.code === "auth/internal-error") {
        toast.error("Something went wrong. Try Again");
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        toast.error("Account already exists");
      } else {
        console.log(error.message);
        toast.error("Something went wrong. Try Again");
      }
    }
  };

  const signUpWithTwitter = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const twprovider = new TwitterAuthProvider();
      const result = await signInWithPopup(auth, twprovider);
      const user = result.user;
      console.log(user);

      setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : null,
        phoneNo: user.phoneNumber,
        userRole: "buyer",
      });

      toast.success("Account created successfully");
      navigate("/home");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);

      if (error.code === "auth/popup-closed-by-user") {
        console.log(error.message);
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        toast.error("Account already exists");
      } else {
        toast.error("Something went wrong. Try Again.");
      }
    }
  };

  const signUpWithGoogle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const googleprovider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, googleprovider);
      const user = userCredential.user;
      console.log(userCredential);

      setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        username: user.displayName,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : null,
        phoneNo: user.phoneNumber,
        userRole: "buyer",
      });

      setLoading(false);
      toast.success("Account created successfully");
      navigate("/home");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/popup-closed-by-user") {
        console.log(error.message);
      } else {
        console.log(error.message);
        toast.error(error.code);
      }
    }
  };

  // const socialImage = [
  //   {
  //     social: googleImg,
  //     name: "Continue with Google",
  //     func: { signUpWithGoogle }
  //   },
  //   {
  //     social: facebookImg,
  //     name: "Continue with Facebook",
  //     func: {}
  //   },
  //   {
  //     social: twitterImg,
  //     name: "Continue with Twitter",
  //     func: {}
  //   },
  // ];

  return (
    <Helmet title="SignUp">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading.....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold ">Sign Up</h3>

                <Form className="auth_form" onSubmit={signup}>
                  <FormGroup className="form-group">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(text) => setUsername(text.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <input
                      type="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={handleEmailInput}
                    />
                    {emailError && (
                      <div className="error" style={{ color: "orange" }}>
                        {emailError}
                      </div>
                    )}
                  </FormGroup>

                  <FormGroup className="form-group">
                    <input
                      type="password"
                      placeholder="Create password"
                      value={password}
                      onChange={handlePasswordInput}
                    />
                    {passwordError && (
                      <div className="error" style={{ color: "orange" }}>
                        {passwordError}
                      </div>
                    )}
                  </FormGroup>

                  {/**** ADDED ********/}

                  <FormGroup className="form-group">
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordInput}
                    />
                    {confirmPasswordError && (
                      <div className="error" style={{ color: "orange" }}>
                        {confirmPasswordError}
                      </div>
                    )}
                  </FormGroup>

                  {/* <FormGroup className='form-group'>
                     <PhoneInput placeholder="Enter phone number" value={phoneNumber} onChange={setPhoneNumber}/>
                     </FormGroup> */}

                  <FormGroup className="form-group">
                    <PhoneInput
                      country={"ke"} // default selected country, can be changed according to your preference
                      value={phoneNumber}
                      onChange={(phone) => setPhoneNumber(phone)}
                    />
                  </FormGroup>

                  <button type="submit" className="buy_button auth_btn mb-4">
                    Sign Up
                  </button>

                  <div className="or">
                    <hr />
                    or
                    <hr />
                  </div>

                  {/******************* SOCIAL *********************/}

                  <div className="social mb-5">
                    <motion.div
                      whileTap={{ scale: 1.05 }}
                      whileHover={{ opacity: 0.5 }}
                      className="social_item"
                      onClick={signUpWithGoogle}
                    >
                      <img src={googleImg} alt="" />
                      <p>
                        <span>Continue with Google</span>
                      </p>
                    </motion.div>

                    <motion.div
                      whileTap={{ scale: 1.05 }}
                      whileHover={{ opacity: 0.5 }}
                      className="social_item"
                      onClick={signUpWithFacebook}
                    >
                      <img src={facebookImg} alt="" />
                      <p>
                        <span>Continue with Facebook</span>
                      </p>
                    </motion.div>

                    <motion.div
                      whileTap={{ scale: 1.05 }}
                      whileHover={{ opacity: 0.5 }}
                      className="social_item"
                      onClick={signUpWithTwitter}
                    >
                      <img src={twitterImg} alt="" />
                      <p>
                        <span>Continue with Twitter</span>
                      </p>
                    </motion.div>
                  </div>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        backdrop="static"
        keyboard={false}
        className="popup"
      >
        <ModalHeader toggle={() => setModal(false)} className="popup_header">
          Verify Email
        </ModalHeader>
        <ModalBody className="popup_body">
          <p>Click the Link send to your Email to verify your account</p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              setModal(false);
              navigate("/login");
            }}
            className="popup_btn"
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    </Helmet>
  );
};

export default SignUp;
