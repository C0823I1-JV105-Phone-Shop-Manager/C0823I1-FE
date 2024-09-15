import React, { useState, useEffect, useCallback } from 'react';
import Swal from "sweetalert2";
import { SideNav } from "../components/common/SideNav";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/assets/bootstrap/css/bootstrap.min.css";
import Footer from "../components/common/Footer";
import "../components/assets/css/animate.min.css";
import "../components/assets/fonts/fontawesome-all.min.css";
import { Modal, Button, Container, Table, Pagination, Form } from 'react-bootstrap';
import * as productService from "./service/ProductService";
import { ToastContainer } from "react-toastify";

function ProductDashboard() {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchCategory, setSearchCategory] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');

    const productsPerPage = 8;

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = useCallback(async (page) => {
        try {
            const data = await productService.listProduct(page - 1, productsPerPage);
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            console.error("Failed to fetch products:", error);
            setProducts([]);
        }
    }, [productsPerPage]);

    const handleDelete = useCallback(async () => {
        try {
            await productService.deleteProduct(productToDelete.id);
            setProducts(products.filter(p => p.id !== productToDelete.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }, [productToDelete, products]);

    const handlePageChange = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, []);

    const viewProductDetails = useCallback((product) => {
        setSelectedProduct(product);
        setShowDetailsModal(true);
    }, []);

    const handleSearch = async () => {
    try {
        const data = await productService.searchProducts(searchTerm, null, null, null, null, null, currentPage, productsPerPage);
        setProducts(data.content || []);
        setTotalPages(data.totalPages || 0);
    } catch (error) {
        console.error("Failed to search products:", error);
        setProducts([]);
    }
};

    const confirmDelete = useCallback((product) => {
        Swal.fire({
            title: " Cảnh báo!!!",
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
    }, []);



    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav />
                <Container className="my-5">
                    <h2 className="text-center mb-4">Thông tin hàng hóa</h2>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Button variant="primary">
                            Thêm mới hàng hóa
                        </Button>

                        <Form inline className="d-flex align-items-center" onSubmit={(e) => e.preventDefault()}>
                            <Form.Label className="mr-3 mb-0" style={{ whiteSpace: 'nowrap' }}>Tìm kiếm theo:</Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-2"
                                style={{ maxWidth: '120px' }}
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                            >
                                <option value="name">Tên hàng hóa</option>
                                <option value="cpu">CPU</option>
                                <option value="storage">Lưu trữ</option>
                                {/* thêm lựa chọn tìm kiếm */}
                            </Form.Control>
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="mr-2 m-1"
                                style={{ maxWidth: '150px' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button
                                variant="primary"
                                onClick={handleSearch}
                                style={{
                                    padding: '0.5rem 1rem',
                                    fontSize: '1rem',
                                    borderRadius: '0.375rem', // Rounded corners
                                    transition: 'background-color 0.3s ease' // Smooth hover effect
                                }}
                                className="btn-search" // Add a custom class for hover effect
                            >
                                Tìm kiếm
                            </Button>
                        </Form>
                    </div>



                    <Table bordered hover responsive striped className="mb-4">
                        <thead className="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Tên</th>
                            <th>Giá</th>
                            <th>CPU</th>
                            <th>Lưu trữ</th>
                            <th>Hãng sản xuất</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{(currentPage - 1) * productsPerPage + index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.cpu}</td>
                                    <td>{product.storage} GB</td>
                                    <td>{product.brand?.name || 'N/A'}</td> {/* Display quantity */}
                                    <td>
                                        <div className="d-flex justify-content-around">
                                            <i
                                                className="fas fa-book text-info mx-2"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => viewProductDetails(product)}
                                                title="Xem chi tiết"
                                            ></i>
                                            <i
                                                className="fas fa-edit text-warning mx-2"
                                                style={{ cursor: 'pointer' }}
                                                title="Chỉnh sửa"
                                            ></i>
                                            <i
                                                className="fas fa-trash-alt text-danger mx-2"
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
                                <td colSpan="7" className="text-center">Không có dữ liệu.</td>
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
                                <Modal.Title className="text-center text-uppercase" style={{ width: '100%' }}>
                                    Chi tiết sản phẩm
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="row">
                                    <div className="col-md-6 text-center mb-4 d-flex align-items-center justify-content-center">
                                        <img
                                            src={selectedProduct.image}
                                            alt={selectedProduct.name}
                                            className="img-fluid rounded"
                                            style={{ maxWidth: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <p className="mb-2"><strong>Tên:</strong> {selectedProduct.name}</p>
                                            <p className="mb-2"><strong>Thương hiệu:</strong> {selectedProduct.brand?.name || 'N/A'}</p>
                                            <p className="mb-2"><strong>Giá:</strong> {selectedProduct.price} VNĐ</p>
                                            <p className="mb-2"><strong>CPU:</strong> {selectedProduct.cpu}</p>
                                            <p className="mb-2"><strong>Camera selfie:</strong> {selectedProduct.selfieCamera}</p>
                                            <p className="mb-2"><strong>Lưu trữ:</strong> {selectedProduct.storage} GB</p>
                                            <p className="mb-2"><strong>Số lượng:</strong> {selectedProduct.quantity || 'N/A'}</p>
                                            <p className="mb-2"><strong>Kích thước màn hình:</strong> {selectedProduct.screenSize} inch</p>
                                            <p className="mb-2"><strong>Camera:</strong> {selectedProduct.camera}</p>
                                        </div>
                                        <div>
                                            <p className="mb-2"><strong>Mô tả:</strong></p>
                                            <p>{selectedProduct.description}</p>
                                        </div>
                                    </div>
                                </div>
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

export default ProductDashboard;
