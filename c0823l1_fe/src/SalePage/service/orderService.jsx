import axios from "axios";
import { Bounce, toast } from "react-toastify";

export const createOrder = async (order) => {
    try {
        const token = localStorage.getItem('token');
        let result = await axios.post(`http://localhost:1010/api/orders`, order,
            {
                headers: { Authorization: `Bearer ${token}` }
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
        console.log(result.data)
        return result.data;
    } catch (error) {
        for (const er of error.response.data.errors) {
            toast.error(`${er}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce
            });
        }

        console.log(error);
    }
};

export const getOrderById = async (id) => {
    try {
        const token = localStorage.getItem('token');
        let result = await axios.get(`http://localhost:1010/api/orders/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            });

        return result.data;
    } catch (error) {
        console.log(error);
    }
};