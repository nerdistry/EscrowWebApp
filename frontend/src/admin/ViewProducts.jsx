import React, { useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { motion } from 'framer-motion'
import products from '../assets/data/products'
import '../styles/admin.css'
import { toast } from 'react-toastify'

const ViewProducts = () => {
    const [modal, setModal] = useState(false);
    
    const deleteProduct = () => {
        toast.success("Product deleted");
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
                                <h1 className="m-0">Products</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/admin">Home</a></li>
                                    <li className="breadcrumb-item active">Products</li>
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
                                                    <th />
                                                    <th>Product Name</th>
                                                    <th>Short Description</th>
                                                    <th>Price</th>
                                                    <th>Category</th>
                                                    <th>No in Stock</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products.map((item, index) => (
                                                        <tr key={index}>
                                                            <td><img src={item.imgUrl} alt="" /></td>
                                                            <td>{item.productName}</td>
                                                            <td>{item.shortDesc}</td>
                                                            <td>${item.price}</td>
                                                            <td>{item.category}</td>
                                                            <td>20</td>
                                                            <td className='action'>
                                                                <motion.a whileTap={{ scale: 1.2 }} href={`/admin/update-product/${item.id}`} className='info' >
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
            {/* /.content-wrapper */}

        </div>
    )
}

export default ViewProducts