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
    async getordersbyid(data) {
        const response = await axiosApp.get('getordersbyid', {
            params: {
                id: data.id
            }
        })
        return response;
    }
    async createorder(data) {
        const response = await axiosApp.post('createorder', data)
        return response;
    }
    async getEmployeersByDepartmantId(data) {
        const response = await axiosApp.get(`getEmployeersByDepartmantId/${data}`)
        return response;
    }
}