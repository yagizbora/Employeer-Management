<script setup>
import { defineAsyncComponent, onMounted,ref } from 'vue';
import CustomerService from "@/service/customerService";
import { RouterLink } from 'vue-router';


const customerservice = new CustomerService()

const data = ref([])

const fetchdata = async () => {
    try {
        const response = await customerservice.getcustomers()
        console.log('Fetched customers:', response.data.data);
        data.value = response.data.data;
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}


const CustomerTable = defineAsyncComponent(() => import('./CustomerTable.vue'));
onMounted(() => {
fetchdata()
});
</script>


<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5>Customers</h5>
                </div>
                <div class="card-body">
                    <Toolbar>
                        <template #start>
                            <RouterLink to="/customer/create-customer">
                                <Button icon="pi pi-plus" rounded></Button>
                            </RouterLink>
                        </template>
                    </Toolbar>
                    <CustomerTable :data="data" />
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss">

</style>