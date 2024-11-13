<script setup lang="js">
import Swal from 'sweetalert2';
import { ref } from 'vue';
import { IMG_BASE_URL } from "@/utils/helper.js";
import UserService from '@/service/UsersService.js';
const usersservice = new UserService()
const admin = ref()
const props = defineProps({
    data: Array
});


const emit = defineEmits(['deactiveuser, editemail, uploadphoto'])

const deactiveuser = (data) => {
    emit('deactiveuser', data)
}
const uploadphoto = (data) => {
    emit('uploadphoto', data)
}

const editemail = (data) => { 
    console.log('Selected user:', data); 
    emit('editemail', data)
}

const changeadminstatusbyid = async (user) => {
    try {
        const user_id = localStorage.getItem('user_id');
        const response = await usersservice.adminstatus({
            id: user.id,
            is_admin: user.is_admin,
            user_id: user_id
        });
        if (response.status == 200) {
            Swal.fire({
                title: 'Admin Status Changed!',
                text: response.data.message || 'Status changed successfully',
                icon:'success',
            })
            emit('getallusers');
        }
    } catch (error) {
        emit('getallusers');
    }
};
const checkadmin = () => {
    const getadminstatus = localStorage.getItem('is_admin')
    if (getadminstatus) {
        admin.value = getadminstatus === 'true' ? true : false
        return admin.value
    }
    else {

    }
};
</script>

<template>
    <DataTable :value="data">
        <Column field="username" header="Username"></Column>
        <Column field="is_admin" header="Admin Status">
            <template #body="{ data }">
                <InputSwitch :binary="true" v-model="data.is_admin" :disabled="checkadmin == false || data.is_logged"
                    @change="changeadminstatusbyid(data)" />
            </template>
        </Column>
        <Column field="is_logged" header="Log status">
            <template #body="{ data }">
                <span :class="data.is_logged? 'text-success' : 'text-danger'">
                    <Checkbox v-model="data.is_logged" binary disabled />
                </span>
            </template>
        </Column>
        <Column field="email" header="E-mail">
            <template #body=" { data } ">
                <div>
                    {{ data.email || "No Email" }}
                </div>
            </template>
        </Column>
        <Column field="Name-Surname" header="Name and surname">
        </Column>
        <Column header="Profile Photo">
            <template #body="{ data }">
                <Image width="150"
                    :src="data.image_path && data.image_path.trim() !== '' ? `${IMG_BASE_URL}${data.image_path.replace(/\\/g, '/')}` : 'https://via.placeholder.com/150'"
                    alt="Profile Photo" preview />
            </template>
        </Column>
        <Column header="Operations">
            <template #body="{ data }">
                <Button text rounded @click="() => deactiveuser(data)" icon="pi pi-trash" severity="danger"
                    :disabled="data.is_logged"></Button>
                <Button text rounded icon="pi pi-envelope" severity="help" @click="() => editemail(data)"
                    :disabled="checkadmin == false"></Button>
                <Button text rounded icon="pi pi-image" severity="help" @click="() => uploadphoto(data)"></Button>
            </template>
        </Column>
    </DataTable>
</template>



<style lang=" scss" scoped></style>