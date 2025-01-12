import { axiosApp } from "@/utils/axiosAPI";

export default class CommunactionHistoryService { 


    async getcommunactionHistory() {
        const response = await axiosApp.get('listallcommunicationhistory')
        return response
    }
    async getcommunactionHistorybyid(data) {
        const response = await axiosApp.get('listallcommunicationhistorybyid', { params: { id: data.id } });
        return response;
    }
    async createhistory(data) {
        const response = await axiosApp.post('createhistory', data)
        return response
    }
    async deletehistory(data) { 
        const response = await axiosApp.post('deletehistorybyid', { id: data.id });
        return response;
    }
    async edithistory(data) { 
        const response = await axiosApp.post('updatehistorybyid', data);
        return response;
    }
};