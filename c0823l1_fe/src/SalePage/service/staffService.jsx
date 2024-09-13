import axios from "axios";

export const findStaffByUserName = async (name) => {
    try {
        const token = localStorage.getItem('token');
        let result = await axios.get(`http://localhost:1010/api/staffs?name=${name}`,
            {
                headers: {Authorization: `Bearer ${token}`}
            });
        console.log(result.data)
        return result.data;
    } catch (error) {
        console.log(error);
    }
};