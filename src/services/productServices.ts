import axios from "axios";

export const productServices = {
    fetchProducts: async () => {
        try {
            const response = await axios.get('/products')
            return {status: response.status, data: response.data.data}
        } catch (error: any) {
            return {status: error.status, data: error.response.data.message}
        }
    }
}

export default productServices