<script setup lang="js">
import Swal from 'sweetalert2';
import { ref } from 'vue';
import UserService from '@/service/UsersService.js';
const usersservice = new UserService()
const admin = ref()
const props = defineProps({
    data: Array
});


const emit = defineEmits(['deactiveuser, editemail'])

const deactiveuser = (data) => {
    emit('deactiveuser', data)
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
        <Column header="Operations">
            <template #body="{ data }">
                <Button text rounded @click="() => deactiveuser(data)" icon="pi pi-trash" severity="danger"
                    :disabled="data.is_logged"></Button>
                <Button text rounded icon="pi pi-envelope" severity="help" @click="() => editemail(data)"
                    :disabled="checkadmin == false"></Button>
            </template>
        </Column>
    </DataTable>
</template>



<style lang=" scss" scoped></style>