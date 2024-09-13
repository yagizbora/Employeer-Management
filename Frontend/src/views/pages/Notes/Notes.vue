<script setup>
import { defineAsyncComponent, ref } from 'vue';
import Swal from 'sweetalert2';
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

const handledeletenotes = async (data) => {
    const response = await noteservice.deletenotes(data)
    if (response.status == 200) {
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: 'Ok',
        })
        getdata()
    }
}

const deletenotes = async (data) => {
    Swal.fire({
        title: 'Are you sure delete note?',
        text: 'You will not be able to recover this note.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor:'red',
        confirmButtonText: 'Yes',
        cancelButtonColor: "green",
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            handledeletenotes(data)
        }
    })
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
                    <NotesTable :data="data" @deletenotes="deletenotes"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>