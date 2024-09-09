import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/bootstrap/css/bootstrap.min.css";
import NavTop from "../common/NavTop";

function ErrorPage() {
    return (
        <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
                <NavTop />
                <h1>404</h1>
            </div>
        </div>
    );
}

export default ErrorPage;