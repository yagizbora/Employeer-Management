<script setup>


const props = defineProps({
    data: Array
});

</script>

<template>
    <DataTable :value=data>
        <Column field="Employeer_Name" header="Employeer Name"></Column>
        <Column field="complaint_title" header="Complaint Title"></Column>
        <Column field="complaint_description" header="Complaint Description"></Column>
    </DataTable>

</template>

<style scoped lang="scss"></style>