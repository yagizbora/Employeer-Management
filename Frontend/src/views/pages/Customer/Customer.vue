<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';
import CustomerService from "@/service/customerService";
import { RouterLink } from 'vue-router'
import Swal from 'sweetalert2';

const emailError = ref(false)

const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.value = !emailPattern.test(FormData.value.customer_email);
}


const customerservice = new CustomerService()

const data = ref([])
const FormData = ref([])
const is_important_customer = ref(true)
const editdialog = ref(false)

const fetchdata = async () => {
    try {
        const response = await customerservice.getcustomers({ is_important_customer: is_important_customer.value })
        console.log('Fetched customers:', response.data.data);
        data.value = response.data.data;
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

const editdata = async (data) => {
    const response = await customerservice.getcustomersbyid(data)
    editdialog.value = true
    FormData.value = response.data[0]
    console.log('Fetched customer:', response.data);
}

const UpdateCustomer = async () => {
    const response = await customerservice.updatecustomerbyid({ ...FormData.value })
    if (response.status == 200) {
        Swal.fire({
            title: 'Success',
            text: response.data.message, // 'text' kullanarak mesajı gösteriyoruz
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        fetchdata();
        editdialog.value = false
    }
}

const deletedata = async (data) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    })
        .then((result) => {
            if (result.isConfirmed) {
                handledeletedata(data)

            }
        })
}

const handledeletedata = async (data) => {
    console.log(data)
    try {
        const response = await customerservice.deletecustomerbyid(data);
        if (response.status == 200) {
            Swal.fire({
                title: 'Success',
                text: response.data.message, 
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            fetchdata();
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: response.data.message,
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
};


const CustomerTable = defineAsyncComponent(() => import('./CustomerTable.vue'));
onMounted(() => {
    fetchdata()
});
</script>


<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5>Customers</h5>
                </div>
                <div class="card-body">
                    <div class="flex flex-column field">
                        <label class="mb-2">Is important Customer?</label>
                        <InputSwitch v-model="is_important_customer" @change="fetchdata" />
                    </div>
                    <Toolbar>
                        <template #start>
                            <RouterLink to="/customer/create-customer">
                                <Button icon="pi pi-plus" rounded></Button>
                            </RouterLink>
                        </template>
                    </Toolbar>
                    <CustomerTable :data="data" @deletedata="deletedata" @editdata="editdata" />
                </div>
            </div>
        </div>
        <Dialog v-model:visible="editdialog" modal header="Edit Customer" :style="{ width: '45rem' }"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="xl:flex">
                <div class="col-12 xl:col-6">
                    <div class="flex flex-column">
                        <label>Customer Name</label>
                        <InputText v-model="FormData.customer_name" />
                    </div>
                    <div class="flex flex-column">
                        <label>Customer Email</label>
                        <InputText type="email" placeholder="Customer Email" v-model="FormData.customer_email"
                            @blur="validateEmail" />
                        <small v-if="emailError" class="p-error">Please enter a valid email address</small>
                    </div>
                    <div class="flex flex-column">
                        <label>Phone Number</label>
                        <InputMask mask="(999) 999-9999" placeholder="Phone Number" v-model="FormData.customer_phone" />
                    </div>
                </div>
                <div class="col-12 xl:col-6">
                    <div class="flex flex-column">
                        <label>Address</label>
                        <InputText v-model="FormData.customer_address" />
                    </div>
                    <div class="flex flex-column">
                        <label>Customer company</label>
                        <InputText v-model="FormData.customer_company" />
                    </div>

                </div>
            </div>
            <div class="col">
                <Button @click="UpdateCustomer" icon="pi pi-plus" label="Create Customer" />
            </div>
        </Dialog>
    </div>

</template>

<style lang="scss"></style>