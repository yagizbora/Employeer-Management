<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import NeedService from "@/service/NeedService";
import { RouterLink } from 'vue-router';
const needservice = new NeedService()
const NeedTable = defineAsyncComponent(() => import('./NeedTable.vue'));

const data = ref([])

const FetchData = async () => {
    try {
        const response = await needservice.getNeeds()
        data.value = response.data.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const getdatabyid = async (data) => {
    const response = await needservice.getNeedsbyid({...data});
    console.log(response)
}


onMounted(() => {
    FetchData()
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">Request List</h5>
                </div>
                <Toolbar>
                    <template #start>

                    </template>
                    <template #end>
                        <RouterLink to="/need/create-need">
                            <Button icon="pi pi-plus" severity="secondary" rounded></Button>
                        </RouterLink>
                    </template>
                </Toolbar>
                <div class="card-body">
                    <NeedTable :data="data" @editdata="getdatabyid" />
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss"></style>