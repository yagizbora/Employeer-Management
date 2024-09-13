<script setup>
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();

import NotesService from "@/service/NotesService"
import { onMounted } from 'vue';
import { ref } from 'vue';
const noteservice = new NotesService();


const FormData = ref({});
const dataid = ref(route.params.id || null);

const getnotes = async (id) => {
    try {
        if (id) {
            const response = await noteservice.getnotesbyid(id)
            FormData.value = response;
            console.log(response)
        }
    } catch (error) {
        console.error(error);
    }
}

const editnotes = async (data) => {
    try {
        const response = await noteservice.updatenotes({ ...FormData.value })
        if (response) {
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
            })
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    getnotes(dataid.value)
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <div class="flex">
                        <h5>Edit Note</h5>
                    </div>
                </div>
                <div class="card-body">
                    <div class="col-12">
                        <div class="flex flex-column">
                            <label class="mb-2"> Is important? </label>
                            <Checkbox v-model="FormData.is_important" :binary="true" />
                        </div>
                    </div>
                    <div class="flex">
                        <div class="col-6">
                            <div class="flex flex-column">
                                <label>Note Title</label>
                                <InputText type="text" v-model="FormData.note_title" placeholder="Title" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="flex flex-column">
                                <label>Note Description</label>
                                <Textarea type="text" v-model="FormData.note_description" />
                            </div>
                        </div>
                    </div>
                    <Button @click="editnotes"  icon="pi pi-plus" label="Edit note" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>