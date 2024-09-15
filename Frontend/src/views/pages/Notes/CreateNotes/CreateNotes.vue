<script setup lang="js">
import Swal from 'sweetalert2'
import { defineAsyncComponent, ref, onMounted } from 'vue';
import NotesService from "@/service/NotesService"

const noteservice = new NotesService();
const FormData = ref({});

const createdata = async () => {
    const response = await noteservice.createnotes(FormData.value)
    if (response) {
        Swal.fire({
            title: 'Success',
            text: response.data.message,
            icon: 'success',
            confirmButtonText: response.data.button_name
        })
    }
}


</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5>Create Note</h5>
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
                    <Button @click="createdata" icon="pi pi-plus" label="Create note" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>