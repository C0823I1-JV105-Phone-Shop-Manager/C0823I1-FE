import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/userspage/Dashboard';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {PrivateRoutes} from "./components/routes/PrivateRoutes";
import {AdminRoutes} from "./components/routes/AdminRoutes";
import SupplierCreate from "./components/supplierPage/SupplierCreate";
import SupplierUpdate from "./components/supplierPage/SupplierUpdate";
import ProductDashboard from "./ProductComponent/ProductDashboard";
import ListSupplier from "./SupplierComponent/listSupplier";

function App() {
  return (
      <BrowserRouter>
            <Routes>
              <Route  path="/login" element={<LoginPage />}  />
                <Route path="*" element={<Navigate to="/login"/>}/>‰
                <Route element={<PrivateRoutes/>}>
                    <Route  path="/user" element={<Dashboard />} />
                    <Route path="/supplier/create" element={<SupplierCreate/>}/>
                    <Route path="/supplier/update/:id" element={<SupplierUpdate/>}/>
                    <Route path="/user/product" element={<ProductDashboard/>}/>
                    <Route  path="/user/product" element={<ProductDashboard/>} />
                    <Route  path="/supplier/list" element={<ListSupplier />} />
                </Route>
                <Route element={<AdminRoutes />}>
                </Route>
            </Routes>
          <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
