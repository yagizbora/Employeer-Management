<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();


const emit = defineEmits(["deletenotes"])

const deletenotes = (data) => {
    emit("deletenotes",data)
}

const editnotes = (data) => {
    if (data && data.id) {
        router.push({ name: 'edit-notes', params: { id: data.id } });
    }
}

const props = defineProps({
    data: Array
});
</script>


<template>
    <DataTable :value="data" paginator :rows="5">
        <Column field="note_title" header="Note Title"></Column>
        <Column field="note_description" header="Note Description"></Column>
        <Column field="is_important" header="Is important?">
            <template #body="slotProps">
                <div v-if="slotProps.data.is_important" class="if_important">
                    <!-- <label>Yes</label> -->
                    <Checkbox v-model="slotProps.data.is_important" :binary="true" disabled />
                </div>
                <div v-else class="if_not_important">
                    <Checkbox v-model="slotProps.data.is_important" :binary="true" disabled />
                </div>
            </template>
        </Column>
        <Column header="Operations">
            <template #body="{ data }">
                <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Edit"
                    @click="deletenotes(data)" />
                <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit" @click="editnotes(data)" />
            </template>
        </Column>
    </DataTable>


</template>


<style lang="scss" scoped>

.if_important {
    background-color: red;
    color: white;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}

.if_not_important {
    background-color: blue;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
</style>