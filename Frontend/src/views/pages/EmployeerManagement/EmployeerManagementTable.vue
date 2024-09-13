<script setup>
import { formatCurrency } from "@/utils/helper"


const emit = defineEmits(["deleteemployeer", "editemployeer"]);

const deleteemployeer = (data) => {
    emit("deleteemployeer", data);
}

const editemployeer = (data) => {
    emit("editemployeer", data)
}

const props = defineProps({
    data: Array
});
</script>

<template>
    <DataTable :value=data paginator :rows="5">
        <Column field="Name" header="Name"></Column>
        <Column field="Department" header="Department"></Column>
        <Column field="Position" header="Position"></Column>
        <Column field="Salary" header="Salary">
            <template #body="{ data }">
                {{ formatCurrency(data.Salary) }}
            </template>
        </Column>
        <Column header="Operations">
            <template #body="{ data }">
                <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel"
                    @click="deleteemployeer(data)" />
                <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit"
                    @click="editemployeer(data)" />
            </template>
        </Column>
    </DataTable>

</template>

<style scoped lang="scss"></style>