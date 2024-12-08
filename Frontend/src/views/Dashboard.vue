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

onMounted(() => {
    FetchData()
    salarystatics()  
})

// onMounted(FetchData);
// onMounted(salarystatics);
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4>Dashboard</h4>
                <Toolbar>
                    <template v-slot:start>
                        <RouterLink to="Employeer-Management">
                            <Button style="margin-right: 5px;" label="Employeer Management"></Button>
                        </RouterLink>
                        <!-- <RouterLink to="report/average-and-salary-report">
                            <Button style="margin-right: 5px;" label="Manage Salary"></Button>
                        </RouterLink> -->
                        <RouterLink to="users/users">
                            <Button style="margin-right: 5px;" label="Manage users"></Button>
                        </RouterLink>
                    </template>
                    <template v-slot:end>
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
                        <Column field="is_work" header="Is_work">
                            <template #body=" { data } ">
                                <Checkbox v-model="data.is_work" binary disabled class="checkbox" />
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
.checkbox {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}
</style>