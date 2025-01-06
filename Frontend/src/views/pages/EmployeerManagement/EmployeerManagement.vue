<script setup>
import { onMounted, ref } from 'vue';
import EmployeerService from "@/service/EmployeerService"
import { defineAsyncComponent, nextTick } from 'vue';
import Swal from 'sweetalert2';
const EmployeerManagementTable = defineAsyncComponent(() => import('./EmployeerManagementTable.vue'))
const employeerservice = new EmployeerService()
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import DepartmantService from "@/service/DepartmantService.js"
const departmantservice = new DepartmantService();


const confirm = useConfirm();
const toast = useToast();


const data = ref([])
const AddEmployeerDialog = ref(false);
const EditEmployeerDialog = ref(false);
const formData = ref([]);
const editData = ref({});
const departman_type = ref([])

const handleaddDialog = async () => {
    const response = await departmantservice.getdepartmant()
    departman_type.value = response.data
    if (response) {
        AddEmployeerDialog.value = true
        FormData.value = null
    }

}

const deleteemployeer = async (data) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            handledeleteemployeer(data)
        }
    })
}

const handledeleteemployeer = async (data) => {
    try {
        const response = await employeerservice.DeleteEmployeer(data)
        if (response.status == 200) {
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            FetchData();
        }
    } catch (error) {
        console.error(error)
    }
}

const FetchData = async () => {
    try {
        const response = await employeerservice.getEmployeers()
        data.value = response.data.data
    } catch (error) {
        console.error(error)
    }
}

const addemployee = async () => {
    try {
        const response = await employeerservice.Addemployeer({ ...formData.value })
        if (response.status == 200) {
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            AddEmployeerDialog.value = false
            FormData.value = ({})
            FetchData()
        }
    } catch (error) {
        console.error(error)
    }
}

const editemployeer = async (data) => {
    try {
        const response = await employeerservice.get(data);
        const res = await departmantservice.getdepartmant()
        departman_type.value = res.data
        if (response.status === 200) {
            EditEmployeerDialog.value = true;
            editData.value = {
                ...response.data,
                Salary: Number(response.data.Salary) 
            };
            console.log('editData.value:', editData.value);
            FetchData();
        }
    } catch (error) {
        console.error(error);
    }
}

const editemployee = async () => {
    const payload = {
        id: editData.value.id,
        name: editData.value.Name,
        position: editData.value.Position,
        salary: String(parseFloat(editData.value.Salary)),
        departmant_id: editData.value.departmant_id
    };
    try {
        const response = await employeerservice.update(payload);
        if (response.status == 200) {
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon:'success',
                confirmButtonText: 'Ok'
            });
            EditEmployeerDialog.value = false
            editData.value = ({})
            FetchData()
        }
    } catch (error) {
        // console.error('Update error:', error);
    }
}



onMounted(() => {
    FetchData()
});
</script>

<template>
    <div class="grid">
        <Toast />
        <ConfirmDialog />
        <div class="col-12">
            <div class="card">
                <h4>Employeer Management</h4>
                <Toolbar>
                    <template v-slot:start>
                    </template>
                    <template v-slot:end>
                        <Button icon="pi pi-plus" @click="handleaddDialog"></Button>
                    </template>
                </Toolbar>
                <div class="card-body">
                    <EmployeerManagementTable :data="data" @deleteemployeer="deleteemployeer"
                        @editemployeer="editemployeer" @refreshtable="FetchData">
                    </EmployeerManagementTable>
                </div>
            </div>
        </div>
        <Dialog v-model:visible="AddEmployeerDialog" modal header="Add Employeer">
            <div class="col-12 xl:flex">
                <div class=" col-12 xl:col-6 w-full-max">
                    <div class="flex flex-column">
                        <label>Name Surname</label>
                        <InputText placeholder="Name Surname" v-model="formData.name" />
                    </div>
                    <div class="flex flex-column">
                        <label>Department</label>
                        <Dropdown placeholder="Department" v-model="formData.departmant_id" :options="departman_type"
                            optionLabel="Departman" optionValue="id" />
                    </div>
                </div>
                <div class="col-12 xl:col-6">
                    <div class="flex flex-column w-full-max">
                        <label>Position</label>
                        <InputText placeholder="Position" v-model="formData.position" />
                    </div>
                    <div class="flex flex-column">
                        <label>Salary</label>
                        <InputNumber placeholder="Salary" mode="currency" currency="USD" v-model="formData.salary" />
                    </div>
                </div>
            </div>
            <div class="col-12">
                <Button class="pi pi-plus" label="Add Employeer" @click="addemployee"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="EditEmployeerDialog" modal header="Edit Employeer">
            <div class="col-12 xl:flex">
                <div class="col-12 xl:col-6 w-full-max">
                    <div class="flex flex-column">
                        <label>Name Surname</label>
                        <InputText placeholder="Name Surname" v-model="editData.Name" />
                    </div>
                    <div class="flex flex-column">
                        <label>Department</label>
                        <Dropdown placeholder="Department" v-model="editData.departmant_id" :options="departman_type"
                            optionLabel="Departman" optionValue="id" />
                    </div>
                </div>
                <div class="col-12 xl:col-6">
                    <div class="flex flex-column w-full-max">
                        <label>Position</label>
                        <InputText placeholder="Position" v-model="editData.Position" />
                    </div>
                    <div class="flex flex-column">
                        <label>Salary</label>
                        <InputNumber placeholder="Salary" mode="currency" currency="USD" v-model="editData.Salary" />
                    </div>
                </div>
            </div>
            <div class="col-12">
                <Button class="pi pi-plus" label="Edit Employeer" @click="editemployee"></Button>
            </div>
        </Dialog>
    </div>
</template>


<style scoped lang="scss"></style>