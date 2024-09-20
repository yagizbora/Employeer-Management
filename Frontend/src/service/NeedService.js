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
        return response.data;
    }
    //  async UpdateNeed(data) {
    //      const response = await axiosApp.put('UpdateNeed', data);
    //      return response;
    //  }
    //  async DeleteNeed(id) {
    //      const response = await axiosApp.delete('DeleteNeed', { params: { id } });
    //      return response;
    //  }
    //  async GetNeedByEmployerId(id) {
    //      const response = await axiosApp.get('GetNeedByEmployerId', { params: { id } });
    //      return response.data;
    //  }
}