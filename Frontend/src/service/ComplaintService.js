import { axiosApp } from "@/utils/axiosAPI";


export default class Complaintservice {
    async getcomplaint() {
        const response = await axiosApp.get('getcomplaints')
        return response.data.data
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
}