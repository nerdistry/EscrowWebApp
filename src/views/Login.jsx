import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import "../styles/login-signup.css"
import googleImg from "../assets/images/google.png"
import facebookImg from "../assets/images/facebook.svg"
import twitterImg from "../assets/images/twitter.svg"

import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

//Auth
import { auth } from '../firebase'
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, sendEmailVerification, signInWithPopup } from 'firebase/auth'



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user);

            if (await user?.emailVerified) {
                setLoading(false);
                toast.success("Login Successful");
                navigate("/home")
            } else {
                setLoading(false);
                sendEmailVerification(user);
                toast.error("Verify your Email: Check your Email for verification link");
            }


        } catch (error) {
            setLoading(false);
            if (error.code === 'auth/user-not-found') {
                toast.error('User not found');
            } else {
                toast.error(error.code);
            }
        }
    }

    const signUpWithFacebook = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const fbprovider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, fbprovider);
            setUser(result.user);

            if (await user?.emailVerified) {
                setLoading(false);
                toast.success("Login Successful");
                navigate("/home");
                window.location.reload();
            } else {
                setLoading(false);
                sendEmailVerification(user);
                toast.error("Verify your Email: Check your Email for verification link");
            }
        } catch (error) {
            setLoading(false);
            console.log(error);

            if (error.code === 'auth/popup-closed-by-user') {
                console.log(error.message);
            } else if (error.code === 'auth/internal-error') {
                toast.error("Something went wrong. Try Again");
            } else if (error.code === 'auth/account-exists-with-different-credential') {
                toast.error("User already exists");
            } else {
                console.log(error.message);
                toast.error("Something went wrong. Try Again");
            }

        }

    }

    const signUpWithTwitter = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const twprovider = new TwitterAuthProvider();
            const result = await signInWithPopup(auth, twprovider);
            setUser(result.user);
            console.log(user);

            if (await user?.emailVerified) {
                setLoading(false);
                toast.success("Login Successful");
                navigate("/home");
                window.location.reload();
            } else {
                setLoading(false);
                sendEmailVerification(user);
                toast.error("Verify your Email: Check your Email for verification link");
            }

        } catch (error) {
            setLoading(false);
            console.log(error);

            if (error.code === 'auth/popup-closed-by-user') {
                console.log(error.message)
            } else if (error.code === 'auth/account-exists-with-different-credential') {
                toast.error("Account already exists");
            } else {
                toast.error("Something went wrong. Try Again.");
            }
        }
    }

    const signUpWithGoogle = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const googleprovider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, googleprovider);
            setUser(userCredential.user);
            console.log(userCredential);

            setLoading(false);
            toast.success("Login Successful");
            navigate('/home');
            window.location.reload();

        } catch (error) {
            setLoading(false);
            if (error.code === 'auth/popup-closed-by-user') {
                console.log(error.message)
            } else {
                console.log(error.message);
                toast.error(error.code);
            }
        };
    }

    const resetPassword = () => {
        
    }

    // const socialImage = [
    //     {
    //         social: googleImg,
    //         name: "Continue with Google",
    //     },
    //     {
    //         social: facebookImg,
    //         name: "Continue with Facebook",
    //     },
    //     {
    //         social: twitterImg,
    //         name: "Continue with Twitter",
    //     },
    // ];

    return (
        <Helmet title="Login">
            <section>
                <Container>
                    <Row>
                        {
                            loading ? (
                                <Col lg="12" className='text-center'>
                                    <h5 className='fw-bold'>Loading.....</h5>
                                </Col>
                            ) : (
                                <Col lg='6' className='m-auto text-center'>
                                    <h3 className='fw-bold '>Login</h3>

                                    <Form className="auth_form" onSubmit={login}>
                                        <FormGroup className='form-group'>
                                            <input type="email" placeholder="Enter your Email" value={email} onChange={text => setEmail(text.target.value)} />
                                        </FormGroup>

                                        <FormGroup className='form-group'>
                                            <input type="password" placeholder="Enter your password" value={password} onChange={text => setPassword(text.target.value)} />
                                        </FormGroup>

                                        <button type="submit" className='buy_button auth_btn mb-4'>Login</button>


                                        <div className='or'><hr />or<hr /></div>

                                        {/****************************   SOCIAL LOGIN   ****************************/}
                                        <div className="social mb-5">

                                            <motion.div whileTap={{ scale: 1.05 }} whileHover={{ opacity: 0.5 }} className="social_item" onClick={signUpWithGoogle}>
                                                <img
                                                    src={googleImg}
                                                    alt=""
                                                />
                                                <p>
                                                    <span>Continue with Google</span>
                                                </p>
                                            </motion.div>

                                            <motion.div whileTap={{ scale: 1.05 }} whileHover={{ opacity: 0.5 }} className="social_item" onClick={signUpWithFacebook}>
                                                <img
                                                    src={facebookImg}
                                                    alt=""
                                                />
                                                <p>
                                                    <span>Continue with Facebook</span>
                                                </p>
                                            </motion.div>

                                            <motion.div whileTap={{ scale: 1.05 }} whileHover={{ opacity: 0.5 }} className="social_item" onClick={signUpWithTwitter}>
                                                <img
                                                    src={twitterImg}
                                                    alt=""
                                                />
                                                <p>
                                                    <span>Continue with Twitter</span>
                                                </p>
                                            </motion.div>

                                        </div>
                                        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                                    </Form>
                                </Col>
                            )
                        }
                    </Row>
                </Container>
            </section>

        </Helmet>
    )
}

export default Login