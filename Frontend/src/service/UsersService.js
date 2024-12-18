import { axiosApp } from "@/utils/axiosAPI";


export default class UserService {
    async uploadprofilephoto(data) {
        const formdata = new FormData();
        formdata.append('photo', data.photo);  // Burada 'photo' doğru şekilde ekleniyor
        formdata.append('id', data.id);        // 'id' de doğru şekilde ekleniyor

        // Axios isteğini yapıyoruz
        const response = await axiosApp.post('uploadprofilephoto', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Content-Type header'ını belirtmeye gerek yok ama ekleyelim
            }
        });

        return response;
    }


    async profilephoto(data)
    {
        const response = await axiosApp.post(`profilephoto`,data);
        return response;
    }

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
    async getemailbyid(data) {
        const response = await axiosApp.get('getemail', {
            params: {
                id: data.id 
            }
        });
        console.log(response)
        return response;
    }
    async logoutforsuperadmin(data) {
        const response = await axiosApp.post('logoutuserforsuperadmin', data);
        return response;
    }
    async getprofilephoto(data) {
        const response = await axiosApp.get('getprofilephoto', {
            params: {
                id: data.id
            }
        });
        console.log(response)
        return response;
    }

    async getalluserdatabyid(data) {

        const response = await axiosApp.get('getalldatausers', {
            params: {
                id: data.id
            }
        });
        return response;
    }
    async changeemail(data) {
        const response = await axiosApp.post('changeemail', data);
        return response;
    }
    async usersurnamechange(data)
    {
    const response = await axiosApp.post('usersurnamechange', data);
    return response;
    } 
}