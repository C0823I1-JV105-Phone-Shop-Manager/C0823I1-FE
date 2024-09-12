import axios from "axios";

export const searchCustomer = async (name) => {
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        let result = await axios.get(`http://localhost:1010/api/customers?name=${name}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            });

        return result.data;
    } catch (error) {
        console.log(error);
    }
};