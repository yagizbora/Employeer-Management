import { axiosApp } from "@/utils/axiosAPI";


export default class Complaintservice {
    async getcomplaint() {
        const response = await axiosApp.get('getcomplaints')
        return response.data.data
    }
    async getcomplaintsbyid(id) {
        const response = await axiosApp.get('getcomplaintsbyid', { params: { id } });
        return response.data;
    }

    async createcomplaint(data) {
        const response = await axiosApp.post('createcomplaints', data)
        return response
    }
    async deletecomplaint(data) {
        const response = await axiosApp.post('deletecomplaintsbyid', {
            id: data.id
        })
        return response
    }
    async updatecomplaintsbyid(data) {
        const response = await axiosApp.post('updatecomplaintsbyid', data)
        return response
    }
}