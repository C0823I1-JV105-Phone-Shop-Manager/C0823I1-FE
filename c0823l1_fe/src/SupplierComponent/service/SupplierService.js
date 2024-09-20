import axios from "axios";

export const list = async (address = "", searchTerm = "", page = 0, size = 5, sortField = 'phone', sortOrder = 'desc') => {
    try {
        const response = await axios.get("http://localhost:1010/api/supplier/search", {
            params: {
                address,
                search: searchTerm,
                page,
                size,
                sort: `${sortField},${sortOrder}`
            }
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

export const softDeleteSuppliersByUid = async (uids) => {
    try {
        const response = await axios.post('http://localhost:1010/api/supplier/softDeleteByUids', uids, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const listAll = async () => {
    try {
        const response = await axios.get("http://localhost:1010/api/supplier");
        return response.data.content;
    } catch (err) {
        throw err;
    }
};
