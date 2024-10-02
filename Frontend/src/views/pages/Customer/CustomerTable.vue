<script setup lang="js">
import { formatPhone, emailValid } from "@/utils/helper.js";


const props = defineProps({
    data: Array
});

</script>


<template>
    <DataTable :value=data>
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
    </DataTable>
</template>

<style lang="scss" scoped>

</style>