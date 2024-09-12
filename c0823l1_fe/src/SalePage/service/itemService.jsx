import axios from "axios";

export const searchItems = async (name) => {
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        let result = await axios.get(`http://localhost:1010/api/items?name=${name}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            });

        return result.data;
    } catch (error) {
        console.log(error);
    }
};

export const findById = async (id) => {
    try {
        const token = localStorage.getItem('token');

        let result = await axios.get(`http://localhost:1010/api/items/${id}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            });
        return result.data;
    } catch (error) {
        console.log(error);
    }
};