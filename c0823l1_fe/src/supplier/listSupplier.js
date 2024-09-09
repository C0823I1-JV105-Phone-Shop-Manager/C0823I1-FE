import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as supplierService from "../components/service/SupplierService";
import Footer from "../components/common/Footer";
import { SideNav } from "../components/common/SideNav";
import NavTop from "../components/common/NavTop";
import {deleteSuppliersByUid} from "../components/service/SupplierService";

function ListSupplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [selectedUids, setSelectedUids] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0); // Thêm state cho trang hiện tại
    const [totalPages, setTotalPages] = useState(0); // Thêm state cho tổng số trang
    const size = 5; // Kích thước trang cố định là 5

    useEffect(() => {
        ListSuppliers();
    }, [page, selectedAddress, searchTerm]);

    const ListSuppliers = async () => {
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

    const handleSearch = () => {
        setPage(0); // Reset trang khi tìm kiếm
        ListSuppliers();
    };

    const handleSelectAddress = (e) => {
        setSelectedAddress(e.target.value);
        setPage(0); // Reset trang khi thay đổi địa chỉ
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

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa các nhà cung cấp đã chọn không?");
        if (confirmDelete) {
            try {
                await deleteSuppliersByUid(selectedUids);
                setSelectedUids([]); // Xóa lựa chọn
                ListSuppliers(); // Làm mới danh sách nhà cung cấp sau khi xóa
            } catch (error) {
                console.error("Failed to delete suppliers:", error);
            }
        }
    };

    const handleCheckboxChange = (uid) => {
        setSelectedUids((prev) =>
            prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
        );
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
                                            <option value="An Giang">An Giang</option>
                                            <option value="Bạc Liêu">Bạc Liêu</option>
                                            <option value="Bắc Giang">Bắc Giang</option>
                                            <option value="Bắc Kạn">Bắc Kạn</option>
                                            <option value="Bắc Ninh">Bắc Ninh</option>
                                            <option value="Bến Tre">Bến Tre</option>
                                            <option value="Bình Dương">Bình Dương</option>
                                            <option value="Bình Phước">Bình Phước</option>
                                            <option value="Bình Thuận">Bình Thuận</option>
                                            <option value="Cà Mau">Cà Mau</option>
                                            <option value="Cần Thơ">Cần Thơ</option>
                                            <option value="Cao Bằng">Cao Bằng</option>
                                            <option value="Đắk Lắk">Đắk Lắk</option>
                                            <option value="Đắk Nông">Đắk Nông</option>
                                            <option value="Điện Biên">Điện Biên</option>
                                            <option value="Đồng Nai">Đồng Nai</option>
                                            <option value="Đồng Tháp">Đồng Tháp</option>
                                            <option value="Gia Lai">Gia Lai</option>
                                            <option value="Hà Giang">Hà Giang</option>
                                            <option value="Hà Nam">Hà Nam</option>
                                            <option value="Hà Nội">Hà Nội</option>
                                            <option value="Hà Tây">Hà Tây</option>
                                            <option value="Hà Tĩnh">Hà Tĩnh</option>
                                            <option value="Hải Dương">Hải Dương</option>
                                            <option value="Hải Phòng">Hải Phòng</option>
                                            <option value="Hậu Giang">Hậu Giang</option>
                                            <option value="Hòa Bình">Hòa Bình</option>
                                            <option value="Hưng Yên">Hưng Yên</option>
                                            <option value="Khánh Hòa">Khánh Hòa</option>
                                            <option value="Kiên Giang">Kiên Giang</option>
                                            <option value="Kon Tum">Kon Tum</option>
                                            <option value="Lai Châu">Lai Châu</option>
                                            <option value="Lâm Đồng">Lâm Đồng</option>
                                            <option value="Lạng Sơn">Lạng Sơn</option>
                                            <option value="Lào Cai">Lào Cai</option>
                                            <option value="Long An">Long An</option>
                                            <option value="Nam Định">Nam Định</option>
                                            <option value="Nghệ An">Nghệ An</option>
                                            <option value="Ninh Bình">Ninh Bình</option>
                                            <option value="Ninh Thuận">Ninh Thuận</option>
                                            <option value="Phú Thọ">Phú Thọ</option>
                                            <option value="Phú Yên">Phú Yên</option>
                                            <option value="Quảng Bình">Quảng Bình</option>
                                            <option value="Quảng Nam">Quảng Nam</option>
                                            <option value="Quảng Ngãi">Quảng Ngãi</option>
                                            <option value="Quảng Ninh">Quảng Ninh</option>
                                            <option value="Quảng Trị">Quảng Trị</option>
                                            <option value="Sóc Trăng">Sóc Trăng</option>
                                            <option value="Sơn La">Sơn La</option>
                                            <option value="Tây Ninh">Tây Ninh</option>
                                            <option value="Thái Bình">Thái Bình</option>
                                            <option value="Thái Nguyên">Thái Nguyên</option>
                                            <option value="Thanh Hóa">Thanh Hóa</option>
                                            <option value="Thừa Thiên-Huế">Thừa Thiên-Huế</option>
                                            <option value="Tiền Giang">Tiền Giang</option>
                                            <option value="Trà Vinh">Trà Vinh</option>
                                            <option value="Tuyên Quang">Tuyên Quang</option>
                                            <option value="Vĩnh Long">Vĩnh Long</option>
                                            <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                            <option value="Yên Bái">Yên Bái</option>
                                            <option value="Hưng Yên">Hưng Yên</option>
                                        </select>
                                    </div>

                                    {/* Tìm kiếm theo từ khóa */}
                                    <div className="input-group w-25 ms-auto">
                                    <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tìm theo SDT"
                                            aria-label="Search by term"
                                            value={searchTerm}
                                            onChange={handleSearchTermChange}
                                        />
                                        <button
                                            className="btn btn-info"
                                            type="button"
                                            onClick={handleSearch}
                                        >
                                            Tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            </form>

                            {/* Nút xóa nhiều nhà cung cấp */}
                            <div className="d-flex justify-content-end mb-3">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDelete}
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
                                                <td>{index + 1}</td> {/* STT bắt đầu từ 1 cho mỗi trang */}
                                                <td>{supplier.uid}</td>
                                                <td>{supplier.name}</td>
                                                <td>{supplier.address}</td>
                                                <td>{supplier.phone}</td>
                                                <td>{supplier.email}</td>
                                                <td>
                                                    <Link to={`/supplier/update/${supplier.uid}`}
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
                                                    style={{ fontWeight: page === index ? 'bold' : 'normal' }}
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
            <Footer />
        </div>
    );
};

export default ListSupplier;

