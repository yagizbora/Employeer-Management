import { axiosApp } from "@/utils/axiosAPI";

export default class OrderService {
    async getorders(params) {
        const response = await axiosApp.post('getorders',params)
        return response;
    }
    async iscomplatedsetbyid(body) {
        const response = await axiosApp.post('iscomplatedsetbyid', body)
        return response;
    }
}