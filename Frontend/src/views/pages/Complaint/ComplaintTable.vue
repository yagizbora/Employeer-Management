<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();


const deletecomplaint = (data) => {
    emit("deletecomplaint", data);
}
// const editcomplaint = (data) => {
//     emit("editcomplaint", data)
// }


const editcomplaint = (data) => {
    if (data && data.id) {
        router.push({ name: 'Edit Complaint', params: { id: data.id } });
    }
}

const emit = defineEmits(["deletecomplaint","editcomplaint"]);

const props = defineProps({
    data: Array
});

</script>

<template>
    <div v-if="data.length == 0">
        <Message severity="info">No Complaint Found</Message>
    </div>
    <div v-else>
        <DataTable :value=data paginator :rows="5">
            <Column field="Employeer_Name" header="Employeer Name"></Column>
            <Column field="complaint_title" header="Complaint Title"></Column>
            <Column field="complaint_description" header="Complaint Description"></Column>
            <Column header="Operations">
                <template #body="{ data }">
                    <div class="flex">
                        <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel"
                            @click="deletecomplaint(data)" />
                        <Button severity="info" icon="pi pi-pencil" text rounded aria-label="Edit"
                            @click="editcomplaint(data)" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<style scoped lang="scss"></style>