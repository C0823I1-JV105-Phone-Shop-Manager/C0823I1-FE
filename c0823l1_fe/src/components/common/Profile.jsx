import React, { useState, useEffect } from 'react';
import UserService from '../service/UserService';
import "bootstrap-icons/font/bootstrap-icons.css"; // Correctly import Bootstrap Icons CSS
import "../assets/bootstrap/css/bootstrap.min.css";
import avatar from "../assets/img/dogs/image2.jpeg";
import NavTop from "./NavTop";

function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourProfile(token);
            setProfileInfo(response.user);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    return (
        <>
            <div className="d-flex flex-column" id="content-wrapper">
                <div id="content">
                  <NavTop/>
                    <div className="container-fluid">
                        <h3 className="text-dark mb-4">Thông tin cá nhân</h3>
                        <div className="row mb-3">
                            <div className="col-lg-4">
                                <div className="card mb-3">
                                    <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src={avatar} width="160" height="160" /></div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="row">
                                    <div className="col">
                                        <div className="card shadow mb-3">
                                            <div className="card-header py-3">
                                                <p className="m-0 fw-bold text-info">Thông tin cá nhân</p>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label" htmlFor="username"><strong>Họ và tên</strong></label><input className="form-control" type="text" id="full_name" placeholder="Nguyễn văn A" name="full_name" /></div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label" htmlFor="email"><strong>Ngày sinh</strong></label><input className="form-control" id="dob" type="date" /></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>Số điện thoại</strong></label><input className="form-control" type="text" id="first_name" placeholder="09088xxxxx" name="phone_number" /></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label" htmlFor="first_name-1"><strong>Địa chỉ</strong></label><input className="form-control" type="text" id="first_name-1" placeholder="xxx Hoàng Diệu" name="address" /></div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="mb-3"><label className="form-label" htmlFor="last_name"><strong>Công việc</strong></label><input className="form-control" disabled={true} type="text" id="job_role" placeholder="Nhân viên..." name="job_role" /></div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3"><button className="btn btn-info btn-sm link-light" type="submit">Lưu thông tin thay đổi</button></div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="card shadow">
                                            <div className="card-header py-3">
                                                <p className="m-0 fw-bold text-info">Thay đổi mật khẩu</p>
                                            </div>
                                            <div className="card-body">
                                                <form>
                                                    <div className="mb-3"><label className="form-label" htmlFor="address"><strong>Mật khẩu cũ&nbsp;</strong></label><input className="form-control" type="text" id="old_password" placeholder="" name="old_password" /></div>
                                                    <div className="mb-3"><label className="form-label" htmlFor="address-2"><strong>Mật khẩu mới</strong></label><input className="form-control" type="text" id="new_password" placeholder="" name="new_password" /></div>
                                                    <div className="mb-3"><label className="form-label" htmlFor="address-1"><strong>Nhập lại mật khẩu mới</strong></label><input className="form-control" type="text" id="confirm_password" placeholder="" name="confirm_password" /></div>
                                                    <div className="mb-3"><button className="btn btn-sm btn-info" type="submit" style={{ color: 'rgb(255,255,255)' }}>Lưu thông tin thay đổi</button></div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card shadow mb-5"></div>
                    </div>
                    <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;