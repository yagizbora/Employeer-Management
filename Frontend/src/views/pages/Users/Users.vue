<script setup lang="js">
import UserService from '@/service/UsersService.js';
import Swal from 'sweetalert2';
import { IMG_BASE_URL } from "@/utils/helper.js";
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';



const data = ref([]);
const editemaildialog = ref(false)
const createusers = ref(false)
const uploadprofilephoto = ref(false)
const profilephotoref = ref({})
const previewphoto = ref({
    preview: null
})


const editnamesurnamedialog = ref(false)
const editnamesurnamedata = ref({})
const usersservice = new UserService()
const formData = ref({
    username: '',
    password: '',
    is_admin: false
})

const is_logged = ref(true)


const visiblestatus = ref()

const UsersTable = defineAsyncComponent(() => import('./UsersTable.vue'))


const switchbuttonlistener = async (event) => {
    getallusers()
}

const getallusers = async () => {
    const response = await usersservice.Userlist({
        is_logged: is_logged.value
    })
    if (response) {
        data.value = [];
        data.value = response.data.data;
    }
}

const checkadmin = async () => {
    const check = localStorage.getItem('is_admin')
    if (check) {
        visiblestatus.value = true
    }
    else if (!check) {
        visiblestatus.value = false
    }
}


const createuser = async () => {
    try {
        const response = await usersservice.createusers({ ...formData.value, user_id: localStorage.getItem('user_id') })
        if (response) {
            Swal.fire({
                title: 'User created successfully!',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK',
            })
            createusers.value = false
            formData.value = ({})
            getallusers()
        }
        if (response.status == 500) {
            createusers.value = false
            toast.add({ severity: 'error', summary: 'Error', detail: response.data.message, life: 3000 });
        }
    } catch (error) {
        createusers.value = false
        console.error('Error creating user:', error);
    }
}
const deactiveuser = async (data) => {
    const user_id = localStorage.getItem('user_id');

    const response = await usersservice.deactiveusers({ id: data.id, user_id: user_id })
    if (response.status === 200) {
        Swal.fire({
            title: 'User deactivated successfully!',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'OK',
        })
        getallusers()
    } else {
        console.error('Failed to deactivate user.');
    }
}

const editemaildata = ref({})


const editemail = async (data) => {
    try {
        const response = await usersservice.getemailbyid({ id: data.id });
        console.log('API Response:', response);

        if (response && response.data.length > 0) {
            editemaildata.value.id = response.data[0].id;
            editemaildata.value.oldemail = response.data[0].email;
            editemaildialog.value = true;
            console.log('Old Email Set:', editemaildata.value);
        } else {
            console.warn('No records found');
        }
    } catch (error) {
        console.error('Error fetching email:', error);
    }
};



const updateemail = async () => {
    try {
        if (editemaildata.value.oldemail == editemaildata.value.confirmemail) {
            editemaildialog.value = false;
            Swal.fire
                ({
                    title: 'You cannnot edit because old and new email are same.',
                    icon: 'error',
                    confirmButtonText: 'OK',

                })
            return;
        }
        if (!editemaildata.value.confirmemail) {
            editemaildialog.value = false;
            Swal.fire
                ({
                    title: 'Email is required.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            return;
        }
        else {
            const response = await usersservice.changeemail
                (
                    {
                        "id": editemaildata.value.id,
                        "email": editemaildata.value.confirmemail,
                        "user_id": localStorage.getItem('user_id')
                    }
                )
            if (response) {
                Swal.fire
                    ({
                        title: 'User email updated successfully!',
                        text: response.data.message,
                        icon: 'success',
                        confirmButtonText: 'OK',
                    })
                getallusers(),
                    editemaildialog.value = false;
                editemaildata.value = ({});

            }
        }

    } catch (e) {
        console.error('Error updating email:', e);
        editemaildialog.value = false;
    }
}

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        profilephotoref.value.photo = file;
        console.log('File selected:', file);
        const reader = new FileReader();
        reader.onload = (e) => {
            previewphoto.value.preview = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        console.error('No file selected');
    }
};

const uploadphoto = async (data) => {
    const response = await usersservice.getprofilephoto(data)
    if (response.data && response.data.length > 0) {
        profilephotoref.value = response.data[0]
        console.log('Profile Photo:', profilephotoref.value);
        uploadprofilephoto.value = true;
    }
}

const changenamesurname = async (data) => {
    try {
        const response = await usersservice.usersurnamechange({
            id: editnamesurnamedata.value.id,
            name: editnamesurnamedata.value.name,
            surname: editnamesurnamedata.value.surname
        });
        if (response) { 
            Swal.fire({
                title: 'User name and surname updated successfully!',
                text: response.data.message,
                icon:'success',
                confirmButtonText: 'OK',
            });
            getallusers()
            editnamesurnamedialog.value = false;
            editnamesurnamedata.value = ({});
        }
    } catch (e) {
        console.error('Error changing username:', e);
    }
}

const photoupload = async () => {
    if (!profilephotoref.value.photo) {
        Swal.fire({
            title: 'No file selected',
            icon: 'error',
            confirmButtonText: 'OK',
        });
        return uploadprofilephoto.value = false; 
    }

    if (data.value && data.value.length > 0) {
        console.log('Uploading for user ID:', profilephotoref.value.id);

        // Upload photo logic
        const response = await usersservice.uploadprofilephoto({
            id: profilephotoref.value.id,
            photo: profilephotoref.value.photo, 
        });

        if (response.status === 200) {
            Swal.fire({
                title: 'Profile photo uploaded successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
            getallusers()
            uploadprofilephoto.value = false;
        } else {
            Swal.fire({
                title: 'Error uploading photo',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            getallusers()
            uploadprofilephoto.value = false;
        }
    } else {
        Swal.fire({
            title: 'No user data found',
            icon: 'error',
            confirmButtonText: 'OK',
        });
        getallusers()
        uploadprofilephoto.value = false;
    }
};


const changeusernamedialog = async (data) => {
    try {
        const response = await usersservice.getalluserdatabyid(data);
        editnamesurnamedata.value = {
            id: response.data.id,
            name: response.data.name,
            surname: response.data.surname
        };
        editnamesurnamedialog.value = true;
    } catch (error) {
        console.error('Error fetching user data:', error);
        // Kullanıcıya hata mesajı gösterebilirsiniz
    }
};

onMounted(() => {
    getallusers(),
    checkadmin()
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Users</h4>
                </div>
                <Toolbar v-if="visiblestatus == true">
                    <template #start>
                        <Button severity="info" @click="createusers = true" text rounded icon="pi pi-plus"></Button>
                    </template>
                </Toolbar>
                <div class="flex flex-column">
                    <div>
                        <label> Active/Disable</label>
                    </div>
                    <div>
                        <InputSwitch v-model="is_logged" @change="switchbuttonlistener" />
                    </div>
                </div>
                <div>
                    <UsersTable :data="data" @deactiveuser="deactiveuser" @editemail="editemail"
                        @uploadphoto="uploadphoto" @namesurname="changeusernamedialog" @getallusers="getallusers" />
                </div>
            </div>
        </div>

        <Dialog v-model:visible="uploadprofilephoto" modal header="Upload Profile Photo" :style="{ width: '35rem' }">
            <div class="flex flex-column">
                <label>Profile Photo</label>
                <InputText type="file" accept="image/*" @change="handleFileChange" />
            </div>
            <div class="flex flex-column">
                <label>Profile Photo review</label>
                <div v-if="!profilephotoref.photo">
                    <img :src="profilephotoref.image_path && profilephotoref.image_path.trim() !== '' ?
                        `${IMG_BASE_URL}${profilephotoref.image_path.replace(/\\/g, '/')}`
                        : 'https://via.placeholder.com/150'" alt="Profile Photo" style="width: 100%" />
                </div>
                <div v-else-if="profilephotoref.photo">
                    <img class="preview-image" :src="previewphoto.preview" />
                </div>
            </div>
            <Button label="Upload photo" @click="photoupload"></Button>
        </Dialog>
        <Dialog v-model:visible="editnamesurnamedialog" modal hedaer="Edit Name and surname" :style="{width:'35rem'}">
            <div class="flex flex-column">
                <label>Name</label>
                <InputText v-model.trim="editnamesurnamedata.name" />
            </div>
            <div class="flex flex-column">
                <label>Surname</label>
                <InputText v-model.trim="editnamesurnamedata.surname" />
            </div>
            <div class="mt-2">
                <Button icon="pi pi-pencil" @click="changenamesurname" label="Change name surname"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="editemaildialog" modal header="Edit Email" :style="{ width: '35rem' }">
            <div class="flex flex-column">
                <label>Email</label>
                <InputText v-model.trim="editemaildata.oldemail" disabled />
            </div>
            <div class="flex flex-column">
                <label>Confirm new Email</label>
                <InputText v-model.trim="editemaildata.confirmemail" />
            </div>
            <div class="mt-2">
                <Button @click="updateemail" label="Change Email" icon="pi pi-pencil" />
            </div>
        </Dialog>
        <Dialog v-model:visible="createusers" modal header="Create Users" :style="{ width: '35rem' }">
            <div>
                <div class="flex flex-column">
                    <label for="username">Username</label>
                    <InputText v-model.trim="formData.username" />
                </div>
                <div class="flex flex-column">
                    <label for="password">Password</label>
                    <InputText v-model.trim="formData.password" />
                </div>
                <div class="flex flex-column">
                    <label>Email</label>
                    <InputText v-model.trim="formData.email" />
                </div>
                <div class="flex flex-column">
                    <label>Admin?</label>
                    <InputSwitch v-model.trim="formData.is_admin" />
                </div>
                <div class="mt-2">
                    <Button label="Create User" @click="createuser" icon="pi pi-plus" />
                </div>
            </div>
        </Dialog>
        <Toast />
    </div>
</template>


<style lang="scss" scoped>
.preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
}
</style>