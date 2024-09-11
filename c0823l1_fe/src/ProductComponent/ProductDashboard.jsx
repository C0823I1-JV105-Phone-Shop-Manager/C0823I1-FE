import Swal from "sweetalert2";
import { SideNav } from "../components/common/SideNav";
import "bootstrap-icons/font/bootstrap-icons.css"; // Correctly import Bootstrap Icons CSS
import "../components/assets/bootstrap/css/bootstrap.min.css";
import Footer from "../components/common/Footer";
import "../components/assets/css/animate.min.css";
import "../components/assets/fonts/fontawesome-all.min.css";
import { Modal, Button, Container, Table } from 'react-bootstrap';
import * as productService from "./service/ProductService";
import { ToastContainer } from "react-toastify";
import { Pagination } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function ProductDashboard3() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedUids, setSelectedUids] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 10;

    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchCategory, setSearchCategory] = useState('');
    const [currentProducts, setCurrentProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, selectedAddress, searchTerm]);

    const fetchProducts = async (page) => {
        try {
            const data = await productService.listProduct(); // Ensure the list method is available
            setProducts(data.content);
            setTotalPages(data.totalPages);
            setCurrentProducts(data.content.slice((page - 1) * productsPerPage, page * productsPerPage));
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await productService.deleteProduct(productToDelete.id);
            setProducts(products.filter(p => p.id !== productToDelete.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleReset = () => {
        setSearchTerm('');
        setSearchCategory('');
        setCurrentPage(1);
        fetchProducts(1);
        setSelectedProduct(null);
        setShowDetailsModal(false);
        setShowDeleteModal(false);
        setProductToDelete(null);
        window.scrollTo(0, 0);
    };

    const handleSearch = () => {
        setCurrentPage(1);
        fetchProducts(1);
    };

    const viewProductDetails = (product) => {
        setSelectedProduct(product);
        setShowDetailsModal(true);
    };

    const confirmDelete = (product) => {
        Swal.fire({
            title: "Warning!!!",
            text: `Bạn có chắc chắn muốn xóa hàng hóa: ${product.name} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa!",
            cancelButtonText: "Hủy!"
        }).then((result) => {
            if (result.isConfirmed) {
                setProductToDelete(product);
                setShowDeleteModal(true);
            }
        });
    };

    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav />
                <Container className="my-5">
                    <h2 className="text-center mb-4">Thông tin hàng hóa</h2>
                    <div className="d-flex flex-wrap mb-4">
                        <Button
                            variant="primary"
                            className="mr-3 mb-2"
                            onClick={() => setShowAddModal(true)}
                        >
                            Thêm mới hàng hóa
                        </Button>
                    </div>

                    <Table bordered hover responsive>
                        <thead className="thead-light">
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
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{(currentPage - 1) * productsPerPage + index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.cpu}</td>
                                    <td>{product.storage}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <div className="d-flex">
                                            <i
                                                className="fas fa-book text-info mr-3"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => viewProductDetails(product)}
                                                title="Xem chi tiết"
                                            ></i>
                                            <i
                                                className="fas fa-edit text-warning mr-3"
                                                style={{ cursor: 'pointer' }}
                                                title="Chỉnh sửa"
                                            ></i>
                                            <i
                                                className="fas fa-trash-alt text-danger"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => confirmDelete(product)}
                                                title="Xóa"
                                            ></i>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Không có dữ liệu.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>

                    {totalPages > 1 && (
                        <Pagination className="justify-content-center">
                            <Pagination.Prev
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Trang trước
                            </Pagination.Prev>
                            {[...Array(totalPages)].map((_, idx) => (
                                <Pagination.Item
                                    key={idx + 1}
                                    active={currentPage === idx + 1}
                                    onClick={() => handlePageChange(idx + 1)}
                                >
                                    {idx + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Trang tiếp
                            </Pagination.Next>
                        </Pagination>
                    )}

                    <ToastContainer position="top-right" autoClose={3000} />

                    {selectedProduct && (
                        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Chi tiết sản phẩm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p><strong>Tên:</strong> {selectedProduct.name}</p>
                                <p><strong>Giá:</strong> {selectedProduct.price}</p>
                                <p><strong>CPU:</strong> {selectedProduct.cpu}</p>
                                <p><strong>Lưu trữ:</strong> {selectedProduct.storage}</p>
                                <p><strong>Số lượng:</strong> {selectedProduct.quantity}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}

                    {productToDelete && (
                        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Xác nhận xóa</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Bạn có chắc chắn muốn xóa sản phẩm {productToDelete.name} không?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={handleDelete}>
                                    Xóa
                                </Button>
                                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                    Hủy
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </Container>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDashboard3;
