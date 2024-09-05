<script setup lang="js">
import InputSwitch from 'primevue/inputswitch';
import { formatDateWithoutTime } from "@/utils/helper.js";

const handleSwitchChange = (data) => {
    console.log('Switch changed for:', data);
    // Veritabanında güncelleme yapmak için event'i tetikle
    emit('iscomplatedsetbyid', data);
};

const emit = defineEmits(["editorders","iscomplatedsetbyid"]);

const editorders = (data) => {
    emit("editorders",data)
};

    // const iscomplatedsetbyid = (data) => {
    //     emit('iscomplatedsetbyid', data)
    // }

const props = defineProps({
    data: {
        type: Array(Object),
        required :true
    }
});


</script>

<template>
    <DataTable :value="data">
        <Column field="departman_name" header="Departman Name"></Column>
        <Column field="employeer_name" header="Employeer Name"></Column>
        <Column field="order_name" header="Order Name"></Column>
        <Column field="order_description" header="Order Description"></Column>
        <Column field="is_complated" header="Is Complated?">
            <template #body="{ data }">
                <!-- Doğru v-model kullanımı -->
                <InputSwitch v-model="data.is_complated" @change="handleSwitchChange(data)" />
            </template>
        </Column>
        <Column field="start_date" header="Start Date">
        <template #body="{data}">
            {{formatDateWithoutTime(data.start_date)}}
        </template>
        </Column>
        <Column field="end_date" header="End Date">
        <template #body="{data}">
            {{formatDateWithoutTime(data.end_date)}}
        </template>
        </Column>
        <Column header="Operations">
            <template #body="{ data }">
                <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit" @click="editorders(data)" />
            </template>
        </Column>
    </DataTable>
</template>


<style lang="scss" scoped></style>