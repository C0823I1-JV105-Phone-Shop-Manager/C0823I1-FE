import axios from "axios";

export const getAllPhone = async (name, page = 1, size = 8) => {
    try {
        let query = "http://localhost:1010/api/products?"
        // if (name) {
        //     query += `name=${name}&`;
        // }
        if (name && name.trim()) {
            query += `name=${name.trim()}&`;
        }
        query += `page=${page}&size=${size}`;
        // Xóa ký tự "&" cuối cùng nếu có
        query = query.endsWith('&') ? query.slice(0, -1) : query;

        // Kiểm tra nếu query chỉ có phần base URL mà không có query parameters
        if (query.endsWith('?')) {
            query = query.slice(0, -1);
        }
        let result = await axios.get(query);
        return result.data
    } catch (e) {
        console.log(e);
    }
}
export const filterPhones = async (price, brand, camera, storage, cpu, page = 1, size = 8) => {
    try {
        let query = "http://localhost:1010/api/filters?"
        if (price) {
            query += `price=${price}&`;
        }
        if (brand) {
            query += `brand=${brand.id}&`;
        }
        if (camera) {
            query += `camera=${camera}&`;
        }
        if (storage) {
            query += `storage=${storage}&`;
        }
        if (cpu) {
            query += `cpu=${cpu}&`;
        }
        query += `page=${page}&size=${size}`;

        // Xóa ký tự "&" cuối cùng nếu có
        query = query.endsWith('&') ? query.slice(0, -1) : query;

        // Kiểm tra nếu query chỉ có phần base URL mà không có query parameters
        if (query.endsWith('?')) {
            query = query.slice(0, -1);
        }

        let result = await axios.get(query);
        return result.data;
    } catch (e) {
        console.log(e);
    }
}
export const filterPhonesByBrand = async (brand, page = 1, size = 8) => {
    try {
        let query = "http://localhost:1010/api/filters?"
        if (brand) {
            query += `brand=${brand.id}&`;
        }
        query += `page=${page}&size=${size}`;

        // Xóa ký tự "&" cuối cùng nếu có
        query = query.endsWith('&') ? query.slice(0, -1) : query;

        // Kiểm tra nếu query chỉ có phần base URL mà không có query parameters
        if (query.endsWith('?')) {
            query = query.slice(0, -1);
        }

        let result = await axios.get(query);
        return result.data;
    } catch (e) {
        console.log(e);
    }
}
