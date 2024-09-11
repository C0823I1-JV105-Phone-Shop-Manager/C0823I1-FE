import React, { useEffect, useState } from "react";
import NavTop from "../../components/common/NavTop";
import { Modal } from "react-bootstrap";
import * as customerService from "../service/customerService.jsx";
import * as itemService from "../service/itemService";

import "../../components/assets/bootstrap/css/bootstrap.min.css";
import { Field, Form, Formik } from "formik";

function SalePage() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowItemModal, setIsShowItemModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
  const [initCustomer, setInitCustomer] = useState({});
  const [initItem, setInitItem] = useState({});
  const [selectedCustomer,setSelectedCustomer] = useState({});
  const [selectedItem,setSelectedItem] = useState({});

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
    console.log(values)
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

  function handleItemSelect(values) {
    console.log(values)
      setSelectedItem(values)
  }

  function itemSubmit() {

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
          >
            <Form className=" card-body ">
              <div className="row px-5">
                <div className="col">
                  <button
                    type="button"
                    onClick={showModal}
                    className="btn btn-info form-control col fw-bold "
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
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label htmlFor="birthdate" className="form-label col-3 fw-bold">
                      Ngày sinh
                    </label>
                    <div className="col-9">
                      <Field
                          name="birthdate"
                          type="text"
                          className="form-control form-control-sm"
                          id="birthdate"
                      />
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
                    </div>
                  </div>
                  <div className="row mb-3">
                    <button type='submit' className='btn btn-secondary fw-bold'>Xác nhận khách hàng</button>
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
              onSubmit={itemSubmit}
              enableReinitialize={true}
          >
          <form className="card-body w-100 mx-auto mb-3 ">
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
                <div className="row mb-3">
                  <label
                    for="product-name"
                    className="form-label col-3 fw-bold"
                  >
                    Tên sản phẩm
                  </label>
                  <div className="col-9">
                    <input
                      type="text"
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
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="price"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="quantity" className="form-label col-3 fw-bold">
                    Số lượng
                  </label>
                  <div className="col-9">
                    <input
                      type="text"
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
          </form>
          </Formik>
        </div>
        <div className="card w-75 mb-3 mx-auto shadow">
          <div className="card-header">
            <p className="fw-bolder">Giỏ hàng</p>
          </div>
          <form className="card-body">
            <div className="row px-5">
              <table className="table">
                <thead>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        height="50px"
                        src="data:image/jpeg;base64,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"
                        alt=""
                      />
                    </td>
                    <td>
                      <span for="product-name" className="form-label col-5">
                        Iphone 15
                      </span>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        className="form-control form-control-sm"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        className="form-control form-control-sm"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="total"
                        className="form-control form-control-sm"
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <img
                        height="50px"
                        src="data:image/jpeg;base64,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"
                        alt=""
                      />
                    </td>
                    <td>
                      <span for="product-name" className="form-label col-5">
                        Samsung S24
                      </span>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="price"
                        className="form-control form-control-sm"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        className="form-control form-control-sm"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="total"
                        className="form-control form-control-sm"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row px-5">
              <button className="btn btn-info fw-bold">
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
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
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
                      {items.map((item) => {
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
                            <td>{item.product.price}</td>
                            <td>

                                <button
                                    onClick={() => {
                                      setSelectedItem(item);
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
