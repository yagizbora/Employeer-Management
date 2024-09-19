import { axiosApp } from "@/utils/axiosAPI";


export default class PriorityService {
    async getpriorities() {
        const response = await axiosApp.get('getPriority')
        return response
    }
}