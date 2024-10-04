<script setup lang="js">
import { formatPhone, prepareUrl } from "@/utils/helper.js";


const emit = defineEmits(["editdata"]);

const editdata = (data) => {
    emit("editdata", data)
}


const props = defineProps({
    data: Array
});

</script>

<template>
    <DataTable :value="data">
        <Column field="customer_name" header="Customer Name"></Column>
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
                    {{ (slotProps.data.customer_email) }}
                </div>
            </template>
        </Column>
        <Column field="customer_phone" header="Customer phone">
            <template #body="slotProps">
                +90-{{ formatPhone(slotProps.data.customer_phone) }}
            </template>
        </Column>
        <Column field="customer_address" header="Customer Address"></Column>

        <Column field="project_name" header="Project Name"></Column>
        <Column field="project_web_url" header="Project Web url">
            <template #body="slotProps">
                <a :href="prepareUrl(slotProps.data.project_web_url)" target="_blank">{{ slotProps.data.project_web_url
                    }}</a>
            </template>
        </Column>
        <Column header="Is important Customer?">
            <template #body="slotProps">
                <Checkbox :binary="true" v-model="slotProps.data.is_important_customer" disabled />
            </template>
        </Column>
        <Column header="Operations">
            <template #body="{ data }">
                <div>
                    <Button icon="pi pi-pencil" severity="info" text rounded aria-label="Edit" @click="editdata(data)" />
                </div>
            </template>
        </Column>
    </DataTable>
</template>


<style lang="scss" scoped></style>