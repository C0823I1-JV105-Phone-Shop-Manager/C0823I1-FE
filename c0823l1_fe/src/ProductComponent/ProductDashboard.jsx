import React from 'react';
import  {SideNav} from "../components/common/SideNav";
import "bootstrap-icons/font/bootstrap-icons.css"; // Correctly import Bootstrap Icons CSS
import "../components/assets/bootstrap/css/bootstrap.min.css";
import Footer from "../components/common/Footer";
import "../components/assets/css/animate.min.css";
import "../components/assets/fonts/fontawesome-all.min.css";

export default function ProductDashboard() {
    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav />
                {/*<ProductManagement />*/}
            </div>
            <Footer />
        </div>
    );
}