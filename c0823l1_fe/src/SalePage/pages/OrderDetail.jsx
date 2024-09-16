import React, {useEffect, useState} from "react";
import NavTop from "../../components/common/NavTop";
import {CardBody, CardHeader, Modal} from "react-bootstrap";
import * as customerService from "../service/customerService.jsx";
import * as itemService from "../service/itemService";
import * as staffService from "../service/staffService";
import * as orderService from "../service/orderService";

import "../../components/assets/bootstrap/css/bootstrap.min.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import UserService from "../../components/service/UserService";
import {Bounce, toast} from "react-toastify";
import {PDFDownloadLink, PDFViewer} from "@react-pdf/renderer";
import Invoice from "../component/Invoice";
import {useParams} from "react-router-dom";

function OrderDetail() {
    const { id } = useParams();
    const [order,setOrder]= useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getOrderById(id);
    }, []);
    const getOrderById = async (id) => {
        const fetchData = await orderService.getOrderById(id);
        setOrder(fetchData);
        setIsLoading(false);
    };
    const items = order.productItemList
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    console.log(order)
    if (isLoading) return <p>Loading...</p>
    return (
        order &&
        <div className="container card bg-white">
            <h2 className='card-header fw-bold'>Thông tin đơn hàng</h2>
            <div className='card-body'>
                {order && <div>
                    <span className='h5'> Mã đơn hàng : {order.id} </span>
                    <PDFDownloadLink document={<Invoice order={order} />} fileName="invoice.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Đang tải...' : 'Lưu hóa đơn!')}
                    </PDFDownloadLink>
                </div>}
            <h5>Thông tin khách hàng</h5>
            <table className="table">
                <tbody>
                <tr>
                    <th className='fw-bold '>Tên khách hàng</th>
                    <td>{order.customer.name}</td>
                </tr>
                <tr>
                    <th className='fw-bold'>Email</th>
                    <td>{order.customer.email}</td>
                </tr>
                <tr>
                    <th className='fw-bold'>Số điện thoại</th>
                    <td>{order.customer.phone}</td>
                </tr>
                </tbody>
            </table>

            <h5>Thông tin sản phẩm</h5>
            <table className="table table-responsive">
                <thead>
                <tr>

                    <th className='fw-bold '>Tên sản phẩm</th>
                    <th className='fw-bold '>Serial</th>
                    <th className='fw-bold '>Giá</th>

                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.product.name}</td>
                        <td>{item.serial}</td>
                        <td>{VND.format(item.product.price)}</td>
                    </tr>
                ))}
                <tr>
                    <p className='fw-bold '>Tổng cộng : {VND.format(order.productItemList.reduce((sum, item) => sum + (item.product.price), 0))}</p>
                </tr>
                </tbody>

            </table>

            </div>
        </div>
    )
}

export default OrderDetail;
