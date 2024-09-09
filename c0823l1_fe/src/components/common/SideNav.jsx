import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import "../assets/bootstrap/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../assets/js/theme.js";
import "../assets/js/bs-init.js";
import UserService from "../service/UserService";

export function SideNav() {
    return (
        <nav className="navbar align-items-start sidebar sidebar-dark accordion p-0 navbar-dark" style={{ background: '#36b9cc' }}>
            <div className="container-fluid d-flex flex-column p-0">
                <p className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-shop" style={{ fontSize: '46px' }}>
                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z"></path>
                        </svg>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        <span>{UserService.isAdmin() ? 'ADMIN' : 'STAFF'}</span>
                    </div>
                </p>
                <hr className="sidebar-divider my-0" />
                <ul className="navbar-nav text-light" id="accordionSidebar">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/user">
                            <i className="bi bi-person"></i>
                            <span>Quản lý thông tin cá nhân</span>
                        </Link>
                    </li>
                    {UserService.isAdmin() && (
                        <li className="nav-item">
                            <a className="btn btn-link nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse-3" href="#collapse-3" role="button" id="adminDashboard">
                                <i className="bi bi-people"></i>
                                <span>Admin</span>
                            </a>
                            <div className="collapse" id="collapse-3">
                                <div className="bg-white border rounded pulse animated py-2 collapse-inner">
                                    <Link className="pulse animated collapse-item" to="/StaffList" style={{ background: 'rgb(255,255,255)', color: 'rgb(0,0,0)' }}>
                                        Quản lý nhân viên
                                    </Link>
                                </div>
                            </div>
                        </li>
                    )}
                    <li className="nav-item">
                        <a className="btn btn-link nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse-1" href="#collapse-1" role="button" id="buisnessStaff">
                            <i className="bi bi-briefcase"></i>
                            <span>Nhân viên kinh doanh</span>
                        </a>
                        <div className="collapse" id="collapse-1">
                            <div className="bg-white border rounded pulse animated py-2 collapse-inner">
                                <Link className="collapse-item" to="/BuisnessList">Quản lý kinh doanh</Link>
                                <Link className="collapse-item" to="/BuisnessList">Quản lý báo cáo</Link>
                                <NavLink className="collapse-item" to="/user/product">Xem thông tin hàng hóa</NavLink>
                                <Link className="collapse-item" to="/BuisnessList">Quản lý nhà cung cấp</Link>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-link nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse-4" href="#collapse-4" role="button" id="saleStaff">
                            <i className="bi bi-cart"></i>
                            <span>Nhân viên bán hàng</span>
                        </a>
                        <div className="collapse" id="collapse-4">
                            <div className="bg-white border rounded pulse animated py-2 collapse-inner">
                                <Link className="collapse-item" to="/SaleList">Quản lý bán hàng</Link>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="btn btn-link pulse animated nav-link" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapse-2" href="#collapse-2" role="button" id="storageStaff">
                            <i className="bi bi-box"></i>
                            <span>Thủ kho</span>
                        </a>
                        <div className="collapse" id="collapse-2">
                            <div className="bg-white border rounded pulse animated py-2 collapse-inner">
                                <Link className="collapse-item" to="/StorageList">Quản lý nhập/xuất kho</Link>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/logout" onClick={() => UserService.logout()}>
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Log out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}