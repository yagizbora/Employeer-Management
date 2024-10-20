<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
const toast = useToast();


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


const importantNotes = ref([]);

const checkImportantNotes = () => {
    const notes = localStorage.getItem('important_notes');
    if (notes) {
        importantNotes.value = JSON.parse(notes); 
        toast.add({ severity: 'secondary', summary: 'Warning!', detail: 'You have an important note!', life: 2000 });
    } else {
        importantNotes.value = [];
    }
};

let interval = null;

onMounted(() => {
    checkImportantNotes();

    interval = setInterval(checkImportantNotes, 10000);
});

onBeforeUnmount(() => {
    clearInterval(interval);
});


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
 const onSettingsClick = () => {
     topbarMenuActive.value = true;
 };
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

const settings = [
    {
        label: '',
        icon: 'pi pi-cog',
        items: [
            {
                label: 'Log out',
                icon: 'pi pi-sign-out',
                command: () => {
                    localStorage.clear()
                    router.push('/auth/login');
                }
            }
        ]
    }
];
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
            <PanelMenu class="w-full" :model="settings" icon="pi pi-cog" raised text severity="info" />
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
