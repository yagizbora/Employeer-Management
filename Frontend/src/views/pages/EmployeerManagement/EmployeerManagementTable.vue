<script setup>
import { formatCurrency } from "@/utils/helper"
import Swal from 'sweetalert2';
import EmployeerService from "@/service/EmployeerService"
const employeerservice = new EmployeerService()

const changeworkstatus = async (data) => {
    const response = await employeerservice.workstatus({
        id: data.id,
        status: data.is_work
    })
    if (response) {
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon:'success',
            confirmButtonText: 'Okay'
        })
        emit('refreshtable');
    }
}

const emit = defineEmits(["deleteemployeer", "editemployeer","refreshtable"]);

const deleteemployeer = (data) => {
    emit("deleteemployeer", data);
}

const editemployeer = (data) => {
    emit("editemployeer", data)
}


const props = defineProps({
    data: Array,

});

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
    <DataTable :value=data paginator :rows='5' :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="Name" header="Name"></Column>
        <Column field="Department" header="Department"></Column>
        <Column field="Position" header="Position"></Column>
        <Column field="Salary" header="Salary">
            <template #body="{ data }">
                {{ formatCurrency(data.Salary) }}
            </template>
        </Column>
        <Column header="Is_worked">
            <template #body="{ data }">
                <Checkbox v-model="data.is_work" binary @change="changeworkstatus(data)"/>
            </template>
        </Column>
        <Column header="Operations">
            <template #body="{ data }">
                <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel"
                    @click="deleteemployeer(data)" />
                <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit"
                    @click="editemployeer(data)" />
            </template>
        </Column>
    </DataTable>

</template>

<style scoped lang="scss"></style>