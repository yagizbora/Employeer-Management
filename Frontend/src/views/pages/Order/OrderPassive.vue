<script setup lang="js">
import { defineAsyncComponent, ref } from 'vue';
import OrderService from "@/service/Orderservice";
import { onMounted } from 'vue';
import { reactive } from 'vue';
import Swal from 'sweetalert2';

const orderservice = new OrderService();

const data = ref([])

const OrderTable = defineAsyncComponent(() => import('./OrderTable.vue'));

const FetchData = async () => {
    const params = {
        is_complated: false
    }
    const response = await orderservice.getorders(params);
    data.value = response.data.data;
    console.log(data.value);
};

const iscomplatedsetbyid = async (data) => {
    const body = {
        "id": data.id,
        "is_complated": data.is_complated
    }
    const response = orderservice.iscomplatedsetbyid(body)
    if (response == 200) {
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
        })
    }
};
onMounted(() => {
    FetchData()
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div>
                <div class="card-body">
                    <OrderTable :data="data" @iscomplatedsetbyid="iscomplatedsetbyid" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>