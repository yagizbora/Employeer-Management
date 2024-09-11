<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EmployeerService from '@/service/EmployeerService';
import ComplaintService from '@/service/ComplaintService';
import Swal from 'sweetalert2';

const route = useRoute();

const employeer = ref();
const formData = ref({});
const dataid = ref(route.params.id || null); // route'dan id alıyoruz, yoksa null yapıyoruz

const employeerservice = new EmployeerService();
const complaintservice = new ComplaintService();

const FetchDataEmployeer = async () => {
    try {
        const response = await employeerservice.getEmployeers();
        employeer.value = response;
    } catch (error) {
        console.error(error);
    }
};

const getdatabyid = async (id) => {
    try {
        if (id) {
            const response = await complaintservice.getcomplaintsbyid(id);
            formData.value = response;
        } else {
            console.warn('ID is required but not provided');
        }
    } catch (error) {
        console.error(error);
    }
};

const handleupdate = async () => {
    try {
        const response = complaintservice.updatecomplaintsbyid({ ...formData.value })
        if (response.status == 200) {
            Swal.Fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
            })
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    FetchDataEmployeer();
    if (dataid.value) {
        getdatabyid(dataid.value);
    } else {
        console.error('No ID found in route params.');
    }
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-title">
                    <h5>Edit Complaint</h5>
                </div>
                <div class="card-body">
                    <div>
                        <div class="col-12">
                            <div class="flex">
                                <div class="col-6 flex flex-column">
                                    <label>Employeer</label>
                                    <Dropdown v-model="formData.employeer_id" :options="employeer" optionLabel="Name"
                                        optionValue="id" />
                                </div>
                                <div class="col-6 flex flex-column">
                                    <label>Complaint Description</label>
                                    <InputText type="text" v-model="formData.complaint_title" />
                                </div>
                            </div>
                            <div class="col-12 flex flex-column">
                                <label>Complaint Description</label>
                                <Textarea v-model="formData.complaint_description" rows="5" cols="30" />
                            </div>
                            <div class="flex flex-column">
                                <div class="col">
                                    <Button icon="pi pi-pencil" @click="handleupdate" label="Edit Complaint" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>