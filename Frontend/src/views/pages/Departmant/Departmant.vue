<script setup>
import DepartmantService from "@/service/DepartmantService.js"
import { onMounted } from "vue";
import Swal from 'sweetalert2';
const departmantservice = new DepartmantService();
import { ref, defineAsyncComponent } from 'vue';
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver';
const DepartmantTable = defineAsyncComponent(() => import('./DepartmantTable.vue'));
const data = ref([])
const FormData = ref([])
const editData = ref({});
const EditDepartmantDialog = ref(false)
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";


const confirm = useConfirm();
const toast = useToast();


const fetchdata = async () => {
    const response = await departmantservice.getdepartmant()
    data.value = response.data
    console.log(data.value)
}

const Adddata = async (data) => {
    const response = await departmantservice.createdepartmant({ ...FormData.value })
    if (response.status = 200) {
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok',
        })
        fetchdata()
    }
}

const handledepartmantdelete = async (data) => {
    const response = await departmantservice.deletedepartmant(data)
    if (response.status == 200) {
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok',
        })
        fetchdata()
    }
}

const deletedepartmant = async (data) => {
    confirm.require({
        message: 'Are you sure you want to delete this Departmant?',
        header: 'Delete Departmant',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Delete',
        acceptClass: 'p-button-danger',
        rejectLabel: 'Cancel',
        rejectClass: 'p-button-secondary p-button-outlined',
        accept: () => {
            handledepartmantdelete(data)
        },
        reject: () => { }
    })
}

const downloadExcel = async () => {

    if (!data || !Array.isArray(data.value) || data.value.length === 0) {
        Swal.fire({
            title: 'Error',
            text: 'No data to download',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        console.log('Data:', data); 
        console.log('Data.value:', data.value); 
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Departmanlar');

    worksheet.columns = [
        { header: 'Departman', key: 'Departman', width: 25 }
    ];

    data.value.forEach(item => {
        worksheet.addRow({
            Departman: item.Departman
        });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'departmanlar.xlsx');
};

const editdepartmant = async (data) => {
    try {
        const response = await departmantservice.getdepartmantbyid(data)
        editData.value = {
            id: response.id,
            departman: response.Departman
        }
        EditDepartmantDialog.value = true
    } catch (error) {
        console.log(error)
    }
}

const editdepartmanthandle = async (data) => {
    try {
        const response = await departmantservice.editdepartmant(editData.value, editData.value.id)
        if (response.status == 200) {
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Ok',
            })
            EditDepartmantDialog.value = false
            fetchdata()
        }
        if (response.status == 400) {
            Swal.fire({
                title: 'Error',
                text: response.data.message,
                icon: 'error',
                confirmButtonText: 'Ok',
            })
            EditDepartmantDialog.value = false
        }
    } catch (error) {
        console.log(error)
    }
}
onMounted(fetchdata);
</script>

<template>
    <div class="grid">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="col-12">
            <div class="card">
                <h5>Departmant</h5>
                <div>
                    <div>
                        <div class="flex flex-column">
                            <label>Departmant</label>
                            <InputText placeholder="Departmant" v-model="FormData.departman"></InputText>
                        </div>
                        <div class="col-12 xl:flex gap-1 mt-2">
                            <div class="flex-column">
                                <Button severity="info" label="Excel" @click="downloadExcel"></Button>
                            </div>
                            <div class="flex flex-column">
                                <Button label="Add Departmant" icon="pi pi-plus" @click="Adddata"></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <DepartmantTable :data=data @deletedepartmant="deletedepartmant" @editdepartmant="editdepartmant">
                    </DepartmantTable>
                </div>
            </div>
        </div>
        <Dialog v-model:visible="EditDepartmantDialog" modal header="Edit Departmant" style="width: 25rem;">
            <div class="flex">
                <div>
                    <div class="flex flex-column">
                        <label>Deparmant</label>
                        <InputText placeholder="Deparmant" v-model="editData.departman" />
                    </div>
                </div>
            </div>
            <div class="col-12">
                <Button class="pi pi-plus" label="Edit Departmant" @click="editdepartmanthandle"></Button>
            </div>
        </Dialog>
    </div>
</template>


<style scoped lang="scss">

</style>