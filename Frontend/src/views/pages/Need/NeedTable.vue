<script setup>


const props = defineProps({
    data: {
        type: Array,
        required: true
    }
});
</script>

<template>
    <DataTable :value="data">
        <Column field="need_title" header="Request Title"></Column>
        <Column field="need_description" header="Request Description"></Column>
        <Column field="need_subject" header="Request Subject"></Column>
        <Column field="Name" header="Employeer Name"></Column>
        <Column field="Departmant" header="Departmant"></Column>
    </DataTable>
</template>

<style lang="scss" scoped>

</style>