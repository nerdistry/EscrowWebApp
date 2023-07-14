import React, { useEffect, useState } from 'react'
import useAuth from '../custom-hooks/useAuth'
import api from '../api/posts'
import { motion } from 'framer-motion';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { toast } from 'react-toastify';

const ViewVendors = () => {

    const [modal, setModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [vendor, setVendor] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try{
                const response = await api.get('/user/all-users');
                setUsers(response.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const filterUsers = users.filter(item => item.role === "vendor")
        setVendor(filterUsers.map(item => item.applyAsVendor));
        getUsers();
    }, [])

    const blockVendor = () => {

        toast.success('Vendor blocked');
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
                                <h1 className="m-0">Vendors</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Vendors</li>
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
                                        <table id="example1" className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Shop Name</th>
                                                    <th>No of Products</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    vendor.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>My shop</td>
                                                            <td>Awesome</td>
                                                            <td>4</td>
                                                            <td><motion.span whileTap={{ scale: 1.2 }} className='danger' onClick={setModal}>
                                                                <i className="fas fa-times-hexagon" />
                                                            </motion.span></td>
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
                            blockVendor();
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

export default ViewVendors