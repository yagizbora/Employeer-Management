import { axiosApp } from "@/utils/axiosAPI";

export default class DepartmantService {
    async getdepartmant() {
        const response = await axiosApp.get('departmants')
        return response.data
    }
    async getdepartmantbyid(data) {
        const response = await axiosApp.get(`departmants/${data.id}`)
        console.log(response)
        return response.data
    }
    async createdepartmant(data) {
        const response = await axiosApp.post('createDepartmant',data)
        return response;
    }
    async deletedepartmant(data) {
        const response = await axiosApp.post(`DeleteDepartmant/${data.id}`)
        return response
    }
    async editdepartmant(data) {
        const response = await axiosApp.post(`updatedepartmant`, data)
        return response
    }
}