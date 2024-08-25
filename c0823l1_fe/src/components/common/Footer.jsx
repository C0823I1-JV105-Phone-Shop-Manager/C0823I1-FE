import React, { useState, useEffect } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"; // Correctly import Bootstrap Icons CSS
import "../assets/bootstrap/css/bootstrap.min.css";
import "../assets/css/footer.css";

export default function Footer() {
    return (
        <footer className="sticky-footer" style={{color : "white", '--bs-secondary': '#36B9CC', '--bs-secondary-rgb': '133,135,150' }}>
            <div className="container my-auto">
                <div className="text-center my-auto copyright"><span>Copyright © C08 Devs</span></div>
            </div>
        </footer>
    );
}

