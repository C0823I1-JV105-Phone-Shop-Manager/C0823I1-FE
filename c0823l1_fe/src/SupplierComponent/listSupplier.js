import { Modal, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as supplierService from "../SupplierComponent/service/SupplierService";
import Footer from "../components/common/Footer";
import { SideNav } from "../components/common/SideNav";
import NavTop from "../components/common/NavTop";
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
    const [deleteConfirmationNames, setDeleteConfirmationNames] = useState([]);

    useEffect(() => {
        fetchSuppliers();
    }, [page, selectedAddress, searchTerm]);

    const fetchSuppliers = async () => {
        try {
            const data = await supplierService.list(selectedAddress, searchTerm, page, size);
            setSuppliers(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Failed to fetch suppliers:", error);
        }
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUids(suppliers.map(supplier => supplier.uid));
        } else {
            setSelectedUids([]);
        }
    };

    const handleCheckboxChange = (uid) => {
        setSelectedUids((prev) =>
            prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
        );
    };

    const showDeleteConfirmation = () => {
        const names = suppliers
            .filter(supplier => selectedUids.includes(supplier.uid))
            .map(supplier => supplier.uid);
        setDeleteConfirmationNames(names);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await supplierService.softDeleteSuppliersByUid(selectedUids);
            setSelectedUids([]);
            setShowDeleteModal(false);
            fetchSuppliers();
            toast.success("Xóa nhà cung cấp thành công!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi xóa nhà cung cấp!");
        }
    };

    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <NavTop />
                        <div className="container mt-5">
                            <form className="row mb-4">
                                <div className="col-md-12 d-flex justify-content-between align-items-center">
                                    <div className="input-group w-25 ms-auto">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tìm theo số điện thoại hoặc tên"
                                            value={searchTerm}
                                            onChange={handleSearchTermChange}
                                        />
                                    </div>
                                </div>
                            </form>

                            <div className="d-flex justify-content-between mb-3">
                                <Link to="/supplier/create" className="btn btn-info">
                                    Thêm nhà cung cấp
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={showDeleteConfirmation}
                                    disabled={selectedUids.length === 0}
                                >
                                    Xóa đã chọn
                                </button>
                            </div>

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
                                    {suppliers.length > 0 ? (
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
                                                <td>{supplier.uid}</td>
                                                <td>{supplier.name}</td>
                                                <td>{supplier.address}</td>
                                                <td>{supplier.phone}</td>
                                                <td>{supplier.email}</td>
                                                <td>
                                                    <Link to={`/supplier/update/${supplier.id}`} className="btn btn-warning">
                                                        Cập nhật
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">Không có nhà cung cấp</td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-end mt-3">
                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(page > 0 ? page - 1 : 0)}
                                                disabled={page === 0}
                                            >
                                                Previous
                                            </button>
                                        </li>
                                        {[...Array(totalPages)].map((_, i) => (
                                            <li key={i} className={`page-item ${page === i ? "active" : ""}`}>
                                                <button
                                                    className="page-link"
                                                    onClick={() => handlePageChange(i)}
                                                >
                                                    {i + 1}
                                                </button>
                                            </li>
                                        ))}
                                        <li className="page-item">
                                            <button
                                                className="page-link"
                                                onClick={() => handlePageChange(page < totalPages - 1 ? page + 1 : page)}
                                                disabled={page === totalPages - 1}
                                            >
                                                Next
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa những nhà cung cấp đã chọn?
                    <ul>
                        {deleteConfirmationNames.map(name => (
                            <li key={name} style={{ fontWeight: 'bold' }}>{name}</li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ListSupplier;
