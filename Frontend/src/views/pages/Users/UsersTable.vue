<script setup lang="js">
import { ref } from 'vue';
import UserService from '@/service/UsersService.js';
const usersservice = new UserService()
const admin = ref()
const props = defineProps({
    data: Array
});


const emit = defineEmits(['deactiveuser'])

const deactiveuser = (data) => {
    emit('deactiveuser', data)
}

const changeadminstatusbyid = async (user) => {
    const response = await usersservice.adminstatus({ id: user.id, is_admin: user.is_admin })
    if (response.status === 200) {
        console.log('Admin status updated successfully.');
    } else {
        console.error('Failed to update admin status.');
    }
}

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
                <InputSwitch v-model="data.is_admin" :disabled="checkadmin == false"
                    @change="changeadminstatusbyid(data)">
                </InputSwitch>
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