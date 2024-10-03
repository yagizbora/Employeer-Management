import { axiosApp } from "@/utils/axiosAPI";


export default class CustomerService {
    async getcustomers(payload) {
        const response = await axiosApp.post('getcustomer', payload); 
        return response;
    }
    async addcustomer(data) {
        const response = await axiosApp.post('addcustomer',data);
        return response;
    }
    async getcustomersbyid(data) {
        const response = await axiosApp.get('getcustomerbyid', {
            params: {
                id: data.id
            }
        });
        return response;
    }
    async deletecustomerbyid(data) {
        const response = await axiosApp.post('deletecustomerbyid', {
            id: data.id,
            is_important_customer: data.is_important_customer
        });
        return response;
    }
    async updatecustomerbyid(data) {
        const response = await axiosApp.post('updatecustomerbyid', data);
        return response;
    }
}