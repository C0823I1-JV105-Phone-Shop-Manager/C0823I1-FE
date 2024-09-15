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
        toast.error('Không tạo được đơn hàng dó lỗi xảy ra')
        console.log(error);
    }
};