import React, {useEffect} from 'react';
import  {SideNav} from "../components/common/SideNav";
import "bootstrap-icons/font/bootstrap-icons.css"; // Correctly import Bootstrap Icons CSS
import Footer from "../components/common/Footer";
import SalePage from "./pages/SalePage";
import OrderDetail from "./pages/OrderDetail";

export default function OrderDetailPageDashboard() {
    useEffect(() => {
        document.title = "Profile";
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav />
                <OrderDetail />
            </div>
            <Footer />
        </div>
    );
}