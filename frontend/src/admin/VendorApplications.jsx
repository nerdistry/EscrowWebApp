import React from 'react'

const VendorApplications = () => {
    return (
        <div>
            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Vendor Applications</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Vendor Applications</li>
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
                                                    <th>User Name</th>
                                                    <th>Shop Name</th>
                                                    <th>Shop Description</th>
                                                    <th>KRA Cert</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Johnny Cruise</td>
                                                    <td>JC Electronics</td>
                                                    <td>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet rem quos placeat ipsa vero, incidunt deserunt soluta nemo sed, sit odit, porro unde voluptate praesentium provident dolore inventore? Aspernatur.
                                                    </td>
                                                    <td><strong>File</strong></td>
                                                    <td>
                                                        Approve / Reject
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Tony Cruise</td>
                                                    <td>JC Furnitures</td>
                                                    <td>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet rem quos placeat ipsa vero, incidunt deserunt soluta nemo sed, sit odit, porro unde voluptate praesentium provident dolore inventore? Aspernatur.
                                                    </td>
                                                    <td><strong>File</strong></td>
                                                    <td>
                                                        Approve / Reject
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Molly Karen</td>
                                                    <td>JC Electronics</td>
                                                    <td>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet rem quos placeat ipsa vero, incidunt deserunt soluta nemo sed, sit odit, porro unde voluptate praesentium provident dolore inventore? Aspernatur.
                                                    </td>
                                                    <td><strong>File</strong></td>
                                                    <td>
                                                        Approve / Reject
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Carol Jane</td>
                                                    <td>Happy Dale</td>
                                                    <td>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet rem quos placeat ipsa vero, incidunt deserunt soluta nemo sed, sit odit, porro unde voluptate praesentium provident dolore inventore? Aspernatur.
                                                    </td>
                                                    <td><strong>File</strong></td>
                                                    <td>
                                                        Approve / Reject
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Sonny Badu</td>
                                                    <td>SamSony Electronics</td>
                                                    <td>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet rem quos placeat ipsa vero, incidunt deserunt soluta nemo sed, sit odit, porro unde voluptate praesentium provident dolore inventore? Aspernatur.
                                                    </td>
                                                    <td><strong>File</strong></td>
                                                    <td>
                                                        Approve / Reject
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Louis Amani</td>
                                                    <td>Sound Pro</td>
                                                    <td>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet rem quos placeat ipsa vero, incidunt deserunt soluta nemo sed, sit odit, porro unde voluptate praesentium provident dolore inventore? Aspernatur.
                                                    </td>
                                                    <td><strong>File</strong></td>
                                                    <td>
                                                        Approve / Reject
                                                    </td>
                                                </tr>
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

export default VendorApplications