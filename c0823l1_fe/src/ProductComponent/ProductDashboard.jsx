// import React from 'react';
import  {SideNav} from "../components/common/SideNav";
import "bootstrap-icons/font/bootstrap-icons.css"; // Correctly import Bootstrap Icons CSS
import "../components/assets/bootstrap/css/bootstrap.min.css";
import Footer from "../components/common/Footer";
import "../components/assets/css/animate.min.css";
import "../components/assets/fonts/fontawesome-all.min.css";
import {Modal, Button, Container, Table} from 'react-bootstrap';
import * as productService from "./service/ProductService";
import {Form} from "formik";
import {ToastContainer} from "react-toastify";
import { Pagination } from 'react-bootstrap';
import {getProductById} from './service/ProductService'; // Adjust path as necessary
import {deleteProduct} from './service/ProductService';
import React, {useState, useEffect, Component} from 'react';
import * as PropTypes from "prop-types";


Component.propTypes = {handleReset: PropTypes.func};
export default function ProductDashboard() {

    // Khởi tạo currentPage với giá trị mặc định, ví dụ là 1
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0); // Thêm state cho trang hiện tại
    const [totalPages, setTotalPages] = useState(0); // Thêm state cho tổng số trang
    const productsPerPage = 10; // Giả sử mỗi trang hiển thị 10 sản phẩm
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


    const [products, setProducts] = useState([]); // Example product state
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchCategory, setSearchCategory] = useState('');
    const [currentProducts, setCurrentProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);



    useEffect(() => {
        // Lấy sản phẩm dựa trên trang hiện tại
        ListProduct(); // Call the function to fetch product data
        document.title = `Danh sách`;
        window.scrollTo(0, 0);
        fetchProducts(currentPage);
    },[currentPage]);
    const ListProduct = async () => {
        try {
            const data = await productService.listProduct();
            setProducts(data.content);
            setTotalPages(data.totalPages);
        }catch (error){
            console.error("Failed to fetch service:", error);
        }
    };

    // Cập nhật trạng thái searchTerm mỗi khi người dùng thay đổi từ khóa tìm kiếm.
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDelete = () => {
        // Logic xóa sản phẩm
    };

    const handleAddProduct = (newProduct) => {
        // Logic thêm sản phẩm
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleReset = () => {
        console.log("..");
        setSearchTerm('');  // Clear the search term
        setSearchCategory('');  // Reset the selected search category
        setCurrentPage(1);  // Reset the pagination to the first page
        ListProduct();  // Fetch all products without any filters applied
        setSelectedProduct(null);
        setShowDetailsModal(false);
        setShowDeleteModal(false);
        setProductToDelete(null);
        window.scrollTo(0, 0);
    };



    // Khi người dùng nhấn nút "Tìm kiếm", trang sẽ được reset về 0 và gọi lại hàm để lấy danh sách.
    const handleSearch = () => {
        setPage(0);  // Reset lại trang về 0.
        ListProduct();  // Gọi lại hàm lấy danh sách nhà cung cấp.
    };

    // // Xử lý sự kiện khi người dùng chọn địa chỉ trong bộ lọc.
    // const handleSelectAddress = (e) => {
    //     setSelectedAddress(e.target.value);  // Cập nhật địa chỉ đã chọn.
    //     setPage(0);  // Reset trang về 0 khi thay đổi địa chỉ.
    // };
    //
    // // Xử lý sự kiện khi người dùng chuyển trang.
    // const handlePageChange = (newPage) => {
    //     setPage(newPage);  // Cập nhật trạng thái trang.
    // }

    function viewProductDetails({ show, handleClose, product }) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-primary text-white">
                    <Modal.Title>Chi tiết hàng hóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Tên:</strong> {product.name}</p>
                    <p><strong>CPU:</strong> {product.cpu}</p>
                    <p><strong>Lưu trữ:</strong> {product.storage}</p>
                    <p><strong>Số lượng:</strong> {product.quantity}</p>
                    <p><strong>Giá:</strong> {product.price}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }


    function confirmDelete({ show, handleClose, handleDelete, productName }) {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-danger text-white">
                    <Modal.Title>Xác nhận xóa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa hàng hóa: <strong>{productName}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
    const fetchProducts = async (page) => {
        try {
            // Thay thế bằng API của bạn
            const response = await fetch(`/api/products?page=${page}`);
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
        }
    };


    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav />
                { <Container className="my-5">
                    <h2 className="text-center mb-4">Thông tin hàng hóa</h2>
                    <div className="d-flex flex-wrap mb-4">
                        <Button
                            variant="primary"
                            className="mr-3 mb-2"
                            onClick={() => setShowAddModal(true)}
                        >
                            Thêm mới hàng hóa
                        </Button>
                        <Form inline className="ml-auto mb-2" onSubmit={(e) => e.preventDefault()}>
                            <Form.Label className="mr-2">Tìm kiếm theo</Form.Label>
                            <Form.Control
                                as="select"
                                className="mr-2"
                                value={searchCategory}
                                onChange={(e) => setSearchCategory(e.target.value)}
                            >
                                <option value="name">Tên hàng hóa</option>
                                <option value="cpu">CPU</option>
                                <option value="storage">Lưu trữ</option>
                                <option value="price">Giá</option>
                                {/* Add more options if needed */}
                            </Form.Control>
                            <Form.Control
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="mr-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="primary" onClick={handleSearch}>
                                Tìm kiếm
                            </Button>
                            <Button variant="secondary" onClick={handleReset} className="ml-2">
                                Reset
                            </Button>

                        </Form>
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
                                    <td>{indexOfFirstProduct + index + 1}</td>
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
                                                // Implement edit functionality if needed
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
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination className="justify-content-center">
                            <Pagination.Prev
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Trang trước
                            </Pagination.Prev>
                            {[...Array(totalPages)].map((_, idx) => (
                                <Pagination.Item
                                    key={idx + 1}
                                    active={currentPage === idx + 1}
                                    onClick={() => paginate(idx + 1)}
                                >
                                    {idx + 1}
                                </Pagination.Item>
                            ))}
                            <Pagination.Next
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Trang tiếp
                            </Pagination.Next>
                        </Pagination>
                    )}

                    {/* Toast Container */}
                    <ToastContainer position="top-right" autoClose={3000} />

                    {/* Product Details Modal */}
                    {selectedProduct && (
                        <getProductById
                            show={showDetailsModal}
                            handleClose={() => setShowDetailsModal(false)}
                            product={selectedProduct}
                        />
                    )}

                    {/* Delete Confirmation Modal */}
                    {productToDelete && (
                        <deleteProduct
                            show={showDeleteModal}
                            handleClose={() => setShowDeleteModal(false)}
                            handleDelete={handleDelete}
                            productName={productToDelete.name}
                        />
                    )}

                    {/* Add Product Modal */}
                    {/*<AddProductModal*/}
                        show={showAddModal}
                        handleClose={() => setShowAddModal(false)}
                        handleAdd={handleAddProduct}
                    />
                </Container>}
            </div>
            <Footer />
        </div>
    );
}