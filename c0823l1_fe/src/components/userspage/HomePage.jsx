import React from 'react';
import  {SideNav} from "../common/SideNav";
import "bootstrap-icons/font/bootstrap-icons.css"; // Correctly import Bootstrap Icons CSS
import "../assets/bootstrap/css/bootstrap.min.css";
import Profile from "../common/Profile";
import Footer from "../common/Footer";
import "../assets/css/animate.min.css";
import "../assets/fonts/fontawesome-all.min.css";

export default function HomePage() {
    return (
        <div id="page-top" className="d-flex flex-column min-vh-100">
            <div id="wrapper" className="flex-grow-1">
                <SideNav />
                <Profile />
            </div>
            <Footer />
        </div>
    );
}