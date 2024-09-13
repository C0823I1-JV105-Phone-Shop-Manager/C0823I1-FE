
import axios from "axios";

export const getAllPhone = async (name, page = 1, size = 8) => {
    try {
        let query = "http://localhost:1010/api/products?"
        if (name) {
            query += `name=${name}&`;
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

// Hàm lấy toàn bộ danh sách sản phẩm
export const listProduct = async () => {
    try {
        const response = await axios.get("http://localhost:1010/api/[product]");
        return response.data.content; // Nếu API trả về cấu trúc giống như phân trang
    } catch (err) {
        console.error(" Không tìm được danh sách sản phẩm :", err);
        throw err;
    }

}

// Hàm xóa 1 sản phẩm theo ID
export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`http://localhost:1010/api/product/delete/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Xoá sản phẩm thất bại:", error);
        throw error;
    }
};
// Hàm hiển thị chi tiết sản phẩm theo ID
export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:1010/api/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Hiển thị chi tiết sản phẩm thất bại:", error);
        throw error;
    }
};