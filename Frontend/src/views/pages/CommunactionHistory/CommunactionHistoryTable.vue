<script setup lang="js">
import { formatDate } from "@/utils/helper.js";
const emit = defineEmits(["deletedata, editdata"]);

const deletedata = (data) => {
    emit("deletedata", data)
}
const editdata = (data) => {
    emit("editdata", data)
}

const props = defineProps({
    data: Object
});
</script>


<template>
    <DataTable :value="data">
        <Column field="Name" header="Name"></Column>
        <Column field="communaction_type" header="Communaction Type"></Column>
        <Column field="customer_name" header="Customer Name"></Column>
        <Column field="details" header="Details"></Column>
        <Column field="timestamp" header="Time">
            <template #body="data">
                {{ formatDate(data.data.timestamp) }}
            </template>
        </Column>
        <Column header="Operations">
            <template #body="{ data }">
                <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel" @click="deletedata(data)" />
                <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Cancel" @click="editdata(data)" />
            </template>
        </Column>
    </DataTable>
</template>

<style lang="scss" scoped>


</style>