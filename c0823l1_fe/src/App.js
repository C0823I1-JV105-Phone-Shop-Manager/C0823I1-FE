import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/userspage/Dashboard';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {PrivateRoutes} from "./components/routes/PrivateRoutes";
import SupplierCreate from "./SupplierComponent/SupplierCreate";
import SupplierUpdate from "./SupplierComponent/SupplierUpdate";
import ListSupplier from "./SupplierComponent/listSupplier";
import DashboardError from "./components/userspage/DashboardError";
import RouterCustom from "./HomeComponent/RouterCustom";
import {PublicRoutes} from "./components/routes/PublicRoutes";
function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route element={<PublicRoutes />}>
                {/*login*/}
                <Route path="/login" element={<LoginPage />} />
            </Route>
            {/*authonly*/}
          <Route element={<PrivateRoutes />}>
              <Route path="*" element={<DashboardError />} />
              <Route path="/user/profile" element={<Dashboard />} />
              {/*<Route path="/user/product" element={<ProductDashboard />} />*/}
              <Route  path="user/supplier" element={<ListSupplier />} />
              <Route path="/supplier/create" element={<SupplierCreate/>}/>
              <Route path="/supplier/update/:id" element={<SupplierUpdate/>}/>
          </Route>
            {/*Homepage*/}
            <Route path="/" element={<RouterCustom/>}/>
        </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
