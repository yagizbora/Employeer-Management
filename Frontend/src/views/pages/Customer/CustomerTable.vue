<script setup lang="js">
import { formatPhone, emailValid } from "@/utils/helper.js";


const emit = defineEmits(["deletedata", "editdata"]);

const deletedata = (data) => {
    emit("deletedata", data);
}

const editdata = (data) => {
    emit("editdata", data)
}


const props = defineProps({
    data: Array
});

</script>


<template>
    <DataTable :value=data paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="customer_name" header="Customer Name"></Column>
        <Column field="customer_address" header="Customer Address"></Column>
        <Column field="customer_phone" header="Customer Phone">
            <template #body="slotProps">
                +90-{{ formatPhone(slotProps.data.customer_phone) }}
            </template>
        </Column>
        <Column field="customer_company" header="Customer Company">
            <template #body="slotProps">
                <div>
                    <span v-if="slotProps.data.customer_company">{{ slotProps.data.customer_company }}</span>
                    <span v-else>No Company Info</span>
                </div>
            </template>
        </Column>
        <Column field="customer_email" header="Customer Email">
            <template #body="slotProps">
                <div>
                    {{(slotProps.data.customer_email) }}
                </div>
            </template>
        </Column>
        <Column header="Is important Customer?">
        <template #body=" slotProps">
            <InputSwitch v-model="slotProps.data.is_important_customer" disabled />
        </template>
        </Column>
        <Column header="Operations">
            <template #body=" { data } ">
                <div>
                    <Button icon="pi pi-trash" severity="danger" text rounded aria-label="Cancel"
                        @click="deletedata(data)" v-if="!data.is_important_customer" />
                    <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit" @click="editdata(data)"/>
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<style lang="scss" scoped>

</style>