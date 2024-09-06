// import {useNavigate} from "react-router-dom";
// import {SideNav} from "../common/SideNav";
// import Profile from "../common/Profile";
// import Footer from "../common/Footer";
// import React, {useEffect} from "react";
// import {Form, Formik} from "formik";
// import {createSupplier} from "../service/SupplierAddEditService";
// import * as Yup from "yup";
//
//
// function SupplierCreate() {
//     const navigate = useNavigate();
//     const [newSupplier, setNewSupplier] = React.useState(supplier);
//     const supplier = {
//         uid: "",
//         name: "",
//         address: "",
//         phone: "",
//         email: "",
//         description: ""
//     }
//
//     const validateSupplier = {
//         uid: Yup.string().required("Mã số không được để trống")
//             .min(4,"Định dạng Mã số không đúng")
//             .max(10,"Định dạng Mã số không đúng")
//             .matches(/^MS_[a-zA-Z0-9]{1,7}$/,"Định dạng Mã số không đúng")
//     }
//     const saveSupplier = async (value) => {
//         try {
//             console.log(value)
//             const token = localStorage.getItem('token');
//             const response = await createSupplier(supplier, token);
//         } catch (error) {
//             console.error('Error when create supplier information:', error);
//         }
//
//     }
//     return (
//         <>
//             <div id="page-top" className="d-flex flex-column min-vh-100">
//                 <div id="wrapper" className="flex-grow-1">
//                     <SideNav/>
//                     <Profile/>
//                     <Formik initialValues={supplier} onSubmit={saveSupplier} validationSchema={Yup.object(supplier)}>
//                         <Form className="form-control">
//                             <div className="form-label">
//                                 <label className="fw-medium" htmlFor="uid">Mã số</label>
//                                 <label className="text-danger fw-bold ms-1">*</label>
//                                 <input className="form-control" type="text" name="uid" id="uid" value={supplier.uid}
//                                        placeholder="Mã số nhà cung cấp"/>
//                                 <ErrorMessage name="uid" component="span"></ErrorMessage><br></br>
//                             </div>
//                             <div className="form-label">
//                                 <label className="fw-medium" htmlFor="name">Tên</label><label
//                                 className="text-danger fw-bold ms-1">*</label>
//                                 <input className="form-control" type="text" name="name" id="name"
//                                        placeholder="Tên nhà cung cấp"/>
//                             </div>
//                             <!-- Modal -->
//                             <div className="modal fade" id="addSupplier" tabIndex="-1"
//                                  aria-labelledby="exampleModalLabel"
//                                  aria-hidden="true">
//                                 <div className="modal-dialog">
//                                     <div className="modal-content">
//                                         <div className="modal-header">
//                                             <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm nhà cung
//                                                 cấp</h1>
//                                             <button type="button" className="btn-close" data-bs-dismiss="modal"
//                                                     aria-label="Close"></button>
//                                         </div>
//                                         <div className="modal-body">
//                                             Bạn chắc chắn muốn thêm nhà cung cấp này?
//                                         </div>
//                                         <div className="modal-footer">
//                                             <button type="submit" className="btn btn-info">Thêm mới</button>
//                                             <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
//                                                 Hủy bỏ
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Form>
//                     </Formik>
//                 </div>
//                 <Footer/>
//             </div>
//         </>
//     )
// }
//
// export default SupplierCreate;