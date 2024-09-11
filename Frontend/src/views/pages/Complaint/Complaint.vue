<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import ComplaintService from "@/service/ComplaintService"
import Swal from 'sweetalert2';
const ComplaintTable = defineAsyncComponent(() => import('./ComplaintTable.vue'));
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";


const confirm = useConfirm();
const toast = useToast();
const complaintservice = new ComplaintService()

const data = ref([]);

const fetchdata = async () => {
    try {
        const response = await complaintservice.getcomplaint()
        data.value = response
    } catch (error) {
        console.error(error);
    }
}

const handledelete = async (data) => {
    try {
        const response = await complaintservice.deletecomplaint(data)
        if (response.status == 200) {
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
            })
        }
        fetchdata()
    } catch (error) {
        console.error(error);
    }
}

const deletecomplaint = async (data) => {
    confirm.require({
        message: 'Are you sure you want to delete this complaint?',
        header: 'Delete Complaint',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        accept: () => {
            handledelete(data)
        },
    })
}

onMounted(() => {
    fetchdata()
});
</script>

<template>
    <div class="grid">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5>Complaints</h5>
                    <div class="card-body">
                        <ComplaintTable :data="data" @deletecomplaint="deletecomplaint"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>