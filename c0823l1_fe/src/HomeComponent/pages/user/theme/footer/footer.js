import {memo} from "react";

const Footer = () => {
    return (
        <>
            <footer className="text-center text-lg-start text-muted" style={{backgroundColor: "white"}}>
                <section>
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>Code Gym
                                </h6>
                                <p>
                                    Ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và miễn phí
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">CHĂM SÓC KHÁCH HÀNG</h6>
                                <p><a href="#!" className="text-reset">Trung Tâm Trợ Giúp</a></p>
                                <p><a href="#!" className="text-reset">Codegym education</a></p>
                                <p><a href="#!" className="text-reset">Chính Sách Bảo Hành</a></p>
                                <p><a href="#!" className="text-reset">Chăm Sóc Khách Hàng</a></p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">VỀ Codegym</h6>
                                <p><a href="#!" className="text-reset">Giới Thiệu Về Codegym</a></p>
                                <p><a href="#!" className="text-reset">Tuyển Dụng</a></p>
                                <p><a href="#!" className="text-reset">Liên Hệ Với Truyền Thông</a></p>
                                <p><a href="#!" className="text-reset">Kênh Người Bán</a></p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">LIÊN HỆ</h6>
                                <p><i className="fas fa-home me-3"></i>  295 Nguyễn Tất Thành,Hải Châu</p>
                                <p><i className="fas fa-envelope me-3"></i> info@example.com</p>
                                <p><i className="fas fa-phone me-3"></i> 0989 534 458 </p>
                                <p><i className="fas fa-print me-3"></i> 0989 534 458</p>
                            </div>
                        </div>
                    </div>
                </section>
                <hr className="text-dark"/>
                <div className="d-flex justify-content-center">
                    <section className="mb-4">
                        <a
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor: "#3b5998"}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-facebook-f"></i></a>

                        <a
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor: "#55acee"}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-twitter"></i></a>

                        <a
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor: "#dd4b39"}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-google"></i></a>

                        <a
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor: "#ac2bac"}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-instagram"></i></a>

                        <a
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor: "#0082ca"}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-linkedin-in"></i></a>

                        <a
                            data-mdb-ripple-init
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor: "#333333"}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-github"></i></a>
                    </section>
                </div>

                <div className="text-center p-4" style={{backgroundColor: "#36B9CC", color: "black"}}>
                    © 2024 Copyright
                </div>
            </footer>

        </>
    )


}
export default memo(Footer);