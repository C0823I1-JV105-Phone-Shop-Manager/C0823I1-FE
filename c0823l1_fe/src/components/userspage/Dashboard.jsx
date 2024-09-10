import React, {useEffect} from 'react';
import  {SideNav} from "../common/SideNav";
import "bootstrap-icons/font/bootstrap-icons.css"; // Correctly import Bootstrap Icons CSS
import "../assets/bootstrap/css/bootstrap.min.css";
import Profile from "../ProfilePage/Profile";
import Footer from "../common/Footer";
import "../assets/css/animate.min.css";
import "../assets/fonts/fontawesome-all.min.css";

export default function Dashboard() {
    useEffect(() => {
        document.title = "Profile";
    }, []); // Empty dependency array means this effect runs once after the initial render

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