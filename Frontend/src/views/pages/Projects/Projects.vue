<script setup>
import ProjectService from "@/service/ProjectService";
import { defineAsyncComponent, onMounted, ref } from "vue";
import CustomerService from "@/service/customerService";
import Swal from "sweetalert2";
const customerservice = new CustomerService()

const ProjectsTable = defineAsyncComponent(() => import('./ProjectsTable.vue'))
const projectservice = new ProjectService();

const data = ref([])
const customers = ref([])
const editcustomers = ref([])
const createproject = ref(false)
const FormData = ref({})
const editData = ref({})
const editdatadialog = ref(false)

const FetchData = async () => {
    const response = await projectservice.getProjects()
    data.value = response.data.data;
    // console.log(response.data.data);
};

const createdatadialogopen = async () => {
    try {
        const response = await customerservice.getallcustomer()
        customers.value = response.data.data;
        createproject.value = true;

    } catch (err) {
        console.error(err)
    }
}

const deletedataconfirm = async (data) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            deletedata(data);
    
        }
    });
}

const deletedata = async (data) => {
    const response = await projectservice.deleteproject(data)
    if (response.status === 200) { 
        Swal.fire({
            title: 'Project Deleted Successfully',
            text: response.data.message || "Operation succcessfully",
            icon:'success',
            confirmButtonText: 'Okay'
        });
        FetchData();
    }
}


const editdata = async (data) => {
    try {
        const res = await projectservice.getProjectsbyid(data);
        if (res && res.data.length > 0) {
            editData.value = res.data[0];

            const response = await customerservice.getallcustomer();

            if (response && response.data.data) {
                editcustomers.value = response.data.data; 

                editData.value.customer_id = editData.value.customer_name_id;
            }
            editdatadialog.value = true;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


const handleeditdata = async () => {
    try {
        const response = await projectservice.updateproject({ ...editData.value });
        if (response.status === 200) {
            Swal.fire({
                title: 'Project Updated Successfully',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Okay'
            });
            editdatadialog.value = false;
            FetchData();
        }
    } catch (error) {
        console.error(error);
    }
};

const createdata = async () => {
    try {
        const response = await projectservice.createProject({ ...FormData.value })
        if (response.status == 201) {
            Swal.fire({
                title: 'Project Created Successfully',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Okay'
            })
            createproject.value = false;
            FetchData();
        }
    } catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    FetchData();
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5>Projects</h5>
                </div>
                <div class="card-header">
                    <Button @click="createdatadialogopen" icon="pi pi-plus" label="Create Project"></button>
                </div>
                <div class="card-body">
                    <ProjectsTable :data="data" @editdata="editdata" @deletedata="deletedataconfirm"/>
                </div>
                <Dialog v-model:visible="createproject" modal :style="{ width: '45rem' }">
                    <div class="col-12">
                        <div>
                            <div class="flex flex-column">
                                <label>Customer Name</label>
                                <Dropdown v-model="FormData.customer_id" :options="customers"
                                    optionLabel="customer_name" optionValue="id" />
                            </div>
                            <div class="flex flex-column">
                                <label>Project Name</label>
                                <InputText v-model="FormData.project_name" />
                            </div>
                            <div class="flex flex-column">
                                <label>Project web url</label>
                                <InputText v-model="FormData.project_web_url" />
                            </div>
                        </div>
                        <div class="mt-4">
                            <Button icon="pi pi-plus" @click="createdata" label="Create Projects"></Button>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
        <Dialog v-model:visible="editdatadialog" modal :style="{ width: '45rem' }" header="Edit Project">
            <div class="col-12">
                <div @keyup.enter="handleeditdata">
                    <div class="flex flex-column">
                        <label>Customer Name</label>
                        <Dropdown v-model="editData.customer_name_id" :options="editcustomers"
                            optionLabel="customer_name" optionValue="id" />
                    </div>
                    <div class="flex flex-column">
                        <label>Project Name</label>
                        <InputText v-model="editData.project_name" />
                    </div>
                    <div class="flex flex-column">
                        <label>Project web url</label>
                        <InputText v-model="editData.project_web_url" />
                    </div>
                </div>
                <div class="mt-4">
                    <Button icon="pi pi-pencil" @click="handleeditdata" label="Edit Projects"></Button>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped></style>