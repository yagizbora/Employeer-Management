<script setup>
import Swal from 'sweetalert2';
import { defineAsyncComponent, onMounted, ref, computed } from 'vue';
import CustomerService from "@/service/customerService";
const customerservice = new CustomerService();

const FormData = ref({});
const emailError = ref(false)

const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.value = !emailPattern.test(FormData.value.customer_email);
}

const isFormValid = computed(() => {
    return FormData.value.customer_email && FormData.value.customer_name && FormData.value.customer_company && FormData.value.customer_phone &&
    FormData.value.customer_address;
});

const CreateCustomer = async () => {
    try {
        const response = await customerservice.addcustomer({ ...FormData.value });
        console.log(response);
        if (response.status == 201) {
            Swal.fire({
                title: 'Operation is successfully',
                text: response.data.message + '. You will be redirected to Customer page',
                icon: 'success',
                confirmButtonText: 'Close',
            }).then(() => {
                setTimeout(() => {
                    window.location.href = '/customer/customer'; 
                }, 1); 
            });

            // Formu temizleme
            FormData.value = {};
        }
    } catch (err) {
        console.error(err);
    }
};



</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <div class="col-12">
                    <div class="xl:flex">
                        <div class="col-12 xl:col-4 flex flex-column">
                            <label>Customer name</label>
                            <InputText placeholder="Customer Name" v-model="FormData.customer_name" />
                        </div>
                        <div class="col-12 xl:col-4 flex flex-column">
                            <label>Customer Address</label>
                            <InputText placeholder="Customer Address" v-model="FormData.customer_address" />
                        </div>
                        <div class="col-12 xl:col-4 flex flex-column">
                            <label>Customer Phone</label>
                            <InputMask mask="(999) 999-9999" placeholder="Phone Number"
                                v-model="FormData.customer_phone" />
                        </div>
                    </div>
                    <div class="xl:flex">
                        <div class="col-12 xl:col-4 flex flex-column">
                            <label> Customer Company</label>
                            <InputText placeholder="Customer Company" v-model="FormData.customer_company" />
                        </div>
                        <div class="col-12 xl:col-4 flex flex-column">
                            <label>Customer Email</label>
                            <InputText type="email" placeholder="Customer Email" v-model="FormData.customer_email"
                                @blur="validateEmail" />
                            <small v-if="emailError" class="p-error">Please enter a valid email address</small>
                        </div>
                        <div class="col-12 xl:col-4 flex flex-column">
                            <label>Is important Customer?</label>
                            <InputSwitch v-model="FormData.is_important_customer" />
                            <label> 
                                If you switch is true you cannot delete and edit customer but if you want  to edit or delete you must contact IT departmant
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <Button @click="CreateCustomer" :disabled="emailError || !isFormValid" icon="pi pi-plus"
                            label="Create Customer" />
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss"></style>