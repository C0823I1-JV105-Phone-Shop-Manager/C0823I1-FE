import axios from "axios";
import {Bounce, toast} from "react-toastify";

export const createOrder = async (order) => {
    try {
        const token = localStorage.getItem('token');
        let result = await axios.post(`http://localhost:1010/api/orders`,order,
            {
                headers: {Authorization: `Bearer ${token}`}
            });
        toast.success('Thêm mới đơn hàng thành công', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce
        })
        return result.data;
    } catch (error) {
        for (const key in error.response.data.details) {
            if (error.response.data.details.hasOwnProperty(key)) {
                toast.error(`${error.response.data.details[key]}`);
            }
        }
        // toast.error(error.response.data.details.toString);
        console.log(error);
    }
};