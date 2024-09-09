import {memo, useState} from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../header/style.css';
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
    const huawei="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/huawei%20(1).png?alt=media&token=d19dc912-15c1-4e92-9891-2f5c6c0f9b4d"
    const asus="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_67.webp?alt=media&token=bf7af5dd-e349-409f-99d0-cf791872f246"
    const realme="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_63.webp?alt=media&token=edb2a87e-b039-4580-a38f-b04f278dbe5d"
    const oppo="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_62.webp?alt=media&token=63117d4a-78dc-4265-ae51-c33099520183"
    const xiaomi="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_61.webp?alt=media&token=9b31b994-52f7-4347-9a77-b92f4498e8e4"
    const samsung="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_60.webp?alt=media&token=c4f57909-d6f5-4574-b4f0-bc7b06ab5659"
    const nokia="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/frame_37_1.webp?alt=media&token=01b53b79-c646-49b5-9740-ed2140f3606e"
    const sony="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/brand-icon-sony_2.webp?alt=media&token=5337ccc1-799c-452f-82dd-a5fbb87e559e"
    const logo="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/logo.png?alt=media&token=2a849590-992c-43b7-bdef-8b248642abd1"
    const apple="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/apple.webp?alt=media&token=04b2aa63-9abc-465e-b312-6261c9f88b1f"
    const slide1="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/720x220--2--720x220.png?alt=media&token=813a4f07-4ca3-4cf1-b92c-94de6f5250a6"
    const slide2="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/Carousel.png?alt=media&token=7daca841-1283-4f81-a1d9-b065177910bb"
    const slide3="https://firebasestorage.googleapis.com/v0/b/fb-phone-manager.appspot.com/o/Thi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn.png?alt=media&token=fa14e11a-a6e9-46a9-b27b-6ab97d23e6e3"
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