import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import avatar from "../assets/img/dogs/image2.jpeg";
import NavTop from "./NavTop";
import UpdateInfo from "../updatePage/UpdateInfo";
import UpdatePassword from "../updatePage/UpdatePassword";

function ProfilePage() {
    return (
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <NavTop />
                <div className="container-fluid">
                    <h3 className="text-dark mb-4">Thông tin cá nhân</h3>
                    <div className="row mb-3">
                        <div className="col-lg-4">
                            <div className="card mb-3">
                                <div className="card-body text-center shadow">
                                    <img className="rounded-circle mb-3 mt-4" alt="avatar" src={avatar} width="160" height="160" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <UpdateInfo />
                            <UpdatePassword />
                        </div>
                    </div>
                </div>
                <a className="border rounded d-inline scroll-to-top" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </div>
        </div>
    );
}

export default ProfilePage;