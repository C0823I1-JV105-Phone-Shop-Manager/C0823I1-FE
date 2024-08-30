import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import HomePage from './components/userspage/HomePage';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/user" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/login" />} />‰
            </Routes>
        </div>
          <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
