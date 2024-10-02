import { axiosApp } from "@/utils/axiosAPI";


export default class CustomerService {
    async getcustomers() {
        const response = await axiosApp.get('getcustomer');
        return response;
    }
    async addcustomer(data) {
        const response = await axiosApp.post('addcustomer',data);
        return response;
    }
    async getcustomersbyid() {
        const response = await axiosApp.get('getcustomersbyid', {
            params: {
                id: data.id
            }
        });
        return response;
    }
}