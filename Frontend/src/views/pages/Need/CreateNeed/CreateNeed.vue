<script setup>
import { ref,onMounted } from 'vue'
import DepartmantService from "@/service/DepartmantService.js";
import OrderService from "@/service/Orderservice";
import Swal from 'sweetalert2';
import NeedService from "@/service/NeedService";
import PriorityService from "@/service/PriorityService";


const formData = ref({});


const needservice = new NeedService()
const orderservice = new OrderService();
const departmantservice = new DepartmantService(); 
const priorityservice = new PriorityService(); 


const departmans = ref([]);
const employeer = ref([]);
const priorities = ref([])

// Departmanları al
const fetchdepartmans = async () => {
    const response = await departmantservice.getdepartmant();
    departmans.value = response.data;
};

const fetchpriorities = async () => {
    const response = await priorityservice.getpriorities();
    priorities.value = response.data.data;
    console.log(response.data.data)
}

const getemployeerwithdepartman = async (data) => {
    if (data) {
        const response = await orderservice.getEmployeersByDepartmantId(data);
        employeer.value = response.data;
    } else {
        employeer.value = [];
    }
};

// Departman seçildiğinde employeer'ları güncelle
const onDepartmanChange = (event) => {
    const departmanId = event.value;
    formData.value.departman_id = departmanId;
    getemployeerwithdepartman(departmanId);
};

const createdata = async (data) => {
    const response = await needservice.createNeed({ ...formData.value })
    if (response.status === 201) { 
        Swal.fire({
            title: 'Request Created!',
            text: response.data.message,
            icon:'success',
            confirmButtonText: 'Close'
        })
    }
}


onMounted(() => {
    fetchdepartmans();
    fetchpriorities();
});
</script>


<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5>
                        Create Request
                    </h5>
                </div>
                <div class="card-body">
                    <div class="col-12 flex">
                        <div class="col-12 xl:col-6">
                            <div class="flex flex-column">
                                <label for="priority">Requester Departman:</label>
                                <Dropdown :options="departmans" v-model="formData.departman_id" optionLabel="Departman"
                                    optionValue="id" @change="onDepartmanChange" />
                            </div>
                            <div class="flex flex-column">
                                <label for="requester">Requester:</label>
                                <Dropdown :options="employeer" v-model="formData.employeer_id"
                                    optionLabel="employeer_name" :disabled="!formData.departman_id"
                                    optionValue="employeer_id" />
                            </div>
                            <div class="flex flex-column">
                                <label for="priority">Request Priority:</label>
                                <Dropdown :options="priorities" v-model="formData.priority_id" optionLabel="priority"
                                   :disabled="!formData.departman_id" optionValue="id" />
                            </div>
                        </div>
                        <div class="col-12 xl:col-6">
                            <div class="flex flex-column">
                                <label> Request Title </label>
                                <InputText v-model="formData.need_title" :disabled="!formData.departman_id"></InputText>
                            </div>
                            <div class="flex flex-column">
                                <label> Request Subject </label>
                                <InputText v-model=formData.need_subject :disabled="!formData.departman_id"></InputText>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 flex">
                        <div class="col-12">
                            <div class="flex flex-column">
                                <label> Request Description </label>
                                <Textarea v-model="formData.need_description"
                                    :disabled="!formData.departman_id"></Textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div>
                            <Button label="Create Request" icon="pi pi-plus" @click="createdata"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>