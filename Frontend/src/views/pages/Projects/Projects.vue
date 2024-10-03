<script setup>
import ProjectService from "@/service/ProjectService";
import { defineAsyncComponent, onMounted, ref } from "vue";
import CustomerService from "@/service/customerService";
const customerservice = new CustomerService()

const ProjectsTable = defineAsyncComponent(() => import('./ProjectsTable.vue'))
const projectservice = new ProjectService();

const data = ref({})
const customers = ref({})
const createproject = ref(false)
const FormData = ({})

const FetchData = async () => {
    const response = await projectservice.getProjects()
    data.value = response.data.data;
    console.log(response.data.data);
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

const createdata = async () => {
    try {
        const response = await projectservice.createProject({ ...FormData.value })
        if (response.status == 201) {
            console.log(response.data);
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
                    <Button @click="createdatadialogopen" label="Create Project"></button>
                </div>
                <div class="card-body">
                    <ProjectsTable :data="data" />
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
                            <Button icon="pi pi-plus" label="Create Projects"></Button>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>