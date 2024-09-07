<script setup lang="js">
import { formatDateInput } from "@/utils/helper.js";
import { defineAsyncComponent, ref } from 'vue';
import OrderService from "@/service/Orderservice";
import { onMounted } from 'vue';
import { reactive } from 'vue';
import Swal from 'sweetalert2';
import DepartmantService from "@/service/DepartmantService.js";
const departmantservice = new DepartmantService();

const editData = ref({})

const orderservice = new OrderService();


const departmans = ref([]);
const employeer = ref([]);

const EditOrderDialog = ref(false)

const data = ref([])

const OrderTable = defineAsyncComponent(() => import('./OrderTable.vue'));

const FetchData = async () => {
    const params = {
        is_complated: false
    }
    const response = await orderservice.getorders(params);
    data.value = response.data.data;
    // console.log(data.value);
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

const editorders = async (data) => {
    try {
        const response = await orderservice.getordersbyid({ ...data })
        console.log(data)
        const res = await departmantservice.getdepartmant();
        departmans.value = res.data;
        if (departmans.value && departmans.value.length > 0) {
            const departmanId = data.departman_id || departmans.value[0].id;
            getemployeerwithdepartman(departmanId);
            editData.value.departman_id = departmanId;

        }
        console.log(response.data)
        if (response) {
            editData.value = {
                ...response.data[0],
                start_date: formatDateInput(response.data[0].start_date),
                end_date: formatDateInput(response.data[0].end_date)
            };
            EditOrderDialog.value = true
        }
    } catch (err) {
        console.log(err)
    }
}

const getemployeerwithdepartman = async (data) => {
    if (data) {
        const response = await orderservice.getEmployeersByDepartmantId(data);
        employeer.value = response.data;
    } else {
        employeer.value = [];
    }
};

const onDepartmanChange = (event) => {
    const departmanId = event.value;
    editData.value.departman_id = departmanId;
    getemployeerwithdepartman(departmanId);
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
                    <OrderTable :data="data" @iscomplatedsetbyid="iscomplatedsetbyid" @editorders="editorders" />
                </div>
            </div>
            <Dialog v-model:visible="EditOrderDialog" modal style="width: 65rem;">
                <template #header>
                    <h4>Edit Order</h4>
                </template>
                <div class="grid">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body flex">
                                <div class="col-6">
                                    <div>
                                        <div class="flex flex-column">
                                            <label>Departman</label>
                                            <Dropdown class="w-full-max" v-model="editData.departman_id"
                                                :options="departmans" optionLabel="Departman" optionValue="id"
                                                @change="onDepartmanChange" />
                                        </div>
                                        <div class=" flex flex-column">
                                            <label>Order Title</label>
                                            <InputText v-model="editData.order_name"></InputText>
                                        </div>
                                        <div class="flex flex-column">
                                            <label>Start Date</label>
                                            <InputText type="date" v-model="editData.start_date"></InputText>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div>
                                        <div class="flex flex-column">
                                            <label>Employeer</label>
                                            <Dropdown v-model="editData.employeer_id" :options="employeer"
                                                optionLabel="employeer_name" optionValue="employeer_id" />
                                        </div>
                                        <div class="flex flex-column">
                                            <label>End Date</label>
                                            <InputText type="date" v-model="editData.end_date"></InputText>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="flex flex-column">
                                    <label>Order Description</label>
                                    <Textarea v-model="editData.order_description" autoResize rows="5"
                                        cols="10"></Textarea>
                                </div>
                            </div>
                            <div class="col">
                                <div class="flex flex-column">
                                    <label>Edit order is disabled please contact IT Departmant</label>
                                    <Button class="w-max" disabled icon="pi pi-plus" label="Edit Order"></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>