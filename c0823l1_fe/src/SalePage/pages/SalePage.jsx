import React, { useEffect, useState } from "react";
import NavTop from "../../components/common/NavTop";
import { Modal } from "react-bootstrap";
import * as customerService from "../service/customerService.jsx";
import * as itemService from "../service/itemService";
import * as staffService from "../service/staffService";
import * as orderService from "../service/orderService";

import "../../components/assets/bootstrap/css/bootstrap.min.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import UserService from "../../components/service/UserService";
import { Bounce, toast } from "react-toastify";
import {PDFViewer} from "@react-pdf/renderer";
import Invoice from "../component/Invoice";

function SalePage() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowConfirmModal, setIsShowConfirmModal] = useState(false);
  const [isShowItemModal, setIsShowItemModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [initCustomer, setInitCustomer] = useState({});
  const [initItem, setInitItem] = useState({
    id: null,
    serial: "",
    product: {
      name: "",
      id: null,
      image: "",
      price: null,
    },
  });
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedItemList, setSelectedItemList] = useState([]);
  const [staff, setStaff] = useState({});
  useEffect(() => {
    fetchProfileInfo();
  }, []);
  useEffect(() => {
    getCustomers();
  }, []);

  const availableItems = items.filter((item1) => !selectedItemList.some((selected) => selected.id === item1.id))
  console.log(selectedItemList);
  console.log(availableItems)
  const getCustomers = async (name) => {
    const fetchData = await customerService.searchCustomer(name);
    setCustomers(fetchData);
  };

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getYourProfile(token);

      const staff = await staffService.findStaffByUserName(
        response.userDto.username,
      );
      setStaff(staff);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const isEmptyObject = (obj) => {
    return JSON.stringify(obj) === "{}";
  };

  const getItems = async (name) => {
    const fetchData = await itemService.searchItems(name);
    setItems(fetchData);
  };
  const showModal = () => {
    getCustomers("");
    setIsShowModal(true);
  };
  const hideModal = () => {
    setIsShowModal(false);
  };

  const showConfirmModal = () => {
    console.log("HIển thị confirm");
    setIsShowConfirmModal(true);
  };

  const confirmCreate = () => {
    submitOrder();
    hideConfirmModal();
  };
  const hideConfirmModal = () => {
    setIsShowConfirmModal(false);
  };

  const onSearchSubmit = (values) => {
    getCustomers(values.name);
  };
  const customerSubmit = (values) => {
    console.log(values);
    setSelectedCustomer(values);
    toast.info("Đã chọn khách hàng");
  };

  function hideItemModal() {
    setIsShowItemModal(false);
  }

  function onSearchItemSubmit(values) {
    getItems(values.name);
  }

  function showItemModal() {
    getItems("");
    setIsShowItemModal(true);
  }

  function itemSubmit(values, resetForm) {
    resetForm();
    setSelectedItemList([...selectedItemList, values]);
    console.log(selectedItemList);
  }

  const submitOrder = async () => {
    if (
      isEmptyObject(selectedCustomer) ||
      isEmptyObject(staff) ||
      selectedItemList.length === 0
    ) {
      if (isEmptyObject(selectedCustomer))
        toast.error("Cần nhập thông tin khách hàng vào đơn", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      else if (isEmptyObject(staff))
        toast.error("Thiếu thông tin nhân viên bán hàng", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      else if (selectedItemList.length === 0)
        toast.error("Đơn hàng chưa có sản phẩm", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
    } else {
      const itemIdList = selectedItemList.map((item) => item.id);
      const orderReq = {
        staff: { ...staff },
        customer: { ...selectedCustomer },
        productItemList: [...itemIdList],
      };
      const order = await orderService.createOrder(orderReq);
      console.log(order )
      // setInitCustomer({});
      setInitItem({
        id: null,
        serial: "",
        product: {
          name: "",
          id: null,
          image: "",
          price: null,
        },
      });
      setSelectedItemList([]);
      setSelectedCustomer({});
    }
  };

  function removeCartItem(id) {
    const removedItemList = selectedItemList.filter((item) => item.id !== id);
    console.log(removedItemList);
    setSelectedItemList(removedItemList);
  }

  return (
    <div className="d-flex flex-column" id="content-wrapper">
      <NavTop />
      <div className="container-fluid">
        <p className="text-center fw-bolder h1 text-black-50 pb-2">
          Quản lý Bán Hàng
        </p>
        <div className="row mx-auto">
          <div className="col-sm-12 col-lg-6 col-xl-7">
            {/*Customer section*/}
            <div className="card mb-3 shadow px-0">
              <div className="card-header">
                <div className="fw-bolder d-flex align-items-center gap-2">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person-lines-fill"
                      viewBox="0 0 16 16"
                  >
                    <path
                        d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                  </svg>
                  <span>Thông tin khách hàng</span>
                </div>
              </div>
              <Formik
                  initialValues={initCustomer}
                  onSubmit={customerSubmit}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    name: Yup.string().required("Yêu cầu nhập tên khách hàng"),
                    address: Yup.string().required("Yêu cầu nhập địa chỉ"),
                    phone: Yup.string()
                        .required("Yêu cầu nhập số điện thoại")
                        .matches(
                            /^\d{9,11}$/,
                            "Số điện thoại phải chứa từ 9 đến 11 số",
                        ),
                    email: Yup.string()
                        .required("Yêu cầu nhập email")
                        .email("Email không đúng định dạng"),
                    birthdate: Yup.date()
                        .required("Yêu cầu nhập ngày sinh")
                        .max(new Date(), "Ngày không được lớn hơn ngày hiện tại"),
                  })}
              >
                <Form className="card-body ">
                  <div className="row px-2 px-xl-5 gx-3 gy-2">
                    <div className="col-12 col-xl">
                      <button
                          type="button"
                          onClick={showModal}
                          className="btn btn-secondary form-control col fw-bold "
                      >
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-person-plus"
                                viewBox="0 0 16 16"
                            >
                              <path
                                  d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                              <path
                                  fill-rule="evenodd"
                                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                              />
                            </svg>
                          </div>
                          <span>Chọn khách hàng cũ</span>
                        </div>
                      </button>
                    </div>
                    <div className="col-12 col-xl">
                      <button
                          type="button"
                          className="form-control btn btn-secondary col fw-bold"
                      >
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-qr-code-scan"
                              viewBox="0 0 16 16"
                          >
                            <path
                                d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z"/>
                            <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z"/>
                            <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z"/>
                            <path
                                d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z"/>
                            <path d="M12 9h2V8h-2z"/>
                          </svg>
                          Quét mã QR
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="row  mt-3 px-2 px-xl-5">
                    <div className="col-12">
                      <Field name="id" type="hidden"/>
                      <div className="row mb-3">
                        <label
                            htmlFor="name"
                            className="form-label col-xl-3 fw-bold"
                        >
                          Họ và tên <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-9">
                          <Field
                              name="name"
                              type="text"
                              className="form-control form-control"
                              id="name"
                          />
                          <ErrorMessage
                              className="text-danger small"
                              name="name"
                              component="div"
                          ></ErrorMessage>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                            htmlFor="phone"
                            className="form-label col-xl-3 fw-bold"
                        >
                          Số điện thoại <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-9">
                          <Field
                              name="phone"
                              type="text"
                              className="form-control form-control"
                              id="phone"
                          ></Field>
                          <ErrorMessage
                              className="text-danger small font-italic"
                              name="phone"
                              component="div"
                          ></ErrorMessage>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                            htmlFor="address"
                            className="form-label col-xl-3 fw-bold"
                        >
                          Địa chỉ <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-9">
                          <Field
                              name="address"
                              type="text"
                              className="form-control"
                              id="address"
                          />
                          <ErrorMessage
                              className="text-danger small font-italic"
                              name="address"
                              component="div"
                          ></ErrorMessage>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                            htmlFor="birthdate"
                            className="form-label col-xl-3 fw-bold"
                        >
                          Ngày sinh <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-9">
                          <Field
                              name="birthdate"
                              type="date"
                              className="form-control"
                              id="birthdate"
                          />
                          <ErrorMessage
                              className="text-danger small font-italic"
                              name="birthdate"
                              component="div"
                          ></ErrorMessage>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                            htmlFor="email"
                            className="form-label col-xl-3 fw-bold"
                        >
                          Email <span className="text-danger">*</span>
                        </label>
                        <div className="col-xl-9">
                          <Field
                              name="email"
                              type="text"
                              className="form-control"
                              id="email"
                          />
                          <ErrorMessage
                              className="text-danger small font-italic"
                              name="email"
                              component="div"
                          ></ErrorMessage>
                        </div>
                      </div>

                    </div>

                  </div>
                  <div className="row px-2 px-xl-5">
                    <div className="col">
                      <button type="submit" className="btn btn-info form-control fw-bold">
                        Xác nhận khách hàng
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
            {/*End of Customer section*/}

            {/*Product Section*/}
            <div className="card mb-3 shadow">
              <div className="card-header">
                <div className="d-flex align-items-center gap-2 fw-bolder">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-check2-square"
                      viewBox="0 0 16 16"
                  >
                    <path
                        d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z"/>
                    <path
                        d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0"/>
                  </svg>
                  <span>Chọn sản phẩm</span>
                </div>
              </div>

              <Formik
                  initialValues={{...initItem}}
                  onSubmit={(values, {resetForm}) => {
                    console.log(values);
                    if (isEmptyObject(values) || values.id === null) {
                      toast.error("Không có thông tin sản phẩm");
                    } else {
                      setSelectedItemList([...selectedItemList, values]);
                      // const newList = items.filter((item) => {
                      //   return item.id !== values.id;
                      // });
                      // console.log(newList);
                      // setItems(newList);
                      toast.info("Đã thêm vào giỏ hàng");
                      setInitItem({
                        id: null,
                        serial: "",
                        product: {
                          name: "",
                          id: null,
                          image: "",
                          price: "",
                        },
                      });
                      console.log(selectedItemList);
                    }
                  }}
                  enableReinitialize={true}
              >
                {({
                    values,
                    errors,
                    isSubmitting,
                    isValid,
                    setFieldValue,
                    handleChange,
                    resetForm,
                  }) => (
                    <Form className="card-body w-100 mx-auto mb-3 ">
                      <div className="row px-2 px-xl-5">
                        <div className="col">
                          <button
                              type={"button"}
                              className="btn btn-secondary form-control fw-bold"
                              onClick={showItemModal}
                          >
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-bag-plus"
                                  viewBox="0 0 16 16"
                              >
                                <path
                                    fill-rule="evenodd"
                                    d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5"
                                />
                                <path
                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                              </svg>
                              <span>Chọn sản phẩm từ kho</span>
                            </div>
                          </button>
                        </div>
                      </div>
                      <div className="row mt-3 px-2 px-xl-5">
                        <div className="col-12">
                          <Field name="id" type="hidden"/>
                          <div className="row mb-3">
                            <label
                                for="product-name"
                                className="form-label col-xl-3 fw-bold"
                            >
                              Tên sản phẩm
                            </label>
                            <div className="col-xl-9">
                              <Field
                                  name="product.name"
                                  className="form-control "
                                  id="product-name"
                                  disabled
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                                for="price"
                                className="form-label col-xl-3 fw-bold"
                            >
                              Đơn giá
                            </label>
                            <div className="col-xl-9">
                              <Field
                                  type="number"
                                  name="product.price"
                                  className="form-control "
                                  id="price"
                                  disabled
                              />
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                                for="serial"
                                className="form-label col-xl-3 fw-bold"
                            >
                              Số serial
                            </label>
                            <div className="col-xl-9">
                              <Field
                                  type="text"
                                  name="serial"
                                  className="form-control "
                                  disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row px-2 px-xl-5">
                        <div className="col">
                          <button
                              className="btn btn-info form-control fw-bold"
                              type="submit"
                          >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-cart-plus"
                                viewBox="0 0 16 16"
                            >
                              <path
                                  d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
                              <path
                                  d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                            </svg>
                            Thêm vào giỏ
                          </button>
                        </div>
                      </div>
                    </Form>
                )}
              </Formik>
            </div>
            {/*End of Product Section*/}
          </div>

          <div className="col-sm-12 col-lg-6 col-xl-5">
            {/*Order Section*/}
            <div className="card border bg-light rounded-0  p-4 mx-auto ">
              <p className="card-header fw-bolder h4 text-center">
                Thông tin đơn hàng
              </p>
              <form className="card-body">
                <div className="row">
                  {isEmptyObject(selectedCustomer) ? (
                      <p className="">Chưa có thông tin khách hàng</p>
                  ) : (
                      <div className="row gap-1 mb-3">
                        <div className="row">
                          <div className="col-4 d-inline-flex align-items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="bi bi-person"
                                viewBox="0 0 16 16"
                            >
                              <path
                                  d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                            <span className="fw-bold">Khách hàng</span>
                          </div>
                          <span className="col-8">{selectedCustomer.name}</span>
                        </div>

                        <div className="row">
                          <div className="col-4 d-inline-flex align-items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="bi bi-telephone"
                                viewBox="0 0 16 16"
                            >
                              <path
                                  d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                            </svg>
                            <span className="fw-bold">Điện thoại</span>{" "}
                          </div>

                          <span className='col-8'>{selectedCustomer.phone}</span>
                        </div>

                        <div className="row">
                          <div className="col-4 d-inline-flex align-items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                 className="bi bi-envelope-at" viewBox="0 0 16 16">
                              <path
                                  d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                              <path
                                  d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
                            </svg>
                            <span className="fw-bold">Email</span>
                          </div>
                          <span className='col-8'>{selectedCustomer.email}</span>

                        </div>
                      </div>
                  )}
                  {selectedItemList.length === 0 ? (
                      <p className="">Chưa có sản phẩm </p>
                  ) : (
                      <div className="overflow-x-auto">
                        <table className="table table-responsive">
                          <thead>
                          <tr className="">
                            <th className="fw-bold">Hình ảnh</th>
                            <th className="fw-bold">Tên sản phẩm</th>
                            <th className="fw-bold">Serial</th>
                            <th className="fw-bold">Đơn giá</th>
                            <th className="fw-bold">Xóa</th>
                          </tr>
                          </thead>
                          <tbody>
                          {selectedItemList.map((item) => {
                            return (
                                <tr>
                                  <td>
                                    <img
                                        height="50px"
                                        src={item.product.image}
                                        alt="thumnails"
                                    />
                                  </td>
                                  <td className="">
                                  <span className="form-label">
                                    {item.product.name}

                                  </span>
                                  </td>
                                  <td>
                                  <span className="form-label">
                                    {item.serial}
                                  </span>
                                  </td>
                                  <td>
                                  <span className="form-label">
                                    {VND.format(item.product.price)}
                                  </span>
                                  </td>
                                  <td>
                                    <div
                                        onClick={() => removeCartItem(item.id)}
                                        role="button"
                                    >
                                      <svg
                                          cursor="pointer"
                                          xmlns="http://www.w3.org/2000/svg"
                                          color="red"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          className="bi bi-x-square"
                                          viewBox="0 0 16 16"
                                      >
                                        <path
                                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                        <path
                                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                      </svg>
                                    </div>
                                  </td>
                                </tr>
                            );
                          })}
                          </tbody>
                        </table>
                        <p className="fw-bold p-3">
                          Tổng cộng :{" "}
                          <span className="text-">
                          {VND.format(
                              selectedItemList.reduce((sum, item) => {
                                return sum + item.product.price;
                              }, 0),
                          )}
                        </span>
                        </p>
                      </div>
                  )}
                </div>
                <div className="row">
                  <button
                      type="button"
                      className="btn btn-info fw-bold"
                      onClick={showConfirmModal}
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bag-check"
                        viewBox="0 0 16 16"
                    >
                      <path
                          fill-rule="evenodd"
                          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"
                      />
                      <path
                          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                    </svg>
                    Thanh toán
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/*End of Order Section*/}


          {/*<div>*/}
          {/*  <PDFViewer width="1000" height="650" className="app">*/}
          {/*    <Invoice/>*/}
          {/*  </PDFViewer>*/}
          {/*</div>*/}
        </div>
      </div>


      <Modal show={isShowModal} onHide={hideModal} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Chọn khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={onSearchSubmit}
            enableReinitialize={true}
          >
            <Form className="row g-3 mb-3">
              <div className="col-md-2 col-12 ">
                <label htmlFor="search-field" className="form-label fw-bold">
                  Tìm kiếm theo
                </label>
              </div>

              <div className="col-md-4 col-12">
                <Field
                  name="name"
                  className="form-control"
                  placeholder="Nhập ..."
                />
              </div>
              <div className="col-md-3 col-12">
                <button type="submit" className="btn btn-outline-info">
                  Tìm kiếm
                </button>
              </div>
            </Form>
          </Formik>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-info">
                <tr>
                  <th>Họ tên</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Ngày sinh</th>
                  <th>Email</th>
                  <th>Chọn</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => {
                  return (
                    <tr>
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.address}</td>
                      <td>{customer.birthdate}</td>
                      <td>{customer.email}</td>
                      <td>
                        <button
                          onClick={() => {
                            setInitCustomer(customer);
                            hideModal();
                          }}
                          className="btn btn-info btn-sm"
                        >
                          Chọn
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={isShowItemModal} onHide={hideItemModal} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Chọn sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: "",
            }}
            onSubmit={onSearchItemSubmit}
            enableReinitialize={true}
          >
            <Form className="row g-2 mb-3">
              <div className="col-md-2 col-12 ">
                <label htmlFor="search-field" className="form-label fw-bold">
                  Tìm theo tên
                </label>
              </div>
              <div className="col-md-4 col-12">
                <Field
                  name="name"
                  className="form-control"
                  placeholder="Nhập ..."
                />
              </div>
              <div className="col-md-3 col-12">
                <button type="submit" className="btn btn-outline-info">
                  Tìm kiếm
                </button>
              </div>
            </Form>
          </Formik>
          {availableItems && availableItems.length > 0 ? (
            <div
              className="table-responsive"
              style={{ "overflow-y": "auto", maxHeight: "600px" }}
            >
              <table className="table table-bordered table-hover">
                <thead className="table-info">
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Số serial</th>
                    <th>Giá bán</th>
                    <th>Chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {availableItems.map((item) => {
                    return (
                      <tr className="align-items-center">
                        <td>
                          <img
                            src={item.product.image}
                            alt="item thumnail"
                            className="img-thumbnail"
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>{item.product.name}</td>
                        <td>{item.serial}</td>
                        <td>{VND.format(item.product.price)}</td>
                        <td>
                          <button
                            onClick={() => {
                              setInitItem(item);
                              console.log(item);
                              hideItemModal();
                            }}
                            className="btn btn-info btn-sm"
                          >
                            Chọn
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-danger">Không có sản phẩm</p>
          )}
        </Modal.Body>
      </Modal>
      <Modal show={isShowConfirmModal} onHide={hideConfirmModal} className="">
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Xác nhận thông tin </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có muốn tạo đơn hàng mới ?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={hideConfirmModal}>
            Hủy
          </button>
          <button className="btn btn-info" onClick={confirmCreate}>
            Thêm mới
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SalePage;
