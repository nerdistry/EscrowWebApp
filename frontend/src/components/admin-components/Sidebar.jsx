import React from 'react'
import '../../styles/admin.css'
import Logo from '../../assets/images/logo.png'

const Sidebar = () => {
    return (
        <div>
            {/* Main Sidebar Container */}
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href='/admin' className="brand-link">
                    <img src={Logo} alt='' className="brand-image" />
                    <span className="brand-text font-weight-light">EasyBuy</span>
                </a>

                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt='' />
                        </div>
                        <div className="info">
                            <a href='/admin' className="d-block">Bryan Mutinda</a>
                        </div>
                    </div>
                    {/* SidebarSearch Form */}
                    <div className="form-inline">
                        <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            
                            <li className="nav-item">
                                <a href='/admin' className="nav-link active">
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                        Dashboard
                                    </p>
                                </a>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    <i className="nav-icon fas fa-th" />
                                    <p>
                                        Management
                                        <i className="right fas fa-angle-left" />
                                        <span className="right badge badge-danger">New</span>
                                    </p>
                                </div>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href='/admin/view-users' className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Users</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <div className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>
                                                Vendors
                                                <i className="right fas fa-angle-left" />
                                                <span className="right badge badge-danger">New</span>
                                            </p>
                                        </div>
                                        <ul className="nav nav-treeview">
                                            <li className="nav-item">
                                                <a href='/admin/vendor-application' className="nav-link">
                                                    <i className="far fa-dot-circle nav-icon" />
                                                    <p>New Applications</p>
                                                    <span className="badge badge-info right">6</span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a href='/admin/view-vendors' className="nav-link">
                                                    <i className="far fa-dot-circle nav-icon" />
                                                    <p>Vendor Shops</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                        Products
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </div>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href='/admin/view-products' className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>View Products</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href='/vendor/add-category' className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Category</p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href='/vendor/add-product' className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Add Product</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link">
                                    <i className="nav-icon fas fa-table" />
                                    <p>
                                        Sales
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </div>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <a href='/vendor/view-orders' className="nav-link">
                                            <i className="nav-icon fas fa-tags" />
                                            <p>
                                                Orders
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href='/admin/view-transactions' className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>
                                                Transactions
                                            </p>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href='/admin/view-stats' className="nav-link">
                                            <i className="nav-icon fas fa-chart-pie" />
                                            <p>
                                                Statistics
                                            </p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a href='#' className="nav-link">
                                    <i className="nav-icon fas fa-power-off" />
                                    <p>
                                        LogOut
                                    </p>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside >

        </div >
    )
}

export default Sidebar