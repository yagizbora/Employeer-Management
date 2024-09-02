<script setup>
import { defineAsyncComponent,ref } from 'vue';
import ReportService from "@/service/ReportService";
import { onMounted } from 'vue';
const SalaryReportTable = defineAsyncComponent(() => import('./SalaryReportTable.vue'));
const reportservice = new ReportService();
const data = ref([])

const FetchData = async () => {
    try {
        const response = await reportservice.SalaryAverageAndAllinDepartmans();
        data.value = response.data
        console.log(response);
    } catch (error) {
        console.error(error)
    }
}

onMounted(FetchData);
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h4>Salary Report</h4>
                </div>
                <div class="card-body">
                    <SalaryReportTable :data="data" />
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss"></style>