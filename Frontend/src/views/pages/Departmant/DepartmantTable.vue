<script setup>

const props = defineProps({
    data:Array
})

const emit = defineEmits(["deletedepartmant","editdepartmant"]);

const deletedepartmant = (data) => {
    emit("deletedepartmant", data);
}
const editdepartmant = (data) => {
    emit("editdepartmant", data);
}
</script>

<template>
    <DataTable :value="data" >
        <Column field="Departman" header="Departmant"></Column>
        <Column header="Operations" class="operations">
            <template #body="{ data }">
                <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel"
                    @click="deletedepartmant(data)" />
                <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit"
                    @click="editdepartmant(data)" />
            </template>
        </Column>
    </DataTable>
</template>

<style lang="scss" scoped>


</style>