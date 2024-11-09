import { axiosApp } from "@/utils/axiosAPI";


export default class UserService {

    async Userlist(data) {
        const response = await axiosApp.post('listusers',data);
        return response;
    }
    async createusers(data) {
        const response = await axiosApp.post('register',data);
        return response;
    }
    async logout(data) {
        const response = await axiosApp.post('logout', data);
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
    async changepassword(data) {
        const response = await axiosApp.post('changepassword', data);
        return response;
    }
    async changeusername(data) {
        const response = await axiosApp.post('changeusername', data);
        return response;
    }
    async changeemail(data) {
        const response = await axiosApp.post('changeemail', data);
        return response;
    }
}