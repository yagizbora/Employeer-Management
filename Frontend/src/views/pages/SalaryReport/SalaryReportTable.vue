<script setup>
import { defineAsyncComponent, ref } from 'vue';
import { formatCurrency } from "@/utils/helper"


const props = defineProps({
    data: Array
})
const expandedRows = ref([]);
const expandedRowsActivities = ref([]);

const onRowExpand = (event) => {
    // toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
};
const onRowCollapse = (event) => {
    // toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
};
</script>



<template>
    <DataTable :value=data v-model:expandedRows="expandedRows" @row-expand="onRowExpand" @row-collapse="onRowCollapse">
        <Column expander style="width: 5rem" />
        <Column field="Departman" header="Departman"></Column>
        <Column field="AverageSalary" header="Average Salary">
            <template #body="{ data }">
                <div style="    background: #efefff;
    width: 100%;
    text-align: center;
    padding: 12px;
    border-radius: 6px;
    font-weight: 400;">{{ formatCurrency(data.AverageSalary) }}</div>
            </template>
        </Column>
        <Column field="TotalSalary" header="Total Salary">
            <template #body="{ data }">
                <div style="    
    background: rgb(255 239 241);
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    font-weight: 400;
    text-align: center;">{{ formatCurrency(data.TotalSalary) }}</div>
            </template>
        </Column>
        <template #expansion="slotProps">
            <DataTable :value="slotProps.data.Employeers" showGridlines>
                <Column field="Name" header="Name Surname"></Column>
                <Column field="Salary" header="Salary">
                    <template #body="{ data }">
                        <div style="   
    display: flex;
    justify-content: center;
    background: #efefff;
    width: 100%;
    padding: 12px;
    border-radius: 6px;
    font-weight: 400;">
    {{ formatCurrency(data.Salary) }}
    </div>
                    </template>
                </Column>
                <Column field="Position" header="Position"></Column>
            </DataTable>
        </template>
    </DataTable>
</template>


<style scoped lang="scss"></style>