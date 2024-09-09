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
                                    Here you can use rows and columns to organize your footer content. Lorem ipsum dolor
                                    sit amet,
                                    consectetur adipisicing elit.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                                <p><a href="#!" className="text-reset">Angular</a></p>
                                <p><a href="#!" className="text-reset">React</a></p>
                                <p><a href="#!" className="text-reset">Vue</a></p>
                                <p><a href="#!" className="text-reset">Laravel</a></p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                                <p><a href="#!" className="text-reset">Pricing</a></p>
                                <p><a href="#!" className="text-reset">Settings</a></p>
                                <p><a href="#!" className="text-reset">Orders</a></p>
                                <p><a href="#!" className="text-reset">Help</a></p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> New York, NY 10012, US</p>
                                <p><i className="fas fa-envelope me-3"></i> info@example.com</p>
                                <p><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                                <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p>
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