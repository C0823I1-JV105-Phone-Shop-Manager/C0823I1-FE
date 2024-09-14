import {memo, useEffect, useState} from "react";
import * as PhoneService from "../../../service/PhoneService";
import * as BrandService from "../../../service/BrandService";
import {MDBIcon, MDBPagination, MDBPaginationItem, MDBPaginationLink} from "mdb-react-ui-kit";

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

    useEffect(() => {
        document.title = "Home";
        if (search) {
            fetchPhones(search, currentPage-1);
        }
    }, [search,currentPage]);
    useEffect(() => {
        document.title = "Home";
        if (brandS) {
            filterPhonesByBrand(brandS, currentPage-1);
        }
    }, [brandS, currentPage]);

    const fetchPhones = async (name, page) => {
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
        getAllPhones(name, price, cpu, camera, storage, brand, currentPage-1);
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

    const handleChange = (event) => {
        const selectedValue = event.target.value;

        if (selectedValue !== " ") {
            try {
                const selectedBrand = JSON.parse(selectedValue);
                setBrand(selectedBrand);
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
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
    if (!phones) return (
        <>
            <div className="text-center mt-5" style={{height: '100vh'}}>
                <MDBIcon fas icon="search" size="3x"/>
                <p className="mt-3">No results found</p>
            </div>
        </>
    );



    return (
        <>
            <div className="row">
                <div className="col-md-3 me-auto ms-0">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Filter</h5>
                            <form onSubmit={(e) => handleFilterSubmit(e)}>
                                <div className="mb-3">
                                    <label htmlFor="priceRange" className="form-label">Price Range</label>
                                    <input type="range" className="form-range" id="priceRange" min="0" max="1000"
                                           step="10" value={price} onChange={(e) => setPrice(e.target.value)}/>
                                    <p>Price: <span id="priceRangeValue">${price} VNĐ</span></p>
                                </div>
                                {/* Brands */}
                                <div className="mb-3">
                                    <label className="form-label">Brands</label>
                                    <select className="form-select" multiple aria-label="Select multiple brands"
                                            onChange={handleChange}>
                                        {brandList.map((brand, index) => (
                                            <option key={index} value={JSON.stringify(brand)}>{brand.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {/*Camera Pixel*/}
                                <div className="mb-3">
                                    <label htmlFor="cameraPixel" className="form-label">Camera Pixel</label>
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
                                    <label htmlFor="storage" className="form-label">Storage</label>
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
                                    <label htmlFor="cpu" className="form-label">CPU Speed</label>
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
                                <button type="submit" className="btn btn-primary">Apply Filter</button>
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
                                                        <h5 className="card-title mb-2">{phone.name}</h5>
                                                    </a>
                                                    <a href="#!" className="text-reset">
                                                        <p>{phone.brand.name}</p>
                                                    </a>
                                                    <h6 className="mb-3 price">{phone.price} VNĐ</h6>
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
                            Previous
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
                            Next
                        </MDBPaginationLink>
                    </MDBPaginationItem>
                </MDBPagination>
            </nav>
        </>
    )
}
export default memo(HomePage);