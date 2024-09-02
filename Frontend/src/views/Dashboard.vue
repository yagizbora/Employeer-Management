<script setup>
import Swal from 'sweetalert2'
import { onMounted,ref } from 'vue';
import EmployeerService from "@/service/EmployeerService"
import { formatCurrency } from "@/utils/helper"
const employeerservice = new EmployeerService()

const data = ref([])

const props = defineProps({
    data: Array
})

const FetchData = async () => {
    try {
        const response = await employeerservice.getEmployeers()
        data.value = response
    } catch (error) {
        console.error(error)
    }
}

onMounted(FetchData);
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h4>Employeer list</h4>
                <Toolbar>
                    <template v-slot:start>
                    </template>
                    <template v-slot:end>
                        <RouterLink to="Employeer-Management">
                            <Button label="Employeer Management"></Button>
                        </RouterLink>
                    </template>
                </Toolbar>
                <div class="card-body">
                    <DataTable :value=data>
                        <Column field="Name" header="Name"></Column>
                        <Column field="Department" header="Department"></Column>
                        <Column field="Position" header="Position"></Column>
                        <Column field="Salary" header="Salary">
                            <template #body=" { data } ">
                                {{ formatCurrency(data.Salary) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="scss"></style>