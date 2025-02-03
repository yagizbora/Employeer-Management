<script setup>
import axios from 'axios';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { IMG_BASE_URL } from "@/utils/helper.js";
import Swal from 'sweetalert2';
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
// import NotesService from "@/service/NotesService"
// const noteservice = new NotesService()
import UserService from '@/service/UsersService.js';
const usersservice = new UserService()
const toast = useToast();
const confirm = useConfirm();
const API_URL = import.meta.env.VITE_API_URL;


// import NotesService from "@/service/NotesService"
// const noteservice = new NotesService()

// const importantnote = ref(false);

// const importantnotes = async () => {
//     try {
//         const response = await noteservice.notesimportant();

//         if (response.data && response.data.important_notes === true) {
//             importantnote.value = true; // Burada .value ile reaktif değeri güncelliyoruz
//             console.log('Important Notes Found!');
//         } else if (response.data && response.data.important_notes === false) {
//             importantnote.value = false; // Burada da false olarak ayarlıyoruz
//             console.log('No Important Notes.');
//         }

//     } catch (error) {
//         console.error('Error fetching important notes:', error);
//     }
// };



// onMounted(() => {
//     importantnotes()
// })


const photoprofile = ref({})
const profilephoto = async () => {
    if (localStorage.getItem('user_id') === null) {
        // pass
    }
    else {
        const response = await usersservice.profilephoto({
            user_id: localStorage.getItem('user_id')
        })  
        photoprofile.value = response.data.data
    }
}

onMounted(() => {
    profilephoto()
    setInterval(profilephoto, 80000)
})

//

const checkImportantNotes = async () => {
    const token = localStorage.getItem('token');

    // Eğer token yoksa localStorage'ı temizle ve login'e yönlendir
    if (!token) {
        localStorage.clear();
        window.location.href = '/auth/login';
        return;
    }

    try {
        const response = await axios.get(`${API_URL}notesimportant`, {
            headers: {
                "Content-type": "application/json;charset=UTF-8",
                token: localStorage.getItem("token"),
                user_id: localStorage.getItem("user_id")
            }
        });

        if (response.status === 200) {
            const importantNotes = response.data.important_notes;
            localStorage.setItem('important_notes', JSON.stringify(importantNotes));

            if (importantNotes) {
                toast.add({
                    severity: 'secondary',
                    summary: 'Warning!',
                    detail: 'You have an important note!',
                    life: 1500
                });
            }
        }
    } catch (error) {
        console.error(error)
    }
};

// Örneğin Topbar bileşeninde onMounted çağrılabilir
onMounted(() => {
    checkImportantNotes();

    // Örneğin 100 saniyede bir kontrol etmek için
    setInterval(checkImportantNotes, 1000000);
});

// CHANGE PASSWORD AREA

const username = ref({})

const usernamecheck = () => {
    const data = localStorage.getItem('username')
    username.value = data
}

onMounted(() => {
    usernamecheck();
})

const changepassworddialog = ref(false)
const password_ = ref({})
const seepassword = ref(false)
const changepassword = async () => {
    let id;
    const getuserid = localStorage.getItem('user_id');
    id = getuserid;
    try {
        console.log("Password:", password_.value.Password);
        console.log("Confirm Password:", password_.value.confirmPassword);

        if (password_.value.Password !== password_.value.confirmPassword) {
            toast.add({ severity: 'warn', summary: 'Warning!', detail: 'Passwords do not match', life: 5000 });
        } else if (!password_.value.Password || !password_.value.confirmPassword) {
            toast.add({ severity: 'warn', summary: 'Warning!', detail: 'Please write passwords', life: 5000 });
        }
        else if (password_.value.Password.length < 8) {
            toast.add({ severity: 'warn', summary: 'Warning!', detail: 'Password must be at least 8 characters long', life: 5000 });
        }
        else {
            const response = await usersservice.changepassword({ id: id, password: password_.value.Password });
            if (response) {
                changepassworddialog.value = false;
                // toast.add({ severity: 'success', summary: 'Success!', detail: 'Password changed successfully, you will be redirected to the login page', life: 4000 })
                toast.add({ severity: 'success', summary: 'Success!', detail: response.data.message + '. You will be redirected to the login page', life: 4000 })
                setTimeout(() => {
                    router.push('/auth/login'); localStorage.clear();
                }, 3000);
                password_.value = {};
            }
        }
    } catch (error) {
        console.error("Error changing password:", error);
        toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error changing your password', life: 5000 });
    }
};
//



// CHANGE USERNAME AREA
const username_ = ref({});

const changeusernamedialog = ref(false)

const changeusername = async () => {
    let id;
    const getuserid = localStorage.getItem('user_id');
    id = getuserid;
    try {
        if (!username_.value.username || !username_.value.confirmusername) {
            toast.add({ severity: 'warn', summary: 'Warning!', detail: 'Please write usernames', life: 5000 });
        }
        else if (username_.value.username !== username_.value.confirmusername) {
            toast.add({ severity: 'warn', summary: 'Warning!', detail: 'Usernames do not match', life: 5000 });
        }
        else if (username_.value.username.length < 2) {
            toast.add({ severity: 'warn', summary: 'Warning!', detail: 'Username must be at least 2 characters long', life: 5000 });
        }
        else {
            const response = await usersservice.changeusername({ id: id, username: username_.value.username });
            if (response) {
                changeusernamedialog.value = false;
                toast.add({
                    severity: 'success',
                    summary: 'Success!',
                    detail: response.data.message + '. You will be redirected to the login page',
                    life: 4000
                });
                setTimeout(() => {
                    router.push('/auth/login'); localStorage.clear();
                }, 3000);
                username_.value = {};
                localStorage.clear()
            }
        }
    } catch (error) {
        toast.add({ severity: 'danger', summary: 'Error', detail: error?.response?.data?.message || "Something is broked", life: 5000 });
    }
}
//

// CHANGE NAME SURNAME AREA
const changeNameSurnameDialog = ref(false)
const nameSurname_ = ref({})


const changeNameSurname = async () => {
    try {
        if (!nameSurname_.value.name || !nameSurname_.value.surname) {
            toast.add({ severity: 'warn', summary: 'Warning!', detail: 'Please write name and surname', life: 5000 });
        }
        else if (nameSurname_.value.name.length < 2) {
        }
        else if (nameSurname_.value.surname.length < 2) {
        }
        else {
            const response = await usersservice.usersurnamechange({
                ...nameSurname_.value,
                id: localStorage.getItem('user_id')
            })
            if (response) {
                changeNameSurnameDialog.value = false;
                toast.add
                    ({
                        severity: 'success',
                        summary: 'Success!',
                        detail: response.data.message,
                        life: 4000
                    });
            }
        }
    }
    catch (error) {
        console.error("Error changing name and surname:", error);
        toast.add({ severity: 'danger', summary: 'Error', detail: error?.response?.data?.message || "Something is broked", life: 5000 });
    }
}
//

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
// const onSettingsClick = () => {
//     topbarMenuActive.value = true;
// };
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

// const settings = [
//     {
//         label: '',
//         icon: 'pi pi-cog',
//         items: [
//             {
//                 label: 'Log out',
//                 icon: 'pi pi-sign-out',
//                 command: () => {
//                     localStorage.clear()
//                     router.push('/auth/login');
//                 }
//             },
//             {
//                 label: 'Change Password',
//                 icon: 'pi pi-lock',
//                 command: () => {
//                     changepassworddialog.value = true;
//                 }
//             },
//             {
//                 label: 'Change Username',
//                 icon: 'pi pi-user',
//                 command: () => {
//                     changeusernamedialog.value = true;
//                 }
//             }
//         ]
//     }
// ];


const confirmlogout = () => {
    Swal.fire({
        title: 'Are you sure you want to log out?',
        text: 'You will be logged out of the application.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, log out!'
    }).then((result) => {
        if (result.isConfirmed) {
            logoutcontrol()
        }
    })
}


const logoutcontrol = async (data) => {
    try {
        const user_id = localStorage.getItem('user_id');
        const response = await usersservice.logout({ user_id: user_id });
        if (response.status = 200) {
            toast.add({ severity: 'info', summary: 'Warn!', detail: response.data.message + '. ' + "You'll redirect to Login page", life: 5000 });
            setTimeout(() => {
                localStorage.clear()
                router.push('/auth/login');
            }, 5000)

        }
    }
    catch (e) {
        console.error('Error logging out:', e);
        toast.add({ severity: 'error', summary: 'Error!', detail: 'Failed to log out' + response.data.message, life: 5000 });
    }


}

const settings = ref([
    {
        label: 'Change Password',
        icon: 'pi pi-lock',
        command: () => {
            changepassworddialog.value = true;
        }
    },
    {
        label: 'Change Username',
        icon: 'pi pi-user',
        command: () => {
            changeusernamedialog.value = true;
        }
    },
    {
        label: 'Log out',
        icon: 'pi pi-sign-out',
        command: () => {
            confirmlogout()
        }
    },
    {
        label: 'Change Name and surname',
        icon: 'pi pi-pencil',
        command: () => {
            changeNameSurnameDialog.value = true;
        }
    }
]);
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/home" class="layout-topbar-logo">
            <!-- <img :src="logoUrl" alt="logo" /> -->
            <span>Employeer Management</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <!-- <div v-if="importantNotes">
                <RouterLink to="/notes/notes">
                    <Button label="You have an important note!" rounded class="p-button-warning"
                        icon="pi pi-exclamation-triangle" />
                </RouterLink>
            </div> -->
            <!-- <button @click=" onTopBarMenuButton()" class="p-link layout-topbar-button">
                    <i class="pi pi-calendar"></i>
                    <span>Calendar</span>
                    </button>
                    <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button> -->
            <!-- <button class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button>             -->
            <!-- <Button @click="onSettingsClick()" class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </Button>          
             -->
            <Toast />
            <ConfirmDialog></ConfirmDialog>
            <TabMenu class="w-full settings-menu" :model="settings" icon="pi pi-cog" raised text severity="info"
                :style="{ width: '25rem' }" />
        </div>

        <div class="profilephoto-wrapper">
            <Image width="75" class="profilephoto" :src="photoprofile.image_path && photoprofile.image_path.trim() !== '' ?
                `${IMG_BASE_URL}${photoprofile.image_path.replace(/\\/g, '/')}`
                : 'https://via.placeholder.com/150'" alt="Profile Photo" preview />
        </div>
        <Dialog modal v-model:visible="changeNameSurnameDialog" header="Change name and surname">
            <div class="">
                <div class="flex flex-column">
                    <label for="name">Name</label>
                    <InputText v-model.trim="nameSurname_.name" id="name" placeholder="Name" />
                </div>
                <div class="flex flex-column">
                    <label for="surname">Surname</label>
                    <InputText v-model.trim="nameSurname_.surname" id="surname" placeholder="Surname" />
                </div>
                <div class="mt-2">
                    <div>
                        <Button label="Change name surname" @click="changeNameSurname"></Button>
                    </div>
                </div>
            </div>

        </Dialog>
        <!-- CHANGE PASSWORD DIALOG START -->
        <Dialog modal v-model:visible="changepassworddialog" :header="'Change Password ' + username"
            :style="{ width: '25rem' }">
            <div>
                <div class="">
                    <div class="flex flex-column">
                        <label for="newPassword">New Password:</label>
                        <InputText v-model="password_.Password" :type="seepassword ? 'text' : 'password'"
                            id="newPassword" />
                    </div>
                    <div class="flex flex-column">
                        <label for="confirmnewPassword">Confirm New Password:</label>
                        <InputText v-model="password_.confirmPassword" :type="seepassword ? 'text' : 'password'"
                            id="confirmnewPassword" />
                    </div>
                    <div class="flex flex-column">
                        <label>Show password</label>
                        <Checkbox v-model="seepassword" :binary=true id="seepassword" />
                    </div>
                    <div class="mt-2">
                        <Button @click="changepassword" icon="pi pi-pencil" severity="secondary"
                            label="Change Password" />
                    </div>
                </div>
            </div>
        </Dialog>
        <!-- CHANGE PASSWORD DIALOG END -->

        <!--CHANGE USERNAME DIALOG START -->
        <Dialog modal v-model:visible="changeusernamedialog" :header="'Change password ' + username">
            <div>
                <div class="">
                    <div class="flex flex-column">
                        <label for="oldPassword">New username:</label>
                        <InputText v-model.trim="username_.username" id="oldPassword" />
                    </div>
                    <div class="flex flex-column">
                        <label for="newPassword">Confirm username:</label>
                        <InputText v-model.trim="username_.confirmusername" id="newPassword" />
                    </div>
                    <div class="mt-2">
                        <Button @click="changeusername" icon="pi pi-pencil" severity="secondary"
                            label="Change Username" />
                    </div>
                </div>
            </div>
        </Dialog>
        <!--  -->
    </div>
</template>

<style lang="scss" scoped>
.settings-menu {
    width: 100%;
}

.profilephoto-wrapper {
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.profilephoto-wrapper .profilephoto {
    border-radius: 50%;
    height: 100px;
    width: 100px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
