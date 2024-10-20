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
}