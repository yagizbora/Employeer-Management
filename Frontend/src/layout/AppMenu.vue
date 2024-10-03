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
                to: '/home'  // Güncellendi
            },
            {
                label: 'Employeer Management',  // İsim düzenlendi
                icon: 'pi pi-users',
                to: '/Employeer-Management'  // Güncellendi
            }
        ]
    },
    {
        label: 'Customer',
        icon: 'pi pi-user',
        items: [
            {
                label: 'Customers',
                icon: 'pi pi-users',
                to: '/customer/customer'
            },
            {
                label: 'Create Customer',
                icon: 'pi pi-plus',
                to: '/customer/create-customer'  
            }
        ]
    },
    {
        label: 'Projects',
        icon: 'pi pi-calendar',
        items: [
            {
                label: 'Project List',
                icon: 'pi pi-list',
                to: '/projects'
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
                to: '/report/average-and-salary-report'  // Güncellendi
            }
        ]
    },
    {
        label: 'Order',
        icon: '',
        items: [
            {
                label: 'Order List',
                icon: 'pi pi-list',
                to: '/order/order-management'
            }
        ]
    },
    {
        label: 'Complaint',
        icon: '',
        items: [
            {
                label: 'Complaint List',
                icon: 'pi pi-list',
                to: '/complaint/complaint'
            },
            {
                label: 'Complaint Create',
                icon: 'pi pi-plus',
                to: '/complaint/create-complaint',
            }
        ]
    },
    {
        label: 'Notes',
        icon: '',
        items: [
            {
                label: 'Notes List',
                icon: 'pi pi-book',
                to: '/notes/notes'
            },
            {
                label: 'Create Notes',
                icon: 'pi pi-book',
                to: '/notes/create-notes'
            }
        ]
    },
    {
        label: 'Request Management',
        icon: '',
        items: [
            {
                label: 'Request List',
                icon: 'pi pi-list',
                to: '/need/need-management'
            }
        ]    
    },
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
