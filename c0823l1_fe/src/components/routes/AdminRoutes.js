import {Outlet, Navigate} from 'react-router-dom';
import UserService from "../service/UserService";
export const AdminRoutes = () => {
    if (!UserService.isAdmin()) {
        UserService.logout();
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}