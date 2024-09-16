<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

import NotesService from "@/service/NotesService"
const noteservice = new NotesService()

const importantnote = ref(false);

const importantnotes = async () => {
    try {
        const response = await noteservice.notesimportant();

        if (response.data && response.data.important_notes === true) {
            importantnote.value = true; // Burada .value ile reaktif değeri güncelliyoruz
            console.log('Important Notes Found!');
        } else if (response.data && response.data.important_notes === false) {
            importantnote.value = false; // Burada da false olarak ayarlıyoruz
            console.log('No Important Notes.');
        }

    } catch (error) {
        console.error('Error fetching important notes:', error);
    }
};

onMounted(() => {
    importantnotes()
})

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
//     topbarMenuActive.value = false;
//     router.push('/documentation');
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
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/home" class="layout-topbar-logo">
            <!-- <img :src="logoUrl" alt="logo" /> -->
            <span>EmployeerManagement</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <div v-if="importantnote">
                <RouterLink to="/notes/notes">
                    <Button label="You have an important note!" class="p-button-warning"
                        icon="pi pi-exclamation-triangle" />
                </RouterLink>
            </div>
            <div v-else>
                <div>
                    <label class="flex flex-column">
                        <i class="pi pi-thumbs-up-fill" style="font-size: 2rem" />
                        <span>Important note is not found</span>
                    </label>
                </div>
            </div>
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
            <!-- <button @click="onSettingsClick()" class="p-link layout-topbar-button">
                <i class="pi pi-cog"></i>
                <span>Settings</span>
            </button> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>
