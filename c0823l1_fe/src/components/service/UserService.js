import axios from "axios";
import Swal from "sweetalert2";
import {Navigate} from "react-router-dom";

class UserService{
    static BASE_URL = "http://localhost:1010"

    static async login(username, password){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/auth/login`, {username, password})
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-all-users`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async getYourProfile(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminstaff/profile`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async getYourPassword(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/adminstaff/password`,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }
    static async updateYourPassword(token, userData){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/adminstaff/update/password`, userData,
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUserById(userId, token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/admin/get-users/${userId}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async updateUser(userData, token){
        try{
            const response = await axios.put(`${UserService.BASE_URL}/adminstaff/update`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout() {
                localStorage.clear();
                Swal.fire(
                    'Logged out!',
                    'You have been logged out.',
                    'success'
                );
                    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ADMIN'
    }

    static isStaff(){
        const role = localStorage.getItem('role')
        return role === 'STAFF'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }
    static staffOnly(){
        return this.isAuthenticated() && this.isStaff();
    }

}

export default UserService;