import React, { useEffect, useState } from 'react'
import api from '../api/posts'
import '../styles/admin.css'

const ViewUsers = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await api.get('/user/all-users');
            setAllUsers(response.data);
            console.log(response.data);
        }

        getUsers();
    }, [])



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
                                        <table id="example1" className="table table-bordered table-striped">
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
                                                                <select defaultValue={user.role} className={user.role}>
                                                                    <option value="admin" id='admin'>admin</option>
                                                                    <option value="vendor" id='vendor'>vendor</option>
                                                                    <option value="user" id='user'>user</option>
                                                                </select>
                                                            </td>
                                                            <td>Edit Block Delete</td>
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

        </div>



    )
}

export default ViewUsers