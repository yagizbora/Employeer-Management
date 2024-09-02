import { axiosApp } from "@/utils/axiosAPI";

export default class EmployeerService {
    async getEmployeers() {
        const response = await axiosApp.get('employeers');
        return response.data.data;
    }
    async Addemployeer(data) {
        const response = await axiosApp.post('Addemployeers', data);
        return response;
    }
    async DeleteEmployeer(data) {
        const response = await axiosApp.post(`DeleteEmployeer/${data.id}`)
        return response;
    }
    async get(data) {
        try {
            const response = await axiosApp.get(`/employeers/${data.id}`);
            console.log(response.data);  // API'den gelen veriyi kontrol edin
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async update(data) {
        try {
            const response = await axiosApp.post(`updateemployeer/${data.id}`, data);
            return response.data.data;
        }
        catch (error) {
            console.log(error);
        }
    }

}