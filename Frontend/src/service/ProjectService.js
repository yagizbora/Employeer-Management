import { axiosApp } from "@/utils/axiosAPI";

export default class ProjectService {
    async getProjects() {
        const response = await axiosApp.get('getprojects')
        return response
    }
    // async createProject(data) {
    //     const response = await axiosApp.post('createproject', data)
    //     return response
    // }
    // async updateProject(data) {
    //     const response = await axiosApp.put('updateproject', data)
    //     return response
    // }
}