import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/userspage/Dashboard';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PrivateRoutes } from "./components/routes/PrivateRoutes";
import { AdminRoutes } from "./components/routes/AdminRoutes";
import ProductDashboard from "./components/userspage/ProductDashboard";
import ListSupplier from "./supplier/listSupplier";
import HomePage from "./Homepage/pages/user/homePage/homePage";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route  path="/login" element={<LoginPage />}  />
                <Route path="*" element={<Navigate to="/login" />} />‰

                <Route element={<PrivateRoutes />} >
                    <Route  path="/user" element={<Dashboard />} />
                    <Route  path="/user/product" element={<ProductDashboard />} />
                    <Route  path="/supplier/list" element={<ListSupplier />} />
                </Route>

                <Route element={<AdminRoutes />} >

                </Route>

    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
            <Route path={"/"} element={<HomePage/>} />
          <Route element={<PrivateRoutes />}>
            <Route path="/user" element={<Dashboard />} />
            <Route path="/user/product" element={<ProductDashboard />} />
          </Route>
          <Route element={<AdminRoutes />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;