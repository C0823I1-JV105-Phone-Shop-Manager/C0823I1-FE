import { Outlet, Navigate } from 'react-router-dom';
import UserService from "../service/UserService";
import Swal from 'sweetalert2';

export const PublicRoutes = () => {
    if (UserService.isAuthenticated()) {
        Swal.fire({
            title: 'Please logout before',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return <Navigate to="/user/profile" />;
    }
    return <Outlet />;
}