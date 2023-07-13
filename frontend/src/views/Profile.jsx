import React, { useState } from 'react'
import Footer from '../components/Footer/Footer'
import { Col, Container, Form, FormGroup, Label, Row } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import useAuth from '../custom-hooks/useAuth'
import { toast } from 'react-toastify'

const Profile = () => {
    const [disable, setDisable] = useState(true);
    const { currentUser } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const updateProfile = async (e) => {
        e.preventDefault();

        toast.success('Profile updated');
    }

    return (
        <Helmet title="Profile">
            <div>
                <section>
                    <Container>
                        <Row>
                            <Col lg='8'>
                                <h3 className='mb-4 fw-bold'>My Profile</h3>
                                <Form className='billing_form' onSubmit={updateProfile}>
                                    <FormGroup className='form_group'>
                                        <Label>Username</Label>
                                        <input type='text' placeholder='Username' disabled={disable} value={username} onChange={(text) => { setUsername(text.target.value) }} />
                                    </FormGroup>
                                    <FormGroup className='form_group'>
                                        <Label>Email</Label>
                                        <input type='text' placeholder='Email' disabled={disable} value={email} onChange={(text) => { setEmail(text.target.value) }} />
                                    </FormGroup>
                                    <FormGroup className='form_group'>
                                        <Label>Phone Number</Label>
                                        <input type='text' placeholder='Phone Number' disabled={disable} value={phoneNo} onChange={(text) => { setPhoneNo(text.target.value) }} />
                                    </FormGroup>
                                    <FormGroup className='form_group'>
                                        <Label>Profile Photo</Label>
                                        <input type='file' disabled={disable} value={photoURL} onChange={(text) => { setPhotoURL(text.target.value) }} />
                                    </FormGroup>

                                    {
                                        disable === true ? (
                                            <button
                                                className='buy_button'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setDisable(false);
                                                }}
                                            >
                                                Enable Edit
                                            </button>
                                        ) : (
                                            <button type="submit" className='buy_button' onClick={(e) => {
                                                setDisable(true);
                                            }}>Update Profile</button>
                                        )
                                    }
                                </Form>
                            </Col>

                            <Col lg='4 d-flex align-items-center'>
                                <img src={currentUser?.photoURL} alt="" />
                            </Col>
                        </Row>
                    </Container>
                </section>
                <Footer />
            </div>
        </Helmet>
    )
}

export default Profile