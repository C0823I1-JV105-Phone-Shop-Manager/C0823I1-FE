import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from '../service/UserService';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import Swal from 'sweetalert2';

const isLeapYear = (year) => {
  if (year % 4 !== 0) return false;
  if (year % 100 !== 0) return true;
  if (year % 400 !== 0) return false;
  return true;
};

const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Họ và tên là bắt buộc')
        .matches(/^[a-zA-Z\s]*$/, 'Họ và tên không hợp lệ'),
    dob: Yup.string()
    .required('Ngày sinh là bắt buộc')
    .matches(/^\d{4}\/\d{2}\/\d{2}$/, 'Ngày sinh phải có định dạng YYYY/MM/DD')
    .test('valid-date', 'Ngày sinh không hợp lệ', (value) => {
        if (!value) return false;
        const [year, month, day] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        const currentYear = new Date().getFullYear();
        if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
            return false;
        }
        if (year >= currentYear - 18) {
            return false;
        }
        if (month === 2 && day === 29 && !isLeapYear(year)) {
            return false;
        }
        return true;
    }),
    phoneNumber: Yup.string().required('Số điện thoại là bắt buộc')
        .matches(/^[0-9]+$/, 'Số điện thoại không hợp lệ')
        .min(10, 'Số điện thoại phải có ít nhất 10 số')
        .max(10, 'Số điện thoại tối đa 10 số'),
    address: Yup.string().required('Địa chỉ là bắt buộc')
});

function UpdateInfo() {
    const [profileInfo, setProfileInfo] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProfileInfo();
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

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await UserService.updateUser(profileInfo.id, values, token);
            console.log(values)
            Swal.fire({
                icon: 'success',
                title: 'Đã cập nhật thông tin',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                icon: 'error',
                title: ' Lỗi',
                text: error.message,
            });
        }
        setLoading(false);
        setSubmitting(false);
    };

    return (
        <Formik
            enableReinitialize
            initialValues={{
                username: profileInfo.username,
                fullName: profileInfo.fullName,
                dob: profileInfo.dob,
                phoneNumber: profileInfo.phoneNumber,
                address: profileInfo.address,
                role: profileInfo.role
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isValid, dirty }) => (
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
                                                <label className="form-label" htmlFor="role"><strong>Công việc</strong></label>
                                                <Field className="form-control" type="text" id="role" name="role" placeholder="Nhân viên..." disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button className={`btn btn-info btn-sm link-light ${isValid ? 'btn-valid' : ''}`} type="submit" disabled={!isValid || !dirty || loading}>
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
    );
}

export default UpdateInfo;