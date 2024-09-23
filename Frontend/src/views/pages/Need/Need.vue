<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import NeedService from "@/service/NeedService";
import OrderService from "@/service/Orderservice";
import PriorityService from "@/service/PriorityService";
import DepartmantService from "@/service/DepartmantService.js";

import { RouterLink } from 'vue-router';
import Swal from 'sweetalert2';
const needservice = new NeedService()
const orderservice = new OrderService();
const departmantservice = new DepartmantService();
const priorityservice = new PriorityService();
const NeedTable = defineAsyncComponent(() => import('./NeedTable.vue'));

const data = ref([])
const editdata = ref([])
const editdatadialog = ref(false)


const departmans = ref([]);
const employeer = ref([]);
const priorities = ref([])

const FetchData = async () => {
    try {
        const response = await needservice.getNeeds()
        data.value = response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const updateneedbyid = async () => {
    const response = await needservice.updateneedbyid({ ...editdata.value })
    if (response.status === 201) { 
        Swal.fire({
            title: 'Request updated!',
            text: response.data.message,
            icon:'success',
            confirmButtonText: 'Okay'
        })
        FetchData();
        editdatadialog.value = false
    }
}

const getdatabyid = async (data) => {
    const response = await needservice.getNeedsbyid({ ...data });
    // FETCH PRITORITIES
    const res = await priorityservice.getpriorities();
    priorities.value = res.data.data;


    // FETCH DEPARTMANTS
    const ress = await departmantservice.getdepartmant();
    departmans.value = ress.data;
    console.log(response)
    if (response) {
        editdata.value = response.data[0]
        editdatadialog.value = true
    }
    // IMPORTANT IF YOU WILL DELETE THIS LINE YOU CANNOT SEE EMPLOYEER FROM API
    if (departmans.value && departmans.value.length > 0) {
        const departmanId = data.departman_id || departmans.value[0].id;
        getemployeerwithdepartman(departmanId);
        editdata.value.departman_id = departmanId;

    }
}

const onDepartmanChange = (event) => {
    const departmanId = event.value;
    editdata.value.departman_id = departmanId;
    getemployeerwithdepartman(departmanId);
};
const getemployeerwithdepartman = async (data) => {
    if (data) {
        const response = await orderservice.getEmployeersByDepartmantId(data);
        employeer.value = response.data;
    } else {
        employeer.value = [];
    }
};
const deletedata = async (data) => {
    const response = await needservice.deleteneedbyid(data)
    if (response.status == 200) {
        Swal.fire({
            title: 'Success!',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'OK'
        })
        FetchData()
    }
}


onMounted(() => {
    FetchData()
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Request List</h5>
                </div>
                <Toolbar>
                    <template #start>

                    </template>
                    <template #end>
                        <RouterLink to="/need/create-need">
                            <Button icon="pi pi-plus" severity="secondary" rounded></Button>
                        </RouterLink>
                    </template>
                </Toolbar>
                <div class="card-body">
                    <NeedTable :data="data" @editdata="getdatabyid" @deletedata="deletedata" />
                </div>
            </div>
        </div>
        <Dialog modal v-model:visible="editdatadialog" :style="{ width: '45rem' }">
            <div class="xl:flex">
                <div class="col-12 xl:col-6">
                    <div class="flex flex-column">
                        <label> Requester Departmant</label>
                        <Dropdown :options="departmans" v-model="editdata.departman_id" optionLabel="Departman"
                            optionValue="id" @change="onDepartmanChange" />
                    </div>
                    <div class="flex flex-column">
                        <label> Requester Employeer</label>
                        <Dropdown :options="employeer" v-model="editdata.employeer_id" optionLabel="employeer_name"
                            optionValue="employeer_id" />
                    </div>
                    <div class="flex flex-column">
                        <label> Request Priority:</label>
                        <Dropdown :options="priorities" v-model="editdata.priority_id" optionLabel="priority"
                             optionValue="id" />
                    </div>
                </div>
                <div class="col-12 xl:col-6">
                    <div class="flex flex-column">
                        <label>Request Title</label>
                        <InputText v-model="editdata.need_title"></InputText>
                    </div>
                    <div class="flex flex-column">
                        <label>Request Subject</label>
                        <InputText v-model="editdata.need_subject"></InputText>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="flex flex-column">
                    <label>Request Description</label>
                    <Textarea v-model="editdata.need_description"></Textarea>
                </div>
            </div>
            <Button @click="updateneedbyid" label="Update Request"></Button>
        </Dialog>
    </div>

</template>

<style lang="scss"></style>