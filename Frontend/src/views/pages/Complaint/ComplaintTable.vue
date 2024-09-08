<script setup>

const deletecomplaint = (data) => {
    emit("deletecomplaint", data);
}

const emit = defineEmits(["deletecomplaint"]);

const props = defineProps({
    data: Array
});

</script>

<template>
    <DataTable :value=data>
        <Column field="Employeer_Name" header="Employeer Name"></Column>
        <Column field="complaint_title" header="Complaint Title"></Column>
        <Column field="complaint_description" header="Complaint Description"></Column>
        <Column header="Operations">
            <template #body="{ data }">
                <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel"
                    @click="deletecomplaint(data)" /> </template>
        </Column>
    </DataTable>

</template>

<style scoped lang="scss"></style>