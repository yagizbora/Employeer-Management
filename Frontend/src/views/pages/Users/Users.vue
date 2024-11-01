<script setup lang="js">
import UserService from '@/service/UsersService.js';
import Swal from 'sweetalert2';
import { defineAsyncComponent, onMounted, ref } from 'vue';



const data = ref([]);
const createusers = ref(false)
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
        const response = await usersservice.createusers({ ...formData.value })
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
                    <UsersTable :data="data" @deactiveuser="deactiveuser" @getallusers="getallusers" />
                </div>
            </div>
        </div>
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


<style lang="scss" scoped></style>