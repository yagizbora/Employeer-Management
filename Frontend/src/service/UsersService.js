import { axiosApp } from "@/utils/axiosAPI";


export default class UserService {

    async Userlist() {
        const response = await axiosApp.get('listusers');
        return response;
    }
    async createusers(data) {
        const response = await axiosApp.post('register',data);
        return response;
    }

    async adminstatus(data) {
        const response = await axiosApp.post('adminstatus', data);
        return response;
    }
    async deactiveusers(data) {
        const response = await axiosApp.post('deactiveusers', data);
        return response;
    }
}