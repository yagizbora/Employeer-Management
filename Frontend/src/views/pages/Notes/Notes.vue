<script setup>
import { defineAsyncComponent, ref } from 'vue';
import NotesService from "@/service/NotesService"
import { onMounted } from 'vue';

const noteservice = new NotesService()

const NotesTable = defineAsyncComponent(() => import('./NotesTable.vue'))

const data = ref(null)

const getdata = async() => {
    const response = await noteservice.getnotes()
    console.log(response)
    data.value = response
}

onMounted(() => {
    getdata()
});
</script>

<template>
<div class="grid">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <h5>
                    Notes List
                </h5>
                <NotesTable :data="data" />
            </div>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss"></style>