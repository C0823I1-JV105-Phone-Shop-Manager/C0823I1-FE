import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/userspage/Dashboard';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { PrivateRoutes } from "./components/routes/PrivateRoutes";
import { AdminRoutes } from "./components/routes/AdminRoutes";
import ProductDashboard from "./components/userspage/ProductDashboard";
import RouterCustom from "./Homepage/RouterCustom";

function App() {
  return (

    <BrowserRouter>
        <Routes>
            {/*login*/}
          <Route path="/login" element={<LoginPage />} />
            {/*authonly*/}
          <Route element={<PrivateRoutes />}>
            <Route path="/user" element={<Dashboard />} />
            <Route path="/user/product" element={<ProductDashboard />} />
          </Route>
            {/*admin*/}
          <Route element={<AdminRoutes />} />
            {/*Homepage*/}
            <Route path="*" element={<RouterCustom/>}/>
        </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;