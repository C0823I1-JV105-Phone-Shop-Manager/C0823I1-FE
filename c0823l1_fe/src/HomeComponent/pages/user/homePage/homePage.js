import React, {memo, useEffect, useState} from "react";
import '../homePage/style.css';
import * as PhoneService from "../../../service/PhoneService";
import * as BrandService from "../../../service/BrandService";
import {MDBBtn, MDBIcon, MDBPagination, MDBPaginationItem, MDBPaginationLink} from "mdb-react-ui-kit";


const huawei = "https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/huawei%20(1).png?alt=media&token=d19dc912-15c1-4e92-9891-2f5c6c0f9b4d"
const asus = "https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_67.webp?alt=media&token=bf7af5dd-e349-409f-99d0-cf791872f246"
const realme = "https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_63.webp?alt=media&token=edb2a87e-b039-4580-a38f-b04f278dbe5d"
const oppo = "https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_62.webp?alt=media&token=63117d4a-78dc-4265-ae51-c33099520183"
const xiaomi = "https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_61.webp?alt=media&token=9b31b994-52f7-4347-9a77-b92f4498e8e4"
const samsung = "https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_60.webp?alt=media&token=c4f57909-d6f5-4574-b4f0-bc7b06ab5659"
const nokia = "https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_37_1.webp?alt=media&token=01b53b79-c646-49b5-9740-ed2140f3606e"
const sony = "https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/brand-icon-sony_2.webp?alt=media&token=5337ccc1-799c-452f-82dd-a5fbb87e559e"
const apple = "https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/apple.webp?alt=media&token=04b2aa63-9abc-465e-b312-6261c9f88b1f"

const HomePage = ({search, brandS}) => {
    const [phones, setPhones] = useState();
    const [brandList, setBrandList] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [cpu, setCpu] = useState('');
    const [camera, setCamera] = useState('');
    const [storage, setStorage] = useState('');
    const [brand, setBrand] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [modalOpen, setModalOpen] = useState(!phones);  // Mở modal nếu không có kết quả
    const brands = [
        {id: 1, src: apple, alt: "Apple"},
        {id: 2, src: sony, alt: "Sony"},
        {id: 3, src: nokia, alt: "Nokia"},
        {id: 4, src: samsung, alt: "SamSung"},
        {id: 5, src: xiaomi, alt: "Xiaomi"},
        {id: 6, src: oppo, alt: "Oppo"},
        {id: 7, src: realme, alt: "Realme"},
        {id: 8, src: asus, alt: "Asus"},
        {id: 9, src: huawei, alt: "Huawei"},
    ];

    useEffect(() => {
        document.title = "Home";
        if (search) {
            fetchPhones(search, currentPage - 1);
        }
    }, [search, currentPage]);
    useEffect(() => {
        document.title = "Home";
        if (brandS) {
            filterPhonesByBrand(brandS, currentPage - 1);
        }
    }, [brandS, currentPage]);

    const fetchPhones = async (name, page = 0) => {
        if (page === undefined || page === null) {
            setCurrentPage(0); // Reset to the first page if no page is passed
        }
        try {
            let allPhones = await PhoneService.getAllPhone(name, page || 0); // Default to page 0
            setPhones(allPhones);
            setTotalPages(allPhones.totalPages);
        } catch (error) {
            console.error("Failed to fetch phones", error);
        }
    };

    const filterPhonesByBrand = async (brand, page) => {
        try {
            let allPhones = await PhoneService.filterPhonesByBrand(brand, page);
            setPhones(allPhones);
            setTotalPages(allPhones.totalPages);
        } catch (error) {
            console.error("Failed to fetch phones", error);
        }
    }

    useEffect(() => {
        getAllPhones(name, price, cpu, camera, storage, brand, currentPage - 1);
        getAllBrands();
    }, [brand, camera, cpu, name, price, storage, currentPage]);


    const getAllPhones = async (name, price, cpu, camera, storage, brand, page) => {
        try {
            const phones = await PhoneService.getAllPhone(name, page);
            setPhones(phones);
            setTotalPages(phones.totalPages);
        } catch (error) {
            console.error("Failed to fetch phones", error);
            setPhones([]);
        }

    };


    const getAllBrands = async () => {
        const brands = await BrandService.getAllBrands();
        setBrandList(brands);
    }

    // const handleChange = (brand) => {
    //     const selectedValue = brand.target.value;
    //
    //     if (selectedValue !== " ") {
    //         try {
    //             const selectedBrand = JSON.parse(selectedValue);
    //             setBrand(selectedBrand);
    //             console.log("Selected brand:", selectedBrand);
    //         } catch (error) {
    //             console.error("Error parsing JSON:", error);
    //         }
    //     } else {
    //         setBrand(" ");
    //     }
    // };
    const handleChange = (brand) => {
        if (brand && typeof brand === 'object') {
            setSelectedBrand(brand.id);
            setBrand(brand);
        } else {
            setBrand(" ");
        }
    };
    const handleFilterSubmit = async (event) => {
        event.preventDefault();
        setCurrentPage(1); // Reset to the first page when filtering

        let allPhones;
        if (brand === " ") {
            allPhones = await PhoneService.filterPhones(price, camera, storage, cpu, 0); // Start from page 0
        } else {
            allPhones = await PhoneService.filterPhones(price, brand, camera, storage, cpu, 0); // Start from page 0
        }

        if (!allPhones || allPhones.content.length === 0) {
            setPhones(null);
        } else {
            setPhones(allPhones);
            setTotalPages(allPhones.totalPages);
        }
    };


    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }


    const handleReload = async () => {
        setModalOpen(false);
        setCurrentPage(1);
        try {
            await fetchPhones();
        } catch (error) {
            console.error("Failed to reload phones", error);
        }
    };
    if (!phones || !phones.content) {
        return (
            <>
                <div className="text-center mt-5" style={{height: '100vh'}}>
                    <MDBIcon fas icon="search" size="3x"/>
                    <p className="mt-3">No results found</p>
                    <MDBBtn color="primary" onClick={handleReload}>
                        <MDBIcon fas icon="home"/> Trở lại
                    </MDBBtn>
                </div>
            </>
        );
    }


    return (
        <>
            <div className="row">
                <div className="col-md-3 me-auto ms-0">
                    <div className="card">
                        <div className="card-body">
                            <strong className="card-title" style={{color:"black"}}>Lọc Sản Phẩm</strong>
                            <form onSubmit={(e) => handleFilterSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="priceRange" className="form-label" style={{color:"black"}}>Giá Tiền</label>
                                    <input type="range" className="form-range" id="priceRange" min="0" max="1000"
                                           step="10" value={price} onChange={(e) => setPrice(e.target.value)}/>
                                    <p>Price: <span id="priceRangeValue">${price} VNĐ</span></p>
                                </div>
                                {/*Brands */}
                                <div className="mb-3">
                                    <label className="form-label" style={{color:"black"}}>Thương Hiệu</label>
                                    {/*<select className="form-select" multiple aria-label="Select multiple brands"*/}
                                    {/*        onChange={handleChange}>*/}
                                    {/*    {brands.map((brand, index) => (*/}
                                    {/*        <option key={index} value={JSON.stringify(brand)}>*/}
                                    {/*            <img*/}
                                    {/*                src={brand.src}*/}
                                    {/*                className="img-fluid"*/}
                                    {/*                height="20"*/}
                                    {/*                width="98"*/}
                                    {/*                loading="lazy"*/}
                                    {/*                alt={brand.alt}*/}
                                    {/*            />*/}
                                    {/*        </option>*/}
                                    {/*    ))}*/}
                                    {/*</select>*/}
                                    {brands.map((brand, index) => (
                                        <div key={index} className="brand-item">
                                            <button
                                                className={`btn p-0 ${selectedBrand === brand.id ? 'selected' : ''}`}
                                                onClick={() => handleChange(brand)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    outline: 'none'
                                                }}
                                                value={JSON.stringify(brand)}
                                            >
                                                <img
                                                    src={brand.src}
                                                    className="img-fluid"
                                                    height="20"
                                                    width="98"
                                                    loading="lazy"
                                                    alt={brand.alt}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {/*Camera Pixel*/}
                                <div className="mb-3">
                                    <label htmlFor="cameraPixel" className="form-label" style={{color:"black"}}>Camera</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cameraPixel"
                                            value={camera}
                                            onChange={(e) => setCamera(e.target.value)}
                                            min="1"
                                            placeholder="Enter megapixels"
                                        />
                                        <span className="input-group-text">MP</span>
                                    </div>
                                </div>
                                {/*/!* Storage *!/*/}
                                <div className="mb-3">
                                    <label htmlFor="storage" className="form-label" style={{color:"black"}}>Dung Lượng</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="storage"
                                            value={storage < 1024 ? storage : (storage / 1024).toFixed(2)}
                                            onChange={(e) => {
                                                let value = parseFloat(e.target.value);
                                                if (value >= 1 && storage >= 1024) {
                                                    setStorage((value * 1024));
                                                } else {
                                                    setStorage(value);
                                                }
                                            }}
                                            min="0"
                                            placeholder="Enter storage"
                                        />
                                        <span className="input-group-text">{storage >= 1024 ? 'TB' : 'GB'}</span>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="cpu" className="form-label" style={{color:"black"}}>CPU</label>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cpu"
                                            value={cpu}
                                            onChange={(e) => setCpu(e.target.value)}
                                            min="0"
                                            step="0.1"
                                            placeholder="Enter CPU speed"
                                        />
                                        <span className="input-group-text">GHz</span>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Lọc</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <section>
                        <div className="text-center">
                            <div className="row justify-content-center">
                                {
                                    phones.content.map((phone) => (
                                        <div className="col-lg-3 col-md-6 mb-4" key={phone.id}>
                                            <div className="card">
                                                <div
                                                    className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                                                    data-mdb-ripple-color="light">
                                                    <img src={phone.image} className="w-100"
                                                         style={{objectFit: 'cover'}}
                                                         alt={phone.name}/>
                                                    <a href="#!">
                                                        <div className="hover-overlay">
                                                            <div className="mask"
                                                                 style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="card-body">
                                                    <a href="#!" className="text-reset">
                                                        <strong className="card-title mb-2"
                                                                style={{color: 'black'}}>{phone.name}</strong>
                                                    </a>
                                                    <a href="#!" className="text-reset">
                                                        <p>{phone.brand.name}</p>
                                                    </a>
                                                    <strong className="mb-3 price"
                                                            style={{color: 'black'}}>{phone.price} VNĐ</strong>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <nav aria-label="Page navigation">
                <MDBPagination className="mb-0 d-flex justify-content-center">
                    <MDBPaginationItem disabled={currentPage === 1}>
                        <MDBPaginationLink
                            tag="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            aria-disabled={currentPage === 1}
                        >
                            Trước
                        </MDBPaginationLink>
                    </MDBPaginationItem>

                    {currentPage > 2 && (
                        <>
                            <MDBPaginationItem>
                                <MDBPaginationLink tag="button" onClick={() => handlePageChange(1)}>
                                    1
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                            {currentPage > 3 && (
                                <MDBPaginationItem disabled>
                                    <MDBPaginationLink tag="button">...</MDBPaginationLink>
                                </MDBPaginationItem>
                            )}
                        </>
                    )}

                    {currentPage > 1 && (
                        <MDBPaginationItem>
                            <MDBPaginationLink tag="button" onClick={() => handlePageChange(currentPage - 1)}>
                                {currentPage - 1}
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    )}

                    <MDBPaginationItem active aria-current="page">
                        <MDBPaginationLink tag="button">{currentPage}</MDBPaginationLink>
                    </MDBPaginationItem>

                    {currentPage < totalPages && (
                        <MDBPaginationItem>
                            <MDBPaginationLink tag="button" onClick={() => handlePageChange(currentPage + 1)}>
                                {currentPage + 1}
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                    )}

                    {currentPage < totalPages - 1 && (
                        <>
                            {currentPage < totalPages - 2 && (
                                <MDBPaginationItem disabled>
                                    <MDBPaginationLink tag="button">...</MDBPaginationLink>
                                </MDBPaginationItem>
                            )}
                            <MDBPaginationItem>
                                <MDBPaginationLink tag="button" onClick={() => handlePageChange(totalPages)}>
                                    {totalPages}
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                        </>
                    )}

                    <MDBPaginationItem disabled={currentPage === totalPages}>
                        <MDBPaginationLink
                            tag="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            aria-disabled={currentPage === totalPages}
                        >
                            Sau
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            </nav>
        </>
    )
}
export default memo(HomePage);