import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import UserService from './components/service/UserService';
import HomePage from './components/userspage/HomePage';
import {ToastContainer} from "react-toastify";


function App() {

  return (
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/login" element={<LoginPage />} />
                <Route path="/user/:token" element={<HomePage />} />

              {/* Check if user is authenticated and admin before rendering admin-only routes */}
                {
                    UserService.staffOnly() && (
                        <>
                        </>
                    )
                }
              {UserService.adminOnly() && (
                  <>
                  </>
              )}
              <Route path="*" element={<Navigate to="/login" />} />‰
            </Routes>
        </div>
          <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
