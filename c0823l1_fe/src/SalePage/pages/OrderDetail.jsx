import React, { useEffect, useState } from "react";
import * as orderService from "../service/orderService";
import "../../components/assets/bootstrap/css/bootstrap.min.css";
import { Bounce, toast } from "react-toastify";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Invoice from "../component/Invoice";
import { useParams } from "react-router-dom";

function OrderDetail() {
    const { id } = useParams();
    const [order, setOrder] = useState({});
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
        <div className="container p-3">
            <p className='h2 mb-2 fw-bold text-center'>Thông tin chi tiết đơn hàng</p>
            <div className="container card p-3 m-5 shadow">
                <div className="card-header d-flex gap-2 justify-content-between">
                    <p className='h5 fw-bold'> # <span className="fw-normal">{order.id}</span> </p>

                    <PDFDownloadLink document={<Invoice order={order} />} fileName="invoice.pdf">
                        {({ blob, url, loading, error }) => (loading
                            ? 'Đang tải...'
                            : <button className="btn btn-info d-flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                                </svg>
                                <span>

                                    Lưu đơn hàng
                                </span>
                            </button>)}
                    </PDFDownloadLink>

                </div>


                <div className='card-body'>


                    <h5 className="text-info fs-4 border-info border-bottom">Thông tin khách hàng</h5>
                    <table className="table table-sm mb-3 table-borderless">
                        <tbody>
                            <tr>
                                <th className='fw-bold fs-6'>Tên khách hàng</th>
                                <td className='fs-6'>{order.customer.name}</td>
                            </tr>
                            <tr>
                                <th className='fw-bold fs-6'>Email</th>
                                <td className='fs-6'>{order.customer.email}</td>
                            </tr>
                            <tr>
                                <th className='fw-bold fs-6'>Số điện thoại</th>
                                <td className='fs-6'>{order.customer.phone}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h5 className="text-info fs-4 border-info border-bottom">Thông tin sản phẩm</h5>
                    <table className="table table-responsive">
                        <thead>
                            <tr>

                                <th className='fw-bold table-info fs-6'>Tên sản phẩm</th>
                                <th className='fw-bold table-info  fs-6'>Serial</th>
                                <th className='fw-bold table-info fs-6'>Giá</th>

                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id}>
                                    <td className="fs-6">{item.product.name}</td>
                                    <td className="fs-6">{item.serial}</td>
                                    <td className="fs-6">{VND.format(item.product.price)}</td>
                                </tr>
                            ))}
                            <tr>
                                <p className='fw-bold fs-6'>Tổng cộng : {VND.format(order.productItemList.reduce((sum, item) => sum + (item.product.price), 0))}</p>
                            </tr>
                        </tbody>

                    </table>


                </div>
                {/* <div>
                    <PDFViewer width="1000" height="650" className="app">
                        <Invoice order={order} />
                    </PDFViewer>
                </div> */}
            </div>
        </div>

    )
}

export default OrderDetail;
