<script setup>


const emit = defineEmits(["editdata","deletedata"])

const editdata = (data) => {
    emit("editdata", data);
}

const deletedata = (data) => {
    emit("deletedata", data);
}


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
        <Column header="Operations">
            <template #body=" { data } ">
                <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit" @click="editdata(data)" />
                <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Delete" @click="deletedata(data)" />
            </template>
        </Column>
    </DataTable>
</template>

<style lang="scss" scoped>

</style>