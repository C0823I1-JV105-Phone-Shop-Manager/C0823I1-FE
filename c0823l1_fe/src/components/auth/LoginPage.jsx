import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import UserService from "../service/UserService";
import mobileLogo from '../assets/img/logo/mobileLogo.png'; // Import the image
import '../assets/css/btn-hover.css';
import '../assets/css/checkbox-animation.css';
import '../assets/css/field-focus.css'; // Import the field focus animation CSS file

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be at most 30 characters')
        .matches(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric'),
    password: Yup.string().required('Password is required')
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username must be at most 30 characters')
});

function LoginPage() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            const userData = await UserService.login(values.username, values.password);
            console.log(userData);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                navigate('/profile');
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <div className="login-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-lg-12 col-xl-10">
                        <div className="card shadow-lg o-hidden border-0 my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-flex">
                                        <div className="flex-grow-1 bg-login-image">
                                            <img src={mobileLogo} alt="logo" className="img-fluid" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h4 className="text-dark mb-4">Welcome Back!</h4>
                                            </div>
                                            <Formik
                                                initialValues={{ username: '', password: '' }}
                                                onSubmit={handleSubmit}
                                                validationSchema={validationSchema}
                                            >
                                                {({ values }) => (
                                                    <Form className="user">
                                                        <div className="mb-3">
                                                            <Field className="form-control form-control-user form-focus" type="text" id="username" name="username" placeholder="Enter Username..." />
                                                        </div>
                                                        <div className="mb-3">
                                                            <Field className="form-control form-control-user form-focus" type="password" id="password" name="password" placeholder="Password" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <div className="custom-checkbox small">
                                                                <div className="form-check">
                                                                    <Field className="form-check-input" type="checkbox" id="formCheck-1" name="rememberMe" />
                                                                    <label className="form-check-label" htmlFor="formCheck-1">Remember Me</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="btn d-block btn-user w-100 btn-info btn-login"
                                                            type="submit"
                                                            style={{ color: 'rgb(255,255,255)', backgroundColor : "#5BBABE" }}
                                                            disabled={!values.username || !values.password}
                                                        >
                                                            Login
                                                        </button>
                                                    </Form>
                                                )}
                                            </Formik>
                                            {error && <p className="error-message">{error}</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="text-center mt-4">
                            <p>C08 Dev | All Right Reserved &copy; {new Date().getFullYear()} </p>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;