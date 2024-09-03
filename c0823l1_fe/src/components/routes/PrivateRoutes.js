import {Outlet, Navigate} from 'react-router-dom';
import UserService from "../service/UserService";
export const PrivateRoutes = () => {
    if (!UserService.isAuthenticated()) {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}