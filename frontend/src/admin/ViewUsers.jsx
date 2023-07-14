import React, { useEffect, useState } from 'react'
import api from '../api/posts'
import '../styles/admin.css'
import { motion } from 'framer-motion'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { toast } from 'react-toastify'

const ViewUsers = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            const response = await api.get('/user/all-users');
            setAllUsers(response.data);
            console.log(response.data);
        }

        getUsers();
    }, [])

    const deleteProduct = async (e) => {
        e.preventDefault();

        toast.success("User deleted");
    }

    return (
        <div>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Users</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                                    <li className="breadcrumb-item active">Users</li>
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
                            <div className="col-12">
                                <div className="card">
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <table id="example2" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Username</th>
                                                    <th>Email Address</th>
                                                    <th>Phone No</th>
                                                    <th>Role</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allUsers.map((user, index) => (
                                                        <tr key={index}>
                                                            <td>{user.username}</td>
                                                            <td>{user.email}</td>
                                                            <td>{user.mobile}</td>
                                                            <td>
                                                                <span className={user.role}>{user.role}
                                                                </span>
                                                            </td>
                                                            <td className='action'>
                                                                <motion.a whileTap={{ scale: 1.2 }} href='#' className='info' >
                                                                    <i className="fas fa-edit" />
                                                                </motion.a>
                                                                <motion.span whileTap={{ scale: 1.2 }} className='danger' onClick={setModal}>
                                                                    <i className="fas fa-trash-alt" />
                                                                </motion.span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                    {/* /.card-body */}
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </section>
            </div>
            {/* /.content-wrapper */}
            <Modal
                isOpen={modal}
                toggle={() => setModal(false)}
                backdrop="static"
                keyboard={false}
                className="popup"
            >
                <ModalHeader toggle={() => setModal(false)} className="popup_header">
                    Delete Product
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this product
                </ModalBody>
                <ModalFooter>
                    <motion.button
                        whileTap={{ scale: 1.2 }}
                        className="modal-danger"
                        onClick={() => {
                            setModal(false);
                            deleteProduct();
                        }}
                    >
                        Delete
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 1.2 }}
                        className="modal-danger-bg"
                        onClick={() => {
                            setModal(false);
                        }}
                    >
                        Cancel
                    </motion.button>
                </ModalFooter>
            </Modal>
        </div>



    )
}

export default ViewUsers