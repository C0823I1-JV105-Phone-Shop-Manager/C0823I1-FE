import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './components/auth/LoginPage';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';



function App() {

  return (
      <BrowserRouter>
        <div className="App">
          {/*<Navbar />*/}
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              {/* Check if user is authenticated and admin before rendering admin-only routes */}
              {UserService.adminOnly() && (
                  <>
                    <Route path="/admin/user-management" element={<UserManagementPage />} />
                    <Route path="/update-user/:userId" element={<UpdateUser />} />
                  </>
              )}
              <Route path="*" element={<Navigate to="/login" />} />‰
            </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
