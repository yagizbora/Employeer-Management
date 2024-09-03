<script setup>
import { onMounted, ref } from 'vue';
import ReportService from "@/service/ReportService";
const reportservice = new ReportService();
import Chart from 'primevue/chart';

const data = ref({});
const chartOptions = ref({
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function (tooltipItem) {
                    return tooltipItem.label + ': ' + tooltipItem.raw.toLocaleString() + ' USD';
                }
            }
        }
    }
});

const salarystatics = async () => {
    try {
        const response = await reportservice.getSalaryStatistics();
        setChartData(response);
    } catch (error) {
        console.error(error);
    }
}

const setChartData = (stats) => {
    if (!stats || !Array.isArray(stats)) {
        console.error('Invalid data format:', stats);
        return;
    }

    const labels = stats.map(stat => stat.Departman);
    const averageSalaries = stats.map(stat => Number(stat.AverageSalary));
    const totalSalaries = stats.map(stat => Number(stat.TotalSalary));

    data.value = {
        labels: labels,
        datasets: [
            {
                label: 'Average Salary',
                data: averageSalaries,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'Total Salary',
                data: totalSalaries,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }
        ]
    };
}

onMounted(() => {
    salarystatics();
});
</script>

<template>
    <div class="xl:col-12 ">
        <div class="card">
            <Chart type="bar" class="chart" :data="data" :options="chartOptions" />
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
