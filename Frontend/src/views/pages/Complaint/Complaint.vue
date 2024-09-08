<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import ComplaintService from "@/service/ComplaintService"
const ComplaintTable = defineAsyncComponent(() => import('./ComplaintTable.vue'));

const complaintservice  = new ComplaintService()

const data = ref([]);

const fetchdata = async () => {
    try {
        const response = await complaintservice.getcomplaint()
        data.value = response
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
fetchdata()
});
</script>

<template>
<div class="grid">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h5>Complaints</h5>
                <div class="card-body">
                    <ComplaintTable :data="data" />
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>

</style>