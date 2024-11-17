<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EmployeerService from '@/service/EmployeerService';
import ComplaintService from '@/service/ComplaintService';
import Swal from 'sweetalert2';


const route = useRoute();

const employeer = ref();
const formData = ref({});
const dataid = ref(route.params.id || null); 
const dataisnull = ref(false)

const employeerservice = new EmployeerService();
const complaintservice = new ComplaintService();

const FetchDataEmployeer = async () => {
    try {
        const response = await employeerservice.getEmployeers();
        employeer.value = response.data.data;
    } catch (error) {
        console.error(error);
    }
};

const getdatabyid = async (id) => {
    try {
        if (id) {
            const response = await complaintservice.getcomplaintsbyid(id);
            formData.value = response;
        }
        else {
            Swal.Fire({
                title: 'Error',
                text: response.data.message,
                icon: 'Error'
            })
        }
    } catch (error) {
        console.error(error);
        dataisnull.value = true
        console.log(dataisnull.value)
    }
};

const handleupdate = async () => {
    try {
        const response = await complaintservice.updatecomplaintsbyid(formData.value)
        console.log(response)
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
        console.log('No ID found in route params.');
    }
});
</script>

<template>
    <div class="grid">
        <div v-if="dataisnull == true">
            <div class="col-12">
                <div class="card">
                    <div class="error-page">
                        <div class="mb-2 button">
                            <a href="/complaint/complaint">
                                <p>Please go back to Complaint List page because something is wrong or data is not true</p>
                            </a>
                        </div>
                        <div>
                            <RouterLink to="/complaint/complaint">
                                <Button icon="pi pi-arrow-left" label="Go back to Complaint List Page"></Button>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12" v-else>
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
                                    <Button icon="pi pi-pencil" :disabled="dataisnull == true" @click="handleupdate"
                                        label="Edit Complaint" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped lang="scss">
.error-page .button{
    border: 1px solid;
    padding: 10px;
    border-radius: 20px;
}

</style>