import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from '../service/UserService';
import "bootstrap-icons/font/bootstrap-icons.css"; // Correctly import Bootstrap Icons CSS
import "../assets/bootstrap/css/bootstrap.min.css";
import Swal from 'sweetalert2';

const validationSchemaPassword = Yup.object().shape({
    currentPassword: Yup.string().required('Mật khẩu cũ là bắt buộc'),
    newPassword: Yup.string()
        .required('Mật khẩu mới là bắt buộc')
        .notOneOf([Yup.ref('currentPassword')], 'Mật khẩu mới không được trùng với mật khẩu cũ')
        .min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
    confirmationPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp')
});

function UpdatePassword() {
    const [oldPassword, setOldPassword] = useState();

    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmationPassword: ''
    });

    useEffect(() => {
        fetchPassword();
    }, []);

    const fetchPassword = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await UserService.getYourPassword(token);
            setOldPassword(response);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };

    const handleSubmitPassword = async (values) => {
   try {
    const token = localStorage.getItem('token');
    const response = await UserService.updateYourPassword(oldPassword.id, token, values);
    if (response.message === "Password updated successfully") {
        Swal.fire({
            icon: 'success',
            title: 'Cập nhật mật khẩu thành công',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Cập nhật mật khẩu thất bại',
            text: response.message,
        });
    }
} catch (error) {
    console.error('Error updating profile:', error);
    Swal.fire({
        icon: 'error',
        title: 'Error updating profile',
        text: error.message,
    });
}
    };

    return (
        <>
            <Formik initialValues={password} onSubmit={handleSubmitPassword} validationSchema={validationSchemaPassword} enableReinitialize>
    {({ values, isValid, dirty }) => (
        <Form>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="m-0 fw-bold text-info">Thay đổi mật khẩu</p>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="currentPassword"><strong>Mật khẩu cũ&nbsp;</strong></label>
                        <Field className="form-control" type="password" id="currentPassword" name="currentPassword" />
                        <ErrorMessage name="currentPassword" component="div" className="error-message" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="newPassword"><strong>Mật khẩu mới</strong></label>
                        <Field className="form-control" type="password" id="newPassword" name="newPassword" />
                        <ErrorMessage name="newPassword" component="div" className="error-message" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="confirmationPassword"><strong>Nhập lại mật khẩu mới</strong></label>
                        <Field className="form-control" type="password" id="confirmationPassword" name="confirmationPassword" />
                        <ErrorMessage name="confirmationPassword" component="div" className="error-message" />
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-sm btn-info" type="submit" style={{ color: 'rgb(255,255,255)' }} disabled={!isValid || !dirty}>Lưu thông tin thay đổi</button>
                    </div>
                </div>
            </div>
        </Form>
    )}
</Formik>
        </>
    );
}

export default UpdatePassword;