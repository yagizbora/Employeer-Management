import { axiosApp } from "@/utils/axiosAPI";


export default class NeedService {
    async getNeeds() {
        const response = await axiosApp.get('getneed');
        return response;
    }
    async createNeed(data) {
        const response = await axiosApp.post('createneed', data);
        return response;
    }
    async getNeedsbyid(data) {
        const response = await axiosApp.get('getneedbyid', {
            params: {
                id: data.id
            }
        });
        return response;
    }
    async deleteneedbyid(data) {
        const response = await axiosApp.post('deleteneedbyid', {
            id: data.id
        });
        return response;
    }
    async updateneedbyid(data) {
        const response = await axiosApp.post('updateneedbyid', data);
        return response;
    }
    //  async GetNeedByEmployerId(id) {
    //      const response = await axiosApp.get('GetNeedByEmployerId', { params: { id } });
    //      return response.data;
    //  }
}