import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from '../service/UserService';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import avatar from "../assets/img/dogs/image2.jpeg";
import NavTop from "./NavTop";

const isLeapYear = (year) => {
  if (year % 4 !== 0) return false;
  if (year % 100 !== 0) return true;
  if (year % 400 !== 0) return false;
  return true;
};

const checkFormatDate = (date) => {
  const dateArray = date.split('/');
  if (dateArray.length !== 3) return false;
  const [year, month, day] = dateArray;
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) return false;
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) return false;
  if (monthNum < 1 || monthNum > 12) return false;
  if (dayNum < 1 || dayNum > 31) return false;
  if (monthNum === 2) {
    if (isLeapYear(yearNum)) {
      if (dayNum > 29) return false;
    } else {
      if (dayNum > 28) return false;
    }
  }
  if ([4, 6, 9, 11].includes(monthNum) && dayNum > 30) return false;
  return true;
};

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Họ và tên là bắt buộc'),
  dob: Yup.string()
    .required('Ngày sinh là bắt buộc')
    .matches(/^\d{4}\/\d{2}\/\d{2}$/, 'Ngày sinh phải có định dạng YYYY/MM/DD')
    .test('check-date', 'Ngày sinh không hợp lệ', (value) => checkFormatDate(value)),
  phoneNumber: Yup.string().required('Số điện thoại là bắt buộc'),
  address: Yup.string().required('Địa chỉ là bắt buộc')
});

const validationSchemaPassword = Yup.object().shape({
  old_password: Yup.string(),
  new_password: Yup.string().when('old_password', {
    is: (val) => val && val.length > 0,
    then: Yup.string().required('Mật khẩu mới là bắt buộc')
  }),
  confirm_password: Yup.string().oneOf([Yup.ref('new_password'), null], 'Mật khẩu xác nhận không khớp')
});

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({});
  const [password, setPassword] = useState({
    old_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfileInfo();
    console.log(profileInfo);
  }, []);

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.userDto);
    } catch (error) {
      console.error('Error fetching profile information:', error);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await UserService.updateUser(token, values);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPassword = async (values) => {
    setLoading(true);
    if (values.old_password === profileInfo.password) {
      try {
        const token = localStorage.getItem('token');
        await UserService.updateUser(token, values);
        alert('Password updated successfully');
      } catch (error) {
        console.error('Error updating profile:', error);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Mật khẩu cũ không đúng');
      setLoading(false);
    }
  };

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
              <Formik
                enableReinitialize
                initialValues={{
                  fullName: profileInfo.fullName,
                  dob: profileInfo.dob,
                  phoneNumber: profileInfo.phoneNumber,
                  address: profileInfo.address,
                  jobRole: profileInfo.role === "ADMIN" ? "Quản trị viên" : "Nhân viên"
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values }) => (
                  <Form>
                    <div className="row">
                      <div className="col">
                        <div className="card shadow mb-3">
                          <div className="card-header py-3">
                            <p className="m-0 fw-bold text-info">Thông tin cá nhân</p>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="fullName"><strong>Họ và tên</strong></label>
                                  <Field className="form-control" type="text" id="fullName" name="fullName" placeholder="Nguyễn văn A" />
                                  <ErrorMessage name="fullName" component="div" className="error-message" />
                                </div>
                              </div>
                              <div className="col">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="dob"><strong>Ngày sinh</strong></label>
                                  <Field className="form-control" type="text" id="dob" name="dob" placeholder="yyyy/mm/dd" />
                                  <ErrorMessage name="dob" component="div" className="error-message" />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="phoneNumber"><strong>Số điện thoại</strong></label>
                                  <Field className="form-control" type="text" id="phoneNumber" name="phoneNumber" placeholder="09088xxxxx" />
                                  <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="address"><strong>Địa chỉ</strong></label>
                                  <Field className="form-control" type="text" id="address" name="address" placeholder="xxx Hoàng Diệu" />
                                  <ErrorMessage name="address" component="div" className="error-message" />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className="mb-3">
                                  <label className="form-label" htmlFor="jobRole"><strong>Công việc</strong></label>
                                  <Field className="form-control" type="text" id="jobRole" name="jobRole" placeholder="Nhân viên..." disabled />
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <button className="btn btn-info btn-sm link-light" type="submit" disabled={loading}>
                                {loading ? 'Loading...' : 'Lưu thông tin thay đổi'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
              <Formik initialValues={password} onSubmit={handleSubmitPassword} validationSchema={validationSchemaPassword}>
                <div className="card shadow">
                  <div className="card-header py-3">
                    <p className="m-0 fw-bold text-info">Thay đổi mật khẩu</p>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="old_password"><strong>Mật khẩu cũ&nbsp;</strong></label>
                      <Field className="form-control" type="password" id="old_password" name="old_password" />
                      <ErrorMessage name="old_password" component="div" className="error-message" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="new_password"><strong>Mật khẩu mới</strong></label>
                      <Field className="form-control" type="password" id="new_password" name="new_password" />
                      <ErrorMessage name="new_password" component="div" className="error-message" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="confirm_password"><strong>Nhập lại mật khẩu mới</strong></label>
                      <Field className="form-control" type="password" id="confirm_password" name="confirm_password" />
                      <ErrorMessage name="confirm_password" component="div" className="error-message" />
                    </div>
                    <div className="mb-3">
                      <button className="btn btn-sm btn-info" type="submit" style={{ color: 'rgb(255,255,255)' }} disabled={loading}>
                        {loading ? 'Loading...' : 'Lưu thông tin thay đổi'}
                      </button>
                    </div>
                  </div>
                </div>
              </Formik>
            </div>
          </div>
        </div>
        <a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
      </div>
    </div>
  );
}

export default ProfilePage;