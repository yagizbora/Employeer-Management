<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import EmployeerService from "@/service/EmployeerService"
import { onMounted } from 'vue';
import ComplaintService from "@/service/ComplaintService"
const complaintservice = new ComplaintService()
const employeerservice = new EmployeerService()
const formData = ref({});

const employeer = ref()

const FetchData = async () => {
    try {
        const response = await employeerservice.getEmployeers()
        employeer.value = response
    } catch (error) {
        console.error(error)
    }
};

const adddata = async () => {
    try {
        const response = await complaintservice.createcomplaint(formData.value)
        if (response.status == 201) {
            Swal.Fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
            })
        }
    } catch (error) {
        console.error(error)
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
                    <h5>Create Complaint</h5>
                </div>
                <div class="card-body">
                    <div class="flex">
                        <div class="col-6">
                            <div class="flex flex-column">
                                <label>Employeer</label>
                                <Dropdown class="w-full-max" v-model="formData.employeer_id"
                                    :options="employeer" optionValue="id" optionLabel="Name" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="flex flex-column">
                                <label>Complaint Title</label>
                                <InputText v-model="formData.complaint_title" />
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-12">
                            <div class="flex flex-column">
                                <label>Complaint Description</label>
                                <Textarea v-model="formData.complaint_description" />
                            </div>
                        </div>
                    </div>
                    <Button label="Create Complaint" icon="pi pi-plus" @click="adddata"></Button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>