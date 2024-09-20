import React, { useState, useEffect, useCallback } from 'react';
import Swal from "sweetalert2";
import { SideNav } from "../components/common/SideNav";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../components/assets/bootstrap/css/bootstrap.min.css";
import Footer from "../components/common/Footer";
import "../components/assets/css/animate.min.css";
import "../components/assets/fonts/fontawesome-all.min.css";
import { Modal, Button, Container, Table, Pagination, Form, Row, Col } from 'react-bootstrap';
import * as productService from "./service/ProductService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

    // Khai báo fetchProducts trước
    const fetchProducts = useCallback(async (page) => {
        try {
            const data = await productService.listProduct(page - 1, productsPerPage);
            setProducts(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (error) {
            console.error("Không thể tải sản phẩm:", error);
            setProducts([]);
            toast.error("Không thể tải sản phẩm.");
        }
    }, [productsPerPage]);

    useEffect(() => {
        document.title = "Thông tin sản phẩm";
    }, []);

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage, fetchProducts]);

        const handleDelete = useCallback(async (productId) => {
        if (!productId) {
            console.error("Invalid productId for deletion:", productId);
            return;
        }

        try {
            await productService.deleteProduct(productId);
            setProducts(products.filter(p => p.id !== productId));
            setShowDeleteModal(false);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }, [products]);

    const handlePageChange = useCallback((pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    }, [totalPages]);

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
            console.error("Không thể tìm kiếm sản phẩm:", error);
            setProducts([]);
            toast.error("Không thể tìm kiếm sản phẩm.");
        }
    };

        const confirmDelete = useCallback((product) => {
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
            handleDelete(product.id);

        }
    });
}, [handleDelete]);
    const comingSoon = ()=>{
        Swal.fire({
            title: " Coming soon!!!",
            text: `Chức năng này sẽ được cập nhật sớm nhất!`,
            icon: "warning",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Xóa!",
            cancelButtonText: "Hủy!"
        }).then((result) => {
            if (result.isConfirmed) {
                setProductToDelete(product);
                handleDelete(product.id);
            }
        });
    }, [handleDelete]);
        })
    }


    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav />
                <Container className="my-5">
                    <h2 className="text-center mb-4">Thông tin hàng hóa</h2>
                    <Row className="d-flex justify-content-between align-items-center mb-4">
                        <Col md={3} className="mb-2">
                            <Button variant="primary" href="/add-product">
                                Thêm mới hàng hóa
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Button variant="primary" onClick={comingSoon}>
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
                        </Col>
                        <Col md={9}>
                            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                                <Form.Group as={Row} className="align-items-center w-100">
                                    <Form.Label column sm="auto" className="mb-0 me-2" style={{ whiteSpace: 'nowrap' }}>
                                        Tìm kiếm theo:
                                    </Form.Label>
                                    <Col sm="auto">
                                        <Form.Select
                                            value={searchCategory}
                                            onChange={(e) => setSearchCategory(e.target.value)}
                                        >
                                            <option value="name">Tên hàng hóa</option>
                                            <option value="cpu">CPU</option>
                                            <option value="storage">Lưu trữ</option>
                                            {/* Thêm lựa chọn tìm kiếm */}
                                        </Form.Select>
                                    </Col>
                                    <Col sm="auto" className="ms-2">
                                        <Form.Control
                                            type="text"
                                            placeholder="Tìm kiếm..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </Col>
                                    <Col sm="auto" className="ms-2">
                                        <Button
                                            variant="primary"
                                            onClick={handleSearch}
                                            className="btn-search"
                                        >
                                            Tìm kiếm
                                        </Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>

                    <Table bordered hover responsive striped className="mb-4">
                        <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Tên</th>
                            <th>Giá (VNĐ)</th>
                            <th>CPU</th>
                            <th>Lưu trữ (GB)</th>
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
                                    <td>{product.price.toLocaleString()} VNĐ</td>
                                    <td>{product.cpu}</td>
                                    <td>{product.storage} GB</td>
                                    <td>{product.brand?.name || 'N/A'}</td>
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
                                                onClick={() => window.location.href = `/edit-product/${product.id}`}
                                                title="Chỉnh sửa"
                                                onClick={comingSoon}
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

                    {/* Modal Chi Tiết Sản Phẩm */}
                    {selectedProduct && (
                        <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} centered>
                            <Modal.Header closeButton className="bg-light border-0">
                                <Modal.Title className="text-center text-uppercase w-100" style={{ color: '#36B9CC' }}>
                                    Chi tiết sản phẩm
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="p-4">
                                <Row>
                                    <Col md={6} className="text-center mb-4 d-flex align-items-center justify-content-center">
                                        <img
                                            src={selectedProduct.image}
                                            alt={selectedProduct.name}
                                            className="img-fluid rounded border border-primary"
                                            style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }}
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <div className="mb-3">
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>Tên:</strong> {selectedProduct.name}</p>
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>Thương hiệu:</strong> {selectedProduct.brand?.name || 'N/A'}</p>
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>Giá:</strong> {selectedProduct.price.toLocaleString()} VNĐ</p>
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>CPU:</strong> {selectedProduct.cpu}</p>
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>Camera Selfie:</strong> {selectedProduct.selfieCamera}</p>
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>Lưu trữ:</strong> {selectedProduct.storage} GB</p>
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>Số lượng:</strong> {selectedProduct.quantity || 'N/A'}</p>
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>Kích thước màn hình:</strong> {selectedProduct.screenSize} inch</p>
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>Camera:</strong> {selectedProduct.camera}</p>
                                        </div>
                                        <div>
                                            <p className="mb-2"><strong style={{ color: '#36B9CC' }}>Mô tả:</strong></p>
                                            <p>{selectedProduct.description}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Modal.Body>
                            <Modal.Footer className="border-0 d-flex justify-content-center">
                                <Button
                                    variant="secondary"
                                    onClick={() => setShowDetailsModal(false)}
                                    className="bg-primary border-0"
                                >
                                    Đóng
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    )}

                    {/* Modal Xác Nhận Xóa */}
                    {productToDelete && (
                        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>

                        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        {/*    <Modal.Header closeButton>*/}
                        {/*        <Modal.Title>Xác nhận xóa</Modal.Title>*/}
                        {/*    </Modal.Header>*/}
                        {/*    <Modal.Body>*/}
                        {/*        Bạn có chắc chắn muốn xóa sản phẩm {productToDelete.name} không?*/}
                        {/*    </Modal.Body>*/}
                        {/*    <Modal.Footer>*/}
                        {/*        <Button variant="danger" onClick={handleDelete}>*/}
                        {/*            Xóa*/}
                        {/*        </Button>*/}
                        {/*        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>*/}
                        {/*            Hủy*/}
                        {/*        </Button>*/}
                        {/*    </Modal.Footer>*/}
                        </Modal>
                    )}
                </Container>
            </div>
            <Footer />
        </div>
    );

}

export default ProductDashboard;
