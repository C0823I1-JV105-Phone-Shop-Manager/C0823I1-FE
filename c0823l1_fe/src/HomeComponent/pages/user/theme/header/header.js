import {memo, useState} from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../header/style.css';
import logo from "../../../../assets/img/logo.png";
import apple from "../../../../assets/img/apple.webp";
import sony from "../../../../assets/img/brand-icon-sony_2.webp";
import nokia from "../../../../assets/img/frame_37_1.webp";
import samsung from "../../../../assets/img/frame_60.webp";
import xiaomi from "../../../../assets/img/frame_61.webp";
import oppo from "../../../../assets/img/frame_62.webp";
import realme from "../../../../assets/img/frame_63.webp";
import asus from "../../../../assets/img/frame_67.webp";
import huawei from "../../../../assets/img/huawei (1).png";
import slide1 from '../../../../assets/img/720x220--2--720x220.png';
import slide2 from '../../../../assets/img/Carousel.png';
import slide3 from '../../../../assets/img/Thiết kế chưa có tên.png';
import {ROUTERS} from "../../../../utils/router";
import {
    MDBBtn,
    MDBCarousel,
    MDBCarouselItem,
    MDBCollapse,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBInputGroup,
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarNav,
} from "mdb-react-ui-kit";


const Header = ({handleSearch,onBrandClick}) => {
    const [home, setHome] = useState([
        {
            name: "Trang Chủ",
            path: ROUTERS.USER.HOME
        }
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const brands = [
        { id: 1, src: apple, alt: "Apple" },
        { id: 2, src: sony, alt: "Sony" },
        { id: 3, src: nokia, alt: "Nokia" },
        { id: 4, src: samsung, alt: "SamSung" },
        { id: 5, src: xiaomi, alt: "Xiaomi" },
        { id: 6, src: oppo, alt: "Oppo" },
        { id: 7, src: realme, alt: "Realme" },
        { id: 8, src: asus, alt: "Asus" },
        { id: 9, src: huawei, alt: "Huawei" },
    ];

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        handleSearch(searchTerm)
    }
    const handleClickBrand = async (brand) => {
        onBrandClick(brand)
    }

    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-light" style={{backgroundColor: "#36B9CC"}}>
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent1">
                        <a className="navbar-brand mt-lg-2 mt-sm-0" href={home[0].path}>
                            <img
                                src={logo}
                                height="40"
                                width="40"
                                alt="CodeGym Logo"
                                loading="lazy"
                                className="m-0"
                            />
                        </a>
                    </div>

                    <div className="d-flex align-items-center">
                        <form onSubmit={handleSearchSubmit}>
                            <MDBInputGroup>
                                <MDBInput
                                    label="Search"
                                    id="form1"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MDBBtn color="primary" type="submit">
                                    <span className="visually-hidden">Search</span>
                                    <MDBIcon fas icon="search"/>
                                </MDBBtn>
                            </MDBInputGroup>
                        </form>
                    </div>
                </div>
            </nav>

            <MDBNavbar expand="lg" dark className="mt-5 mb-4 shadow pt-4">
                <MDBContainer fluid>
                    <MDBCollapse navbar id="navbarSupportedContent2">
                        <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
                            {brands.map((brand, index) => (
                                <MDBNavbarItem key={index} className="nav-item active">
                                    <button
                                        className="btn p-0"
                                        onClick={() =>handleClickBrand(brand) }
                                        style={{background: 'none', border: 'none'}}
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
                                </MDBNavbarItem>
                            ))}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>

            <MDBCarousel showControls interval={3000}>
                <MDBCarouselItem itemId={1} interval={1000}>
                    <img src={slide1} className={'d-block h-100 w-100'} alt='Carousel1'/>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={2}>
                    <img src={slide2} className='d-block h-100 w-100 ' alt='Carousel2'/>
                </MDBCarouselItem>
                <MDBCarouselItem itemId={3}>
                    <img src={slide3} className={'d-block h-100 w-100'} alt='Carousel3'/>
                </MDBCarouselItem>
            </MDBCarousel>
        </>
    )


}
export default memo(Header);