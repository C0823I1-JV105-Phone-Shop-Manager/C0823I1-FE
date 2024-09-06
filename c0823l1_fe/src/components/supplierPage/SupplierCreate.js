import {useNavigate} from "react-router-dom";
import {SideNav} from "../common/SideNav";
import Profile from "../common/Profile";
import Footer from "../common/Footer";
import React, {useEffect} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {createSupplier} from "../service/SupplierAddEditService";
import * as Yup from "yup";
import NavTop from "../common/NavTop";


function SupplierCreate() {
    const navigate = useNavigate();
    const supplier = {
        uid: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        description: ""
    }

    const validateSupplier = {
        uid: Yup.string().required("Mã số không được để trống")
            .min(4, "Định dạng Mã số không đúng")
            .max(10, "Định dạng Mã số không đúng")
            .matches(/^MS_[a-zA-Z0-9]{1,7}$/, "Định dạng Mã số không đúng"),
        name: Yup.string().required("Tên không được để trống")
            .max(150, "Tên không được chứa ký tự đặc biệt, hoặc ký tự cấm sử dụng, độ dài tối đa 150 ký tự")
            .matches(/^[^~`!@#$%^&*()+={}\[\]:;"'|\\<>?]{0,150}$/, "Tên không được chứa ký tự đặc biệt, hoặc ký tự cấm sử dụng, độ dài tối đa 150 ký tự"),
        address: Yup.string().required("Địa chỉ không được để trống")
            .max(150, "Địa chỉ không được chứa ký tự đặc biệt, hoặc ký tự cấm sử dụng, độ dài tối đa 255 ký tự")
            .matches(/^[^~`!@#$%^&*()+={}\[\]:;"'|\\<>?]{0,255}$/, "Địa chỉ không được chứa ký tự đặc biệt, hoặc ký tự cấm sử dụng, độ dài tối đa 255 ký tự"),
        phone: Yup.string().required("Số điện thoại không được để trống")
            .min(10, "Số điện thoại không hợp lệ, chỉ sử dụng số điện thoại Việt Nam và các số tiếp theo, gồm 10-15 chữ số")
            .max(15, "Số điện thoại không hợp lệ, chỉ sử dụng số điện thoại Việt Nam và các số tiếp theo, gồm 10-15 chữ số")
            .matches(/^0(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-46-9])[0-9]{7,12}/, "Số điện thoại không hợp lệ, chỉ sử dụng số điện thoại Việt Nam và các số tiếp theo, gồm 10-15 chữ số"),
        email: Yup.string().required("Email không được để trống")
            .max(150, "Email không đúng định dạng, không quá 150 ký tự")
            .matches(/[a-zA-Z][a-zA-Z0-9_.]{2,64}[^._]@[^.][a-zA-Z0-9]{2,64}\.[0-9a-z-.]{2,63}/, "Email không đúng định dạng, không quá 150 ký tự")

    }
    const saveSupplier = async (value) => {
        try {
            console.log(value)
            const token = localStorage.getItem('token');
            const response = await createSupplier(supplier, token);
        } catch (error) {
            console.error('Error when create supplier information:', error);
        }

    }
    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav/>
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <NavTop/>
                        <div class="container col-lg-8 col-xl-8 col-md-12 m-auto">
                            <Formik initialValues={supplier} onSubmit={saveSupplier}
                                    validationSchema={Yup.object(validateSupplier)}>
                                <Form className="form-control">
                                    <div className="form-label">
                                        <label className="fw-medium" htmlFor="uid">Mã số</label>
                                        <label className="text-danger fw-bold ms-1">*</label>
                                        <Field className="form-control" type="text" name="uid" id="uid"
                                               value={supplier.uid}
                                               placeholder="Mã số nhà cung cấp"/>
                                        <ErrorMessage className="text-danger fw-bold ms-1" name="uid"
                                                      component="small"></ErrorMessage>
                                    </div>
                                    <div className="form-label">
                                        <label className="fw-medium" htmlFor="name">Tên</label>
                                        <label className="text-danger fw-bold ms-1">*</label>
                                        <Field className="form-control" type="text" name="name" id="name"
                                               placeholder="Tên nhà cung cấp" placeholder="Tên nhà cung cấp"
                                               value={supplier.name}></Field>
                                        <ErrorMessage className="text-danger fw-bold ms-1" name="name"
                                                      component="small"></ErrorMessage>
                                    </div>
                                    <div className="form-label">
                                        <label className="fw-medium" htmlFor="address">Địa chỉ</label>
                                        <label className="text-danger fw-bold ms-1">*</label>
                                        <Field className="form-control" type="text" name="address" id="address"
                                               placeholder="Số nhà, đường, thôn/buôn, xã/phường, quận/huyện, tỉnh/thành phố, quốc gia"
                                               value={supplier.address}></Field>
                                        <ErrorMessage className="text-danger fw-bold ms-1" name="address"
                                                      component="small"></ErrorMessage>
                                    </div>
                                    <div className="form-label">
                                        <label className="fw-medium" for="phone">Số điện thoại</label>
                                        <label className="text-danger fw-bold ms-1">*</label>
                                        <Field className="form-control" type="text" name="phone" id="phone"
                                               placeholder="0xx xxxx xxx" value={supplier.phone}></Field>
                                        <ErrorMessage className="text-danger fw-bold ms-1" name="phone"
                                                      component="small"></ErrorMessage>
                                    </div>
                                    <div className="form-label">
                                        <label className="fw-medium" htmlFor="email">Email</label>
                                        <label className="text-danger fw-bold ms-1">*</label>
                                        <Field className="form-control" type="text" name="email" id="email"
                                               placeholder="abc@gmail.com" value={supplier.email}></Field>
                                        <ErrorMessage className="text-danger fw-bold ms-1" name="email"
                                                      component="small"></ErrorMessage>
                                    </div>
                                    <div className="form-label">
                                        <label className="fw-medium" htmlFor="email">Mô tả (Không bắt buộc)</label>
                                        <Field class="form-control" component="textarea" value={supplier.description}
                                               placeholder="Mô tả ngắn gọn"></Field>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-info m-1 "
                                                data-bs-toggle="modal"
                                                data-bs-target="#addSupplier"
                                                type="button">Thêm mới
                                        </button>
                                        <button className="btn btn-danger m-1" type="button">Hủy bỏ</button>
                                    </div>
                                    {/*Modal*/}
                                    <div className="modal fade" id="addSupplier" tabIndex="-1"
                                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm nhà
                                                        cung
                                                        cấp</h1>
                                                    <button type="button" className="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Bạn chắc chắn muốn thêm nhà cung cấp này?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="submit" className="btn btn-info">Thêm mới</button>
                                                    <button type="button" className="btn btn-danger"
                                                            data-bs-dismiss="modal">
                                                        Hủy bỏ
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SupplierCreate;