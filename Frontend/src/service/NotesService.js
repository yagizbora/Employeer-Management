import { axiosApp } from "@/utils/axiosAPI";


export default class NotesService {
    async getnotes() {
        const response = await axiosApp.get('getnotes')
        return response.data.data
    }
    async createnotes(data) {
        const response = await axiosApp.post('createnotes', data)
        return response
    }
    async deletenotes(data) {
        const response = await axiosApp.post('deletenotes', {
            params: {
                id: data.id
            }
        })
        return response
    }
    async updatenotes(data) {
        const response = await axiosApp.post('updatenotes', data)
        return response
    }
    async getnotesbyid(data) {
        const response = await axiosApp.get('getnotesbyid', {
            params: {
                id: data.id
            }
        })
        return response
    }
}