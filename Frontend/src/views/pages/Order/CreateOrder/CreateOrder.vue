<script setup>
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown'; // Dropdown bileşenini ekleyin
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea'; // Textarea bileşenini ekleyin
import DepartmantService from "@/service/DepartmantService.js";
import OrderService from "@/service/Orderservice";
import { ref,onMounted } from 'vue';
import Swal from 'sweetalert2';

const orderservice = new OrderService();
const departmantservice = new DepartmantService();

const FormData = ref({
    departman_id: null,
    employeer_id: null,
    start_date: '',
    order_name: '',
    end_date: '',
    is_complated: false,
    order_description: ''
});

const departmans = ref([]);
const employeer = ref([]);

// Departmanları al
const fetchdepartmans = async () => {
    const response = await departmantservice.getdepartmant();
    departmans.value = response.data;
};

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
    FormData.value.departman_id = departmanId;
    getemployeerwithdepartman(departmanId);
};

const addorder = async () => {
    const response = await orderservice.createorder(FormData.value);
    if (response.status == 201) {
        Swal.fire({
            title: 'Başarılı',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }
}

// OnMounted, departmanları çek
onMounted(() => {
    fetchdepartmans();
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Create Order</h5>
                    <div class="xl:flex">
                        <div class="col-12 xl:col-6">
                            <div class="flex flex-column">
                                <label>Departman Name:</label>
                                <Dropdown v-model="FormData.departman_id" :options="departmans" optionLabel="Departman"
                                    optionValue="id" placeholder="Select Departman" @change="onDepartmanChange" />
                            </div>
                            <div class="flex flex-column">
                                <label>Start Date</label>
                                <InputText type="date" v-model="FormData.start_date" />
                            </div>
                            <div class="flex flex-column">
                                <label>Order Title</label>
                                <InputText v-model="FormData.order_name" />
                            </div>
                        </div>
                        <div class="col-12 xl:col-6">
                            <div class="flex flex-column">
                                <label>Employeer Name</label>
                                <Dropdown v-model="FormData.employeer_id" :options="employeer"
                                    optionLabel="employeer_name" optionValue="employeer_id" />
                            </div>
                            <div class="flex flex-column">
                                <label>End Date</label>
                                <InputText type="date" v-model="FormData.end_date" />
                            </div>
                            <div class="flex flex-column">
                                <label>Is Complated?</label>
                                <InputSwitch v-model="FormData.is_complated" />
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="flex flex-column">
                            <label>Order Description</label>
                            <Textarea v-model="FormData.order_description" />
                        </div>
                    </div>
                    <Button label="Create Order" icon="pi pi-plus" @click="addorder"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
