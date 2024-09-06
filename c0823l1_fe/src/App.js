import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/userspage/Dashboard';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {PrivateRoutes} from "./components/routes/PrivateRoutes";
import {AdminRoutes} from "./components/routes/AdminRoutes";
import SupplierCreate from "./components/supplierPage/SupplierCreate";

function App() {

  return (
      <BrowserRouter>
        <div className="App">

            <Routes>
              <Route  path="/login" element={<LoginPage />}  />
                <Route path="*" element={<Navigate to="/login" />} />‰

                <Route element={<PrivateRoutes />} >
                    <Route  path="/user" element={<Dashboard />} />
                    <Route path="/supplier/create" element={<SupplierCreate/>}>
                </Route>


                </Route>
                <Route element={<AdminRoutes />} >

                </Route>



            </Routes>
        </div>
          <ToastContainer />
      </BrowserRouter>
  );
}

export default App;
