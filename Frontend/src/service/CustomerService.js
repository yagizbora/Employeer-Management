import { axiosApp } from "@/utils/axiosAPI";


export default class CustomerService {
    async getcustomers() {
        const response = await axiosApp.get('getcustomer');
        return response;
    }
}