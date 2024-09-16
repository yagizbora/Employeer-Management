<script setup>
import Swal from 'sweetalert2'
import { onMounted,ref } from 'vue';
import EmployeerService from "@/service/EmployeerService"
import { formatCurrency } from "@/utils/helper"
const employeerservice = new EmployeerService()
import ReportService from "@/service/ReportService";
const reportservice = new ReportService();
import Chart from 'primevue/chart';
import SalaryChart from './SalaryChart.vue';



const data = ref([])
const props = defineProps({
    data: Array
})

const FetchData = async () => {
    try {
        const response = await employeerservice.getEmployeers()
        data.value = response.data.data 

    } catch (error) {
        console.error(error)
    }
}

const salarystatics = async () => {
    try {
        const response = await reportservice.getSalaryStatistics()
        // console.log(response)
    } catch (error) {
        console.error(error)
    }
};

onMounted(FetchData);
onMounted(salarystatics);
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4>Dashboard</h4>
                <Toolbar>
                    <template v-slot:start>
                    </template>
                    <template v-slot:end>
                        <RouterLink to="Employeer-Management">
                            <Button label="Employeer Management"></Button>
                        </RouterLink>
                    </template>
                </Toolbar>
                <div class="chart">
                    <SalaryChart />
                </div>
                <div class="card-body">
                    <DataTable :value=data paginator :rows='5' :rowsPerPageOptions="[5, 10, 20, 50]">
                        <Column field="Name" header="Name"></Column>
                        <Column field="Department" header="Department"></Column>
                        <Column field="Position" header="Position"></Column>
                        <Column field="Salary" header="Salary">
                            <template #body=" { data } ">
                                {{ formatCurrency(data.Salary) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss">

.chart {
    @media (max-width:420px) {
        display: none;
    }
}
</style>