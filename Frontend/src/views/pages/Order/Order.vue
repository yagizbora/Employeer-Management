<script setup lang="js">
import { defineAsyncComponent,ref } from 'vue';
import OrderService from "@/service/Orderservice";
import { onMounted } from 'vue';
import { reactive } from 'vue';
import Swal from 'sweetalert2';
import OrderActive from './OrderActive.vue';
import OrderPassive from './OrderPassive.vue';
// const orderservice = new OrderService();

// const data = ref([])

// const OrderTable = defineAsyncComponent(() => import('./OrderTable.vue'));

// const FetchData = async () => {
//     const params = {
//         is_complated: false
//     }
//     const response = await orderservice.getorders(params);
//     data.value = response.data.data;
//     console.log(data.value);
// }

// const iscomplatedsetbyid = async (data) => {
//     const body = {
//         "id": data.id,
//         "is_complated":data.is_complated
//     }
//     const response = orderservice.iscomplatedsetbyid(body)
//     if (response == 200) {
//         Swal.fire({
//             title: 'Success',
//             text: response.data.message,
//             icon: 'success',
//         })
//     }
// }
// onMounted(() => {
//     FetchData()
// })
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Order Management</h5>
                <div class="card-body">
                    <Toolbar>
                        <template #start></template>
                        <template #end>
                            <RouterLink to="/order/create-order">
                                <Button label="Create Order" icon="pi pi-plus" />
                            </RouterLink>
                        </template>
                    </Toolbar>
                    <TabView>
                        <TabPanel header="Passive Orders">
                            <OrderPassive />
                        </TabPanel>
                        <TabPanel header="Active Orders">
                            <OrderActive />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>