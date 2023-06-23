import { sendPasswordResetEmail } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Col, Container, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import { auth } from '../firebase'
import "../styles/login-signup.css"


const ResetPassword = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const [email, setEmail] = useState();
    const [modal, setModal] = useState(false)

    const reset_password = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            setModal(true);
            toast.success('Password reset email sent successfully');
        } catch (error) {
            setLoading(false);
            toast.error(error.code);
        }
    }

    return (
        <Helmet title="Reset Password">
            <section>
                <Container>
                    <Row>

                        <Col lg='6' className='m-auto text-center'>
                            <h3 className='fw-bold '>Forgot Password</h3>

                            <Form className="auth_form" onSubmit={reset_password}>
                                <FormGroup className='form-group'>
                                    <input type="email" placeholder="Enter your Email" value={email} onChange={text => setEmail(text.target.value)} />
                                </FormGroup>

                                <button type="submit" className='buy_button auth_btn reset_btn mb-4'>
                                    {
                                        loading && (
                                            <div className='loader'></div>
                                        )
                                    }
                                    Reset Password</button>

                                <p><Link to="/login">Back to Login</Link></p>
                            </Form>
                        </Col>

                    </Row>
                </Container>
            </section>

            <Modal isOpen={modal} toggle={() => setModal(false)} backdrop="static" keyboard={false} className='popup'>

                <ModalHeader toggle={() => setModal(false)} className='popup_header'>
                    Password reset email sent
                </ModalHeader>
                <ModalBody className='popup_body'>
                    <p>Check your Email for a password reset link</p>
                </ModalBody>
                <ModalFooter>
                    <button onClick={() => {
                        setModal(false);
                        navigate("/login");
                    }} className='popup_btn'>
                        Back to Login
                    </button>
                </ModalFooter>
            </Modal>
        </Helmet>
    )
}

export default ResetPassword