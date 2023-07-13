import React, { useState } from 'react'
import { Form, FormGroup, Label } from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import useAuth from '../custom-hooks/useAuth'
import { toast } from 'react-toastify'

const AdminProfile = () => {

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
        <Helmet title='Profile'>
            <div>
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Add Product</h1>
                                </div>{/* /.col */}
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                                        <li className="breadcrumb-item active">Add Product</li>
                                    </ol>
                                </div>{/* /.col */}
                            </div>{/* /.row */}
                        </div>{/* /.container-fluid */}
                    </div>
                    {/* /.content-header */}
                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-8">
                                    <div className="card">
                                        {/* /.card-header */}
                                        <div className="card-body">

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

                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 d-flex align-items-center">
                                    <img src={currentUser?.photoURL} alt="" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </Helmet>
    )
}

export default AdminProfile