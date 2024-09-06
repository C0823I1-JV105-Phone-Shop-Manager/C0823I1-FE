
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/userspage/Dashboard';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {PrivateRoutes} from "./components/routes/PrivateRoutes";
import {AdminRoutes} from "./components/routes/AdminRoutes";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
      <BrowserRouter>
        <div className="App">
            <Routes>
              <Route  path="/login" element={<LoginPage />}  />
                <Route path="*" element={<Navigate to="/login" />} />‰

                <Route element={<PrivateRoutes />} >
                    <Route  path="/user" element={<Dashboard />} />
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
