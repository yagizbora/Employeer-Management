<script setup lang="js">
import { formatDate } from "@/utils/helper.js";
import Swal from 'sweetalert2';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import CommunactionHistoryService from "@/service/communactionHistoryService";
const CommunactionHistoryTable = defineAsyncComponent(() => import('./CommunactionHistoryTable.vue'));
import CustomerService from "@/service/customerService";
const customerservice = new CustomerService()
const communactionhistoryservice = new CommunactionHistoryService()
import EmployeerService from "@/service/EmployeerService"
const employeerservice = new EmployeerService()
const data = ref()
const FormData = ref({})
const editData = ref({})
const customer = ref()
const employeer = ref()
const editcustomer = ref()
const editemployeer = ref()
const createcommunactionhistory = ref(false)
const editcommunactionhistory = ref(false)

const fetchdata = async () => {
    try {
        const response = await communactionhistoryservice.getcommunactionHistory()
        data.value = response.data.data;
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

const createdatadialog = async () => {
    const customerespone = await customerservice.getallcustomer()
    const employeerresponse = await employeerservice.getEmployeers()

    if (customerespone && employeerresponse) {
        customer.value = customerespone.data.data
        employeer.value = employeerresponse.data.data
        createcommunactionhistory.value = true
    }
}

const createdata = async () => {
    const response = await communactionhistoryservice.createhistory({ ...FormData.value })
    if (response) { 
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Okay'
        })
        fetchdata()
        createcommunactionhistory.value = false
    }

}

const deletedata = async (data) =>
{ 
    Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this communaction history?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deletedatarequest(data)
        }
    })
}

const editdata = async (data) => {
    const response = await communactionhistoryservice.getcommunactionHistorybyid(data);

    if (response) {
        const customerespone = await customerservice.getallcustomer();
        const employeerresponse = await employeerservice.getEmployeers();

        if (customerespone && employeerresponse) {
            editcustomer.value = customerespone.data.data;
            editemployeer.value = employeerresponse.data.data;
        }

        const rawTimestamp = response.data.data.timestamp;
        response.data.data.timestamp = formatDate(rawTimestamp);

        editData.value = response.data.data;
        editcommunactionhistory.value = true;
    }
};

import dayjs from "dayjs";

const editdatarequest = async () => {
    if (editData.value.timestamp) {
        editData.value.timestamp = dayjs(editData.value.timestamp, "DD/MM/YYYY HH:mm").toISOString();
    }

    const response = await communactionhistoryservice.edithistory({ ...editData.value });
    if (response) {
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Okay',
        });
        editcommunactionhistory.value = false; 
        fetchdata(); 
    }
    fetchdata(); 
};


const deletedatarequest = async (data) => { 
    console.log(data)
    const response = await communactionhistoryservice.deletehistory(data)
    if (response) {
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Okay'
        })
        fetchdata()

    }
    fetchdata()
}


onMounted(() => {
    fetchdata()
});
</script>


<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div>
                        <h5 class="header">
                            Communaction History
                        </h5>
                    </div>
                </div>
                <div>
                    <Toolbar>
                        <template #start>
                            <Button icon="pi pi-plus" severity="secondary" rounded outlined aria-label="User"
                                @click="createdatadialog" />
                        </template>
                    </Toolbar>
                </div>
                <div class="table">
                    <CommunactionHistoryTable :data="data" @deletedata="deletedata" @editdata="editdata" />
                </div>
                <div>
                    <Dialog v-model:visible="editcommunactionhistory" modal :style="{ width: '50vw' }">
                        <div class="grid">
                            <div class="col-12">
                                <div>
                                    <h5>Create Communaction History</h5>
                                </div>
                                <div class="flex">
                                    <div class="col-6">
                                        <div class="flex flex-column">
                                            <label>Customer</label>
                                            <Dropdown v-model="editData.customer_id" :options="editcustomer"
                                                optionLabel="customer_name" optionValue="id"></Dropdown>
                                        </div>
                                        <div class="flex flex-column">
                                            <label>Employee</label>
                                            <Dropdown v-model="editData.employeer_id" :options="editemployeer"
                                                optionLabel="Name" optionValue="id"></Dropdown>
                                        </div>
                                        <div class="flex flex-column">
                                            <label>Communaction Type</label>
                                            <InputText v-model="editData.communaction_type"></InputText>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="flex flex-column">
                                            <label>Details</label>
                                            <Textarea v-model="editData.details"></Textarea>
                                        </div>
                                        <div class="flex flex-column">
                                            <label>Communaction Date</label>
                                            <Calendar v-model="editData.timestamp" showTime dateFormat="dd/mm/yy">
                                            </Calendar>
                                        </div>
                                    </div>
                                </div>
                                <Button @click="editdatarequest" label="Edit History" icon="pi pi-pencil"></Button>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog v-model:visible="createcommunactionhistory" modal :style="{ width: '50vw' }">
                        <div class="grid">
                            <div class="col-12">
                                <div>
                                    <h5>Create Communaction History</h5>
                                </div>
                                <div class="flex">
                                    <div class="col-6">
                                        <div class="flex flex-column">
                                            <label>Customer</label>
                                            <Dropdown v-model="FormData.customer_id" :options="customer"
                                                optionLabel="customer_name" optionValue="id"></Dropdown>
                                        </div>
                                        <div class="flex flex-column">
                                            <label>Employee</label>
                                            <Dropdown v-model="FormData.employeer_id" :options="employeer"
                                                optionLabel="Name" optionValue="id"></Dropdown>
                                        </div>
                                        <div class="flex flex-column">
                                            <label>Communaction Type</label>
                                            <InputText v-model="FormData.communaction_type"></InputText>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="flex flex-column">
                                            <label>Details</label>
                                            <Textarea v-model="FormData.details"></Textarea>
                                        </div>
                                        <div class="flex flex-column">
                                            <label>Communaction Date</label>
                                            <Calendar v-model="FormData.timestamp" showTime dateFormat="dd/mm/yy">
                                            </Calendar>
                                        </div>
                                    </div>
                                </div>
                                <Button @click="createdata" label="Create History" icon="pi pi-plus"></Button>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.header {
    font-size: 20px;
    font-weight: 600;
    color: #5513d7;
}
</style>