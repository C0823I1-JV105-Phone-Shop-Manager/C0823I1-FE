    import axios from "axios";

export const getAllBrands = async () => {
    try {
        let brands = await axios.get("http://localhost:1010/api/brands")
        return brands.data;
    } catch (e) {
        return []
    }
}