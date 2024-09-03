<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        icon: 'home',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-users',
                to: 'home'
            },
            {
                label: 'Employeer-Management',
                icon: 'pi pi-users ',
                to: 'Employeer-Management'
            }
        ]
    },
    {
        label: 'Departmant Management',
        icon: '',
        items: [
            {
                label: 'Departmant',
                icon: 'pi pi-briefcase',
                to: '/departmant/departmant-management'

            }
        ]
    },
    {
        label: 'Reports',
        icon: '',
        items: [
            {
                label: 'Average and Total Salary Report',
                icon: 'pi pi-chart-line',
                to: '/Report/average-and-salary-report'
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <!-- <li>
            <a href="https://www.primefaces.org/primeblocks-vue/#/" target="_blank">
                <img src="/layout/images/banner-primeblocks.png" alt="Prime Blocks" class="w-full mt-3" />
            </a>
        </li> -->
    </ul>
</template>

<style lang="scss" scoped></style>
