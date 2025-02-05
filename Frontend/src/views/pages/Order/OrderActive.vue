<script setup lang="js">
import { formatDateInput } from "@/utils/helper.js";
import { defineAsyncComponent, ref } from 'vue';
import OrderService from "@/service/Orderservice";
import { onMounted } from 'vue';
import { reactive } from 'vue';
import Swal from 'sweetalert2';
import DepartmantService from "@/service/DepartmantService.js";
const departmantservice = new DepartmantService();


const editData = ref([{}])

const departmans = ref([]);
const employeer = ref([]);

const EditOrderDialog = ref(false)
const orderservice = new OrderService();

const data = ref([])

const OrderTable = defineAsyncComponent(() => import('./OrderTable.vue'));

const FetchData = async () => {
    const params = {
        is_complated: true
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
        const res = await departmantservice.getdepartmant();
        departmans.value = res.data;
        if (departmans.value && departmans.value.length > 0) {
            const departmanId = data.departman_id || departmans.value[0].id;
            getemployeerwithdepartman(departmanId);
            editData.value.departman_id = departmanId; 

        }
        // console.log(response.data)
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

const deleteorder = async (data) => {
    try {
        const response = await orderservice.deleteorders(data);
        if (response.status == 200) {
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',

            })
        }
        FetchData();
    } catch (err) {
        console.log(err)
    }
}

const deleteorders = async (data) => {
    // console.log(data)
    // if (data.is_complated) {
    //     Swal.fire({
    //         title: 'Warning',
    //         text: 'You can not delete complated orders',
    //         icon: 'warning',
    //     });
    //     return;
    // }
    Swal.fire({
        title: 'Are you sure you want to delete this order?',
        text: 'You will not be able to recover this order!',
        icon: 'warning',
        showCancelButton: true,  // Bu, iptal butonunu göstermek için kullanılır
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',  // İptal butonunun metni
    }).then((result) => {
        if (result.isConfirmed) {
            deleteorder(data);
            FetchData();
        } else if (result.isDismissed) {
            Swal.fire('Cancelled', '', 'info');
        }
    });
}

const handleupdatedata = async () => {
    try {
        const response = await orderservice.updateorderbyid({ ...editData.value });
        if (response.status == 201) {
            Swal.fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Ok'
            })
            FetchData();
            EditOrderDialog.value = false
        }
    }
    catch (error) {
        console.log(error)
    }
}

onMounted(() => {
    FetchData()
});
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div>
                <div class="card-body">
                    <OrderTable :data="data" @iscomplatedsetbyid="iscomplatedsetbyid" @editorders="editorders"
                        @deleteorders ="deleteorders" />

                </div>
            </div>
        </div>
        <Dialog v-model:visible="EditOrderDialog" modal style="width: 65rem;">
            <template #header>
                <h4>Edit Order</h4>
            </template>
            <div class="grid">
                <div class="col-12">
                    <div class="card">
                        <div class="card-body xl:flex">
                            <div class="col-12 xl:col-6">
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
                            <div class="col-12 xl:col-6">
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
                                <Textarea v-model="editData.order_description" autoResize></Textarea>
                            </div>
                        </div>
                        <div class="col">
                            <div class="flex flex-column">
                                <!-- <label>Edit order is disabled please contact IT Departmant</label> -->
                                <Button class="w-max" icon="pi pi-plus" label="Edit Order" @click="handleupdatedata"></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped></style>