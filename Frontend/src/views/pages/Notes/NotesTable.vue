<script setup>
import { onMounted } from 'vue';


const emit = defineEmits(["deletenotes"])

const deletenotes = (data) => {
    emit("deletenotes",data)
}

const props = defineProps({
    data: Array
});
</script>


<template>
    <DataTable :value="data">
        <Column field="note_title" header="Note Title"></Column>
        <Column field="note_description" header="Note Description"></Column>
        <Column field="is_important" header="Is important?">
            <template #body="slotProps">
                <div v-if="slotProps.data.is_important" class="if_important">
                    <label>Yes</label>
                </div>
                <div v-else class="if_not_important">
                    No
                </div>
            </template>
        </Column>
        <Column header="Operations">
            <template #body="{ data }">
                <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Edit" @click="deletenotes(data)" />
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
    color: black;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
}
</style>