import { axiosApp } from "@/utils/axiosAPI";

export default class ProjectService {
    async getProjects() {
        const response = await axiosApp.get('getprojects')
        return response
    }
    async createProject(data) {
        const response = await axiosApp.post('createprojects', data)
        return response
    }
    async getProjectsbyid(data) {
        const response = await axiosApp.get('getprojectsbyid',
            {
                params: {
                    id: data.id
                }
            }
        )
        console.log(response)
        return response;
    }
    async updateproject(data) {
        const response = await axiosApp.post('updateprojects', data)
        return response
    }
    async deleteproject(data) {
        const response = await axiosApp.post('deleteprojectsbyid', {
            id: data.id
        })
        return response;
    }
}