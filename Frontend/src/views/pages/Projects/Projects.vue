<script setup>
import ProjectService from "@/service/ProjectService";
import { defineAsyncComponent, onMounted,ref } from "vue";

const ProjectsTable = defineAsyncComponent(() => import('./ProjectsTable.vue'))
const projectservice = new ProjectService();

const data = ref({})


const FetchData = async () => {
    const response = await projectservice.getProjects()
    data.value = response.data.data;
    console.log(response.data.data);
};

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
            <div class="card-body">
                <ProjectsTable :data="data" />
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>


</style>