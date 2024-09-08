import { axiosApp } from "@/utils/axiosAPI";


export default class Complaintservice {
    async getcomplaint() {
        const response = await axiosApp.get('getcomplaints')
        return response.data.data
    }
}