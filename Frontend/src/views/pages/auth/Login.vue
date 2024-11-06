<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, onMounted } from 'vue';
import { useToast } from "primevue/usetoast";
const toast = useToast();
import Swal from 'sweetalert2';
import AppConfig from '@/layout/AppConfig.vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();

const API_URL = import.meta.env.VITE_API_URL;

const { layoutConfig } = useLayout();
// const email = ref('');
// const password = ref('');
// const checked = ref(false);
const status = ref(false)
const formData = ref({});
const register = ref({});
const registerforfirst = ref(false)
const seepassword = ref(false);
const clearlocalstorage = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('is_admin')
}

onMounted(() => {
    clearlocalstorage(),
        checkfirstlogin()
})

const checkfirstlogin = async () => {
    const response = await axios.get(`${API_URL}firstregistercontroller`);
    status.value = response.data.status === "true";

    if (status.value) {
        Swal.fire({
            title: 'Bilgilendirme',
            text: 'Bu uygulama ilk kez çalıştığınız için lütfen hesabınızı oluşturunuz. Şifrenizi unuttuysanız sizi hemen yeniden isteyebilirsiniz.',
            icon: 'info',
            confirmButtonText: 'Tamam'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    registerforfirst.value = true;
                }
            });
    } else {
        return;
    }
};


const firstregister = async () => {
    try {
        if (!register.value.username || !register.value.password) {
            Swal.fire({
                title: 'Hata!',
                text: 'Lütfen tüm alanları doldurunuz',
                icon: 'error',
                confirmButtonText: 'Tamam'
            });
            registerforfirst.value = false

        }
        else
        {
            const response = await axios.post(`${API_URL}firstregister`, { ...register.value })
            if (response) {
                registerforfirst.value = false
                Swal.fire({
                    title: 'Başarılı!',
                    text: response.data.message + `. Please click Ok button page will be reload`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload()
                    }
                })

            }
        }
    } catch (e) {
        console.error(e);
        return;
    }
}

const login = async () => {
    try {
        if (!formData.value.username || !formData.value.password) {
            Swal.fire({
                title: 'Hata!',
                text: 'Lütfen tüm alanları doldurunuz',
                icon: 'error',
                confirmButtonText: 'Tamam'
            });
            return;
        }
        const response = await axios.post(`${API_URL}login`, { ...formData.value });
        if (response.status === 200) {
            console.log(response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id', response.data.user_id);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('is_admin', response.data.is_admin);
            toast.add({ severity: 'success', summary: 'Başarılı', detail: 'Giriş yapıldı yönlendiriliyorsunuz', life: 3000 });
            setTimeout(() => {
                router.push({ name: 'dashboard' });
            }, 3000);
        }

    } catch (error) {
        if (error.response && error.response.status === 401) {
            Swal.fire({
                title: 'Hata!',
                text: error?.response?.data?.message,
                icon: 'error',
                confirmButtonText: 'Tamam'
            });
        } else {
            console.error(error);
            Swal.fire({
                title: 'Hata!',
                text: error?.response?.data?.message,
                icon: 'error',
                confirmButtonText: 'Tamam'
            });
        }
    }
};



</script>

<template>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3">Merhabalar</div>
                        <span class="text-600 font-medium">Lütfen giriş yapınız</span>
                    </div>
                    <div>
                        <label for="username" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="username" type="text" placeholder="Username" class="w-full md:w-30rem mb-5"
                            style="padding: 1rem" v-model="formData.username" @keyup.enter="login" :disabled="status" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <InputText id="password" class="w-full mb-3" placeholder="Password"
                            :type="seepassword ? 'text' : 'password'" v-model="formData.password"
                            :inputStyle="{ padding: '1rem' }" @keyup.enter="login" :disabled="status" />

                        <!-- <Password id="password1" v-model="formData.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password> -->
                        <div class="flex flex-column">
                            <label>Show password</label>
                            <Checkbox v-model="seepassword" :binary=true id="seepassword" :disabled="status" />
                        </div>
                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                        </div>
                        <div v-if="!status">
                            <Button label="Sign In" class="w-full p-3 text-xl" @click="login"></Button>
                        </div>
                        <div v-else-if="status">
                            <div>
                                <label style="color: #5034bb;">Sistemde kayıtlı kullanıcı yok.<br>
                                    Lütfen alttakibutona tıklayarak hesap oluşturma panelini açın</label>
                            </div>
                            <Button label="Register" class="w-full p-3 text-xl"
                                @click="registerforfirst = true"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Toast />
        <Dialog v-model:visible="registerforfirst" modal header="Register for first user(DONT CLOSE)">
            <div class="flex flex-column">
                <label> Username</label>
                <InputText v-model="register.username" />
            </div>
            <div class="flex flex-column">
                <label>Password</label>
                <InputText v-model="register.password" />
            </div>
            <div class="mt-2">
                <Button label="Register" @click="firstregister" icon="pi pi-plus"></Button>
            </div>
        </Dialog>
    </div>
</template>

<style scoped lang="scss">
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}

.surface-ground {
    background-color: transparent !important;
    transition: background-color 0.3s ease-in-out;
}
</style>
