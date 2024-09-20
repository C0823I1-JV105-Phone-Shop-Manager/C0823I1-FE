import axios from "axios";

    const BASE_URL = "http://localhost:1010";

export const createSupplier = async (supplier,token) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/supplier/create`, supplier,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
            )
        return response;
    } catch (err){
        // Nếu có lỗi, in chi tiết lỗi ra console và trả về lỗi
        if (err.response) {
            // Khi server trả về lỗi

            return err.response;
        } else if (err.request) {
            // Khi không nhận được phản hồi từ server
            console.log(2)
            console.error("Error request:", err.request);
            return { message: 'No response from server.' };
        } else {
            // Khi có lỗi trong cấu hình yêu cầu
            console.log(3)
            console.error('Error message:', err.message);
            return { message: err.message };
        }
        // return err.response;
    }
}

export const findSupplierById = async (supplierId,token) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/supplier/${supplierId}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return response.data;
    } catch (err){
        return null;
    }
}
export const updateSupplier = async (supplier,token,supplierId) => {

    try {
        console.log(supplier);
        console.log(supplierId);
        const response = await axios.put(`${BASE_URL}/api/supplier/update/${supplierId}`, supplier,
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        )
        return response;
    } catch (err){
        return false;
    }
}
