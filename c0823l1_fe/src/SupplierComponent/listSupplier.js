import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as supplierService from "./service/SupplierService";
import Footer from "../components/common/Footer";
import {SideNav} from "../components/common/SideNav";
import NavTop from "../components/common/NavTop";
import { deleteSuppliersByUid } from "./service/SupplierService";
import { toast } from 'react-toastify';

function ListSupplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedUids, setSelectedUids] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const size = 5;

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        ListSuppliers();
    }, [page, selectedAddress, searchTerm]);

    // Hàm lấy danh sách nhà cung cấp từ server
    useEffect(() => {
        document.title = "Supplier List";
        ListSuppliers();
    }, []);

  useEffect(() => {
      document.title = "Supplier List";
      ListSuppliers();
}, [page, selectedAddress, searchTerm]);
    const ListSuppliers = async () => {
        try {
            const data = await supplierService.list(selectedAddress, searchTerm, page, size);
            setSuppliers(data.content); // Cập nhật danh sách nhà cung cấp
            setTotalPages(data.totalPages); // Cập nhật tổng số trang
        } catch (error) {
            console.error("Không tìm được nhà cung cấp:", error);
        }
    };

    // Xử lý thay đổi từ khóa tìm kiếm
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Xử lý tìm kiếm
    // const handleSearch = () => {
    //     setPage(0); // Reset trang khi tìm kiếm
    //     ListSuppliers();
    // };

    // Xử lý thay đổi địa chỉ lọc
    const handleSelectAddress = (e) => {
        setSelectedAddress(e.target.value);
        setPage(0); // Reset trang khi thay đổi địa chỉ
    };

    // Xử lý thay đổi số trang
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Xử lý chọn tất cả nhà cung cấp
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUids(suppliers.map(supplier => supplier.uid));
        } else {
            setSelectedUids([]);
        }
    };

    // Xử lý thay đổi checkbox của từng nhà cung cấp
    const handleCheckboxChange = (uid) => {
        setSelectedUids((prev) =>
            prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
        );
    };

    // Hiển thị modal xác nhận xóa
    const showDeleteConfirmation = () => {
        setShowDeleteModal(true);
    };

    // Xác nhận xóa các nhà cung cấp đã chọn
    const confirmDelete = async () => {
        try {
            await deleteSuppliersByUid(selectedUids); // Gọi hàm xóa nhà cung cấp
            setSelectedUids([]); // Xóa các UID đã chọn
            setShowDeleteModal(false); // Ẩn modal sau khi xóa
            ListSuppliers(); // Làm mới danh sách nhà cung cấp
            toast.success("Xóa nhà cung cấp thành công!"); // Hiển thị thông báo thành công
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa đơn hàng!"); // Hiển thị thông báo lỗi
            toast.error("Có lỗi xảy ra khi xóa nhà cung cấp !");
        }
    };

    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav /> {/* Thanh điều hướng bên trái */}
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <NavTop /> {/* Thanh điều hướng trên cùng */}
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <div className="container mt-5">
                            <form className="row mb-4">
                                <div className="col-md-12 d-flex justify-content-between align-items-center">
                                    {/* Bộ lọc địa chỉ */}
                                    <div className="form-group">
                                        <select
                                            className="form-control"
                                            value={selectedAddress}
                                            onChange={handleSelectAddress}
                                        >
                                            <option value="">Chọn địa chỉ</option>
                                            <option value="Đà Nẵng">Đà Nẵng</option>
                                            <option value="Hà Nội">Hà Nội</option>
                                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                            <option value="Quảng Nam">Quảng Nam</option>
                                            <option value="Quảng Trị">Quảng Trị</option>
                                        </select>
                                    </div>

                                    {/* Tìm kiếm theo từ khóa */}
                                    <div className="input-group w-25 ms-auto">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tìm theo số điện thoại hoặc tên"
                                            value={searchTerm}
                                            onChange={handleSearchTermChange}
                                        />
                                        {/*<button*/}
                                        {/*    className="btn btn-info"*/}
                                        {/*    type="button"*/}
                                        {/*    onClick={handleSearch}*/}
                                        {/*>*/}
                                        {/*    Tìm kiếm*/}
                                        {/*</button>*/}
                                    </div>
                                </div>
                            </form>

                            <div className="d-flex justify-content-between mb-3">
                                {/* Nút thêm nhà cung cấp */}
                                <Link to="/supplier/create" className="btn btn-info">
                                    Thêm nhà cung cấp
                                </Link>

                                {/* Nút xóa nhiều nhà cung cấp */}
                                <button
                                    className="btn btn-danger"
                                    onClick={showDeleteConfirmation}
                                    disabled={selectedUids.length === 0}
                                >
                                    Xóa đã chọn
                                </button>
                            </div>

                            {/* Bảng danh sách nhà cung cấp */}
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-light">
                                    <tr>
                                        <th scope="col">
                                            <input
                                                type="checkbox"
                                                onChange={handleSelectAll}
                                                checked={selectedUids.length === suppliers.length}
                                            />
                                        </th>
                                        <th scope="col">STT</th>
                                        <th scope="col">MS</th>
                                        <th scope="col">Tên nhà cung cấp</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">SDT</th>
                                        <th scope="col">E-mail</th>
                                        <th scope="col">Hành động</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {suppliers && suppliers.length > 0 ? (
                                        suppliers.map((supplier, index) => (
                                            <tr key={supplier.uid}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUids.includes(supplier.uid)}
                                                        onChange={() => handleCheckboxChange(supplier.uid)}
                                                    />
                                                </td>
                                                <td>{index + 1}</td>
                                                {/* STT bắt đầu từ 1 cho mỗi trang */}
                                                <td>{supplier.uid}</td>
                                                <td>{supplier.name}</td>
                                                <td>{supplier.address}</td>
                                                <td>{supplier.phone}</td>
                                                <td>{supplier.email}</td>
                                                <td>
                                                    <Link to={`/supplier/update/${supplier.id}`}
                                                          className="btn btn-warning">
                                                        Cập nhật
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8">Không có kết quả</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Phân trang */}
                            <div className="d-flex justify-content-end">
                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(page - 1)}
                                                disabled={page === 0}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {[...Array(totalPages)].map((_, index) => (
                                            <li key={index} className="page-item">
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(index)}
                                                    style={{fontWeight: page === index ? 'bold' : 'normal'}}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className="page-item">
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(page + 1)}
                                                disabled={page >= totalPages - 1}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

            {/* Modal xóa */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa các nhà cung cấp với mã số:
                    <strong>{selectedUids.join(", ")}</strong>?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy bỏ
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Xác nhận
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
                </div>
            </div>
    );
}

export default ListSupplier;
