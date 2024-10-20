<script setup lang="js">


const props = defineProps({
    data: Array
});
</script>

<template>

<DataTable :value="data">
    <Column field="username" header="Username"></Column>
<Column field="is_admin" header="Admin Status">
<template #body=" { data } ">
    <InputSwitch v-model="data.is_admin" disabled></InputSwitch>
</template>
</Column>
</DataTable>

</template>



<style lang="scss" scoped>

</style>