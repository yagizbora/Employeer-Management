<script setup lang="js">
import Swal from 'sweetalert2';
import { ref } from 'vue';
import UserService from '@/service/UsersService.js';
const usersservice = new UserService()
const admin = ref()
const props = defineProps({
    data: Array
});


const emit = defineEmits(['deactiveuser, getallusers'])

const deactiveuser = (data) => {
    emit('deactiveuser', data)
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
                <InputSwitch :binary="true" v-model="data.is_admin" :disabled="checkadmin == false"
                    @change="changeadminstatusbyid(data)" />
            </template>
        </Column>
        <Column header="Operations">
            <template #body="{ data }">
                <Button text rounded @click="() => deactiveuser(data)" icon="pi pi-trash" severity="danger"></Button>
            </template>
        </Column>
    </DataTable>
</template>



<style lang="scss" scoped></style>