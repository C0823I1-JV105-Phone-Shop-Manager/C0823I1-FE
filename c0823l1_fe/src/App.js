import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import UserService from './components/service/UserService';
import HomePage from './components/userspage/HomePage';



function App() {

  return (
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/login" element={<LoginPage />} />
                <Route path="/admin/:token" element={<HomePage />} />
                <Route path="/staff/:token" element={<HomePage />} />

              <Route path="*" element={<Navigate to="/login" />} />‰
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
