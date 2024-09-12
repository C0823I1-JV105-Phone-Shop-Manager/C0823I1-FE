import React, { useEffect, useState } from "react";
import NavTop from "../../components/common/NavTop";
import { Modal } from "react-bootstrap";
import * as customerService from "../service/customerService.jsx";
import * as itemService from "../service/itemService";

import "../../components/assets/bootstrap/css/bootstrap.min.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function SalePage() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowItemModal, setIsShowItemModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [initCustomer, setInitCustomer] = useState({});
  const [initItem, setInitItem] = useState({"id": null,

    serial: "",
    product: {
      name: "",
      id: null,
      image: "",
      price: null
    }});
  const [selectedCustomer,setSelectedCustomer] = useState({});
  const [selectedItem,setSelectedItem] = useState({});
  const [productItemList,setProductItemList] = useState([]);
  const [orderItems,setOrderItems] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);
  const getCustomers = async (name) => {
    const fetchData = await customerService.searchCustomer(name);
    setCustomers(fetchData);
  };

  // useEffect(() => {
  //     getItems();
  // }, []);
  const getItems = async (name) => {
    const fetchData = await itemService.searchItems(name);
    setItems(fetchData);
  };
  const getItemById = async (id) => {
    const fetchData = await itemService.findById(id);
    setItems(fetchData);
  };

  const showModal = () => {
    getCustomers("");
    setIsShowModal(true);
  };
  const hideModal = () => {
    setIsShowModal(false);
  };
  const onSearchSubmit = (values) => {
    getCustomers(values.name);
  };
  const customerSubmit = (values) => {
    setSelectedCustomer(values)

  };

  function hideItemModal() {
    setIsShowItemModal(false);
  }

  function onSearchItemSubmit(values) {
      getItems(values.name)
  }

  function showItemModal() {
    getItems("");
    setIsShowItemModal(true);
  }

  // function handleItemSelect(values) {
  //   console.log(values)
  //     setSelectedItem(values)
  // }

  function itemSubmit(values,resetForm) {
    resetForm()
    setProductItemList([...productItemList,values])
    console.log(productItemList)
  }

  function submitOrder() {
    console.log(selectedCustomer)
    console.log(productItemList)
  }

  return (
    <div className="d-flex flex-column" id="content-wrapper">
      <NavTop />
      <div className="container mt-5">
        <div className="card w-75 mb-3 mx-auto shadow">
          <div className="card-header">
            <p className="fw-bolder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-lines-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
              </svg>
              Thông tin khách hàng
            </p>
          </div>
          <Formik
            initialValues={initCustomer}
            onSubmit={customerSubmit}
            enableReinitialize={true}
            validationSchema={Yup.object({
              name: Yup.string()
                  .required("Yêu cầu nhập tên khách hàng"),
              address: Yup.string()
                  .required("Yêu cầu nhập địa chỉ"),
              phone: Yup.string().required("Yêu cầu nhập số điện thoại"),
              email: Yup.string().required("Yêu cầu nhập email").email("Email không đúng định dạng"),
            })}

          >
            <Form className=" card-body ">
              <div className="row px-5">
                <div className="col">
                  <button
                    type="button"
                    onClick={showModal}
                    className="btn btn-secondary form-control col fw-bold "
                  >
                    Chọn khách hàng cũ
                  </button>
                </div>
                <div className="col">
                  <button className="form-control btn btn-secondary col fw-bold">
                    Quét mã QR
                  </button>
                </div>
              </div>
              <div className="row g-2 mt-3 px-5">
                <div className="col">
                  <Field name="id" type="hidden"/>
                  <div className="row mb-3">
                    <label htmlFor="name" className="form-label col-3 fw-bold">
                      Họ và tên
                    </label>
                    <div className="col-9">
                      <Field
                          name="name"
                          type="text"
                          className="form-control form-control-sm"
                          id="name"
                      />
                      <ErrorMessage
                          className="text-danger"
                          name="name"
                          component="div"
                      ></ErrorMessage>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <label htmlFor="phone" className="form-label col-3 fw-bold">
                      Số điện thoại
                    </label>
                    <div className="col-9">
                      <Field
                          name="phone"
                          type="text"
                          className="form-control form-control-sm"
                          id="phone"
                      ></Field>
                      <ErrorMessage
                          className="text-danger"
                          name="phone"
                          component="div"
                      ></ErrorMessage>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="address" className="form-label col-3 fw-bold">
                      Địa chỉ
                    </label>
                    <div className="col-9">
                      <Field
                          name="address"
                          type="text"
                          className="form-control form-control-sm"
                          id="address"
                      />
                      <ErrorMessage
                          className="text-danger"
                          name="address"
                          component="div"
                      ></ErrorMessage>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="birthdate" className="form-label col-3 fw-bold">
                      Ngày sinh
                    </label>
                    <div className="col-9">
                      <Field
                          name="birthdate"
                          type="date"
                          className="form-control form-control-sm"
                          id="birthdate"
                      />
                      <ErrorMessage
                          className="text-danger"
                          name="birthdate"
                          component="div"
                      ></ErrorMessage>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="email" className="form-label col-3 fw-bold">
                      Email
                    </label>
                    <div className="col-9">
                      <Field
                          name="email"
                          type="text"
                          className="form-control form-control-sm"
                          id="email"
                      />
                      <ErrorMessage
                          className="text-danger"
                          name="email"
                          component="div"
                      ></ErrorMessage>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <button type='submit' className='btn btn-info fw-bold'>Xác nhận khách hàng</button>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
        <div className="card w-75 mb-3 mx-auto shadow">
          <div className="card-header">
            <p className="fw-bolder">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-check2-square"
                  viewBox="0 0 16 16"
              >
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
              </svg>
              Chọn sản phẩm
            </p>
          </div>

          <Formik
              initialValues={{...initItem}}
              onSubmit={(values,{resetForm})=> {
                  setProductItemList([...productItemList,values])
                  const newList= items.filter(item => {
                    return item.id !== values.id;
                  })
                console.log(newList)
                setItems(newList)
                  setInitItem({"id": null,
                    serial: "",
                    product: {
                      name: "",
                      id: null,
                      image: "",
                      price: ""
                    }})
                  console.log(productItemList)
              }}
              enableReinitialize={true}
          >
            {({ values, errors, isSubmitting, isValid, setFieldValue, handleChange, resetForm }) => (
          <Form className="card-body w-100 mx-auto mb-3 ">
            <div className="row px-5">
              <div className="col-5">
                <button
                  type={"button"}
                  className="btn btn-secondary form-control fw-bold"
                  onClick={showItemModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                  Chọn sản phẩm từ kho
                </button>
              </div>
            </div>
            <div className="row g-2 mt-3 px-5">
              <div className="col">
                <Field name="id" type="hidden"/>
                <div className="row mb-3">
                  <label
                    for="product-name"
                    className="form-label col-3 fw-bold"
                  >
                    Tên sản phẩm
                  </label>
                  <div className="col-9">
                    <Field
                      name="product.name"
                      className="form-control form-control-sm"
                      id="product-name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="price" className="form-label col-3 fw-bold">
                    Đơn giá
                  </label>
                  <div className="col-9">
                    <Field
                      type="number"
                      name='product.price'
                      className="form-control form-control-sm"
                      id="price"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="serial" className="form-label col-3 fw-bold">
                    Số serial
                  </label>
                  <div className="col-9">
                    <Field
                      type="text"
                      name='serial'
                      className="form-control form-control-sm"
                      id="quantity"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row px-5">
              <div className="col">
                <button className="btn btn-info form-control fw-bold" type='submit'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-cart-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                  </svg>
                  Thêm vào giỏ
                </button>
              </div>
            </div>
          </Form>
                )}
          </Formik>
        </div>
        <div className="card w-75 mb-3 mx-auto shadow">
          <div className="container mt-2 mb-1 px-5">
            <p className='fw-bolder fs-4'>Thông tin đơn hàng</p>
            <div className="row">
              <div className="col-md-4">
                <strong>Tên khách hàng : </strong> {selectedCustomer.name}
              </div>
              <div className="col-md-4">
                <strong>Điện thoại:</strong> {selectedCustomer.phone}
              </div>
              <div className="col-md-4">
                <strong>Email:</strong> {selectedCustomer.email}
              </div>
            </div>
          </div>
          <form className="card-body">

            <div className="row px-5">
              <table className="table">
                <thead className=''>
                <th className='fw-bold'>Hình ảnh</th>
                <th className='fw-bold'>Tên sản phẩm</th>
                <th className='fw-bold'>Serial</th>
                <th className='fw-bold'>Đơn giá</th>
                </thead>
                <tbody>
                {productItemList.map(item => {
                  return (
                      < tr>
                        < td>
                          < img
                              height="50px"
                              src={item.product.image}
                              alt="thumnails"
                          />
                        < /td>
                        <td>
                      <span htmlFor="product-name" className="form-label col-5">
                        {item.product.name}
                      </span>
                        </td>
                        <td>
                         <span className="form-label col-5">
                           {item.serial}
                         </span>
                        </td>
                        <td>
                         <span className="form-label col-5">
                           {item.product.price}
                         </span>
                        </td>


                      </tr>)
                })}


                </tbody>
              </table>
            </div>
            <div className="row px-5">
              <button type='button' className="btn btn-info fw-bold" onClick={submitOrder}>
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
            <Form className="row g-3 mb-3">
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

          <div
              className="table-responsive"
              style={{"overflow-y": "auto", maxHeight: "600px"}}
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
              {items.map((item) => {
                return (
                    <tr className="align-items-center">
                      <td>
                        <img
                            src={item.product.image}
                            alt="item thumnail"
                            className="img-thumbnail"
                            style={{width: "100px"}}
                        />
                      </td>
                      <td>{item.product.name}</td>
                      <td>{item.serial}</td>
                      <td>{item.product.price}</td>
                      <td>
                        <button
                            onClick={() => {
                              setInitItem(item);
                              console.log(item)
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
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SalePage;
