import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import NavTop from "../common/NavTop";
import "../assets/css/ProductCss/ProductCss.css";

function ProductManagement() {
    return (
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <NavTop />
                <div className="container">
                    <div id="product-info" className="col-12 col-lg-10 mx-auto">
                        <h2>Thông tin hàng hóa</h2>
                        <div id="search-bar">
                            <div>
                                <button id="add-product-btn">Thêm mới hàng hóa</button>
                            </div>
                            <div>
                                <label htmlFor="search-category">Tìm kiếm theo</label>
                                <select className="m-2" id="search-category">
                                    <option value="name">Tên hàng hóa</option>
                                    {/* Bạn có thể thêm các tùy chọn khác ở đây */}
                                </select>
                                <input type="text" className="m-2" placeholder="Tìm kiếm..." />
                                <button>Tìm kiếm</button>
                            </div>
                        </div>

                        <table className="table table-bordered table-responsive">
                            <thead className="table-light">
                            <tr>
                                <th>#</th>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>CPU</th>
                                <th>Lưu trữ</th>
                                <th>Số lượng</th>
                                <th>Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Nokia G10 4GB-64GB</td>
                                <td>3.190.000</td>
                                <td>SCT310</td>
                                <td>64 GB</td>
                                <td>100</td>
                                <td className="action-buttons">
                                    <i className="fas fa-book view-btn"></i>
                                    <i className="fas fa-edit edit-btn"></i>
                                    <i className="fas fa-trash-alt delete-btn"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Xiaomi 12 Pro 12GB - 256GB</td>
                                <td>25.740.000</td>
                                <td>Snapdragon 8 Gen 1</td>
                                <td>256 GB</td>
                                <td>50</td>
                                <td className="action-buttons">
                                    <i className="fas fa-book view-btn"></i>
                                    <i className="fas fa-edit edit-btn"></i>
                                    <i className="fas fa-trash-alt delete-btn"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Samsung Galaxy Z Flip3 5G 128GB</td>
                                <td>18.990.000</td>
                                <td>Snapdragon 888</td>
                                <td>128 GB</td>
                                <td>40</td>
                                <td className="action-buttons">
                                    <i className="fas fa-book view-btn"></i>
                                    <i className="fas fa-edit edit-btn"></i>
                                    <i className="fas fa-trash-alt delete-btn"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>iPhone SE 2022 64GB</td>
                                <td>11.990.000</td>
                                <td>Apple A15 Bionic</td>
                                <td>64 GB</td>
                                <td>20</td>
                                <td className="action-buttons">
                                    <i className="fas fa-book view-btn"></i>
                                    <i className="fas fa-edit edit-btn"></i>
                                    <i className="fas fa-trash-alt delete-btn"></i>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>iPhone 13 mini 128GB</td>
                                <td>18.490.000</td>
                                <td>Apple A15 Bionic</td>
                                <td>128 GB</td>
                                <td>25</td>
                                <td className="action-buttons">
                                    <i className="fas fa-book view-btn"></i>
                                    <i className="fas fa-edit edit-btn"></i>
                                    <i className="fas fa-trash-alt delete-btn"></i>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        {/* Pagination */}
                        <nav aria-label="Page navigation example" className="mt-3">
                            <ul className="pagination justify-content-end">
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Trang trước</a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item">
                                    <a className="page-link" href="#">Trang tiếp</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <a className="border rounded d-inline scroll-to-top" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>
            </div>
        </div>
    );
}

export default ProductManagement;