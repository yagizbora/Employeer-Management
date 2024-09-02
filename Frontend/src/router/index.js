import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            redirect:'home',
            children: [
                {
                    path: 'home',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: 'Employeer-Management',
                    name: 'Employeer management',
                    component: () => import('@/views/pages/EmployeerManagement/EmployeerManagement.vue')
                }
            ]
        },
        {
            path: '/',
            component: AppLayout,
            name: 'departmant',
            children: [
                {
                    path: 'departmant-management',
                    name: 'Departmant management',
                    component: () => import('@/views/pages/Departmant/Departmant.vue')
                }
            ]
        },
        {
            path: '/',
            component: AppLayout,
            name: 'Report',
            children: [
                {
                    path: 'average-and-salary-report',
                    name: 'Average and Total Salary Report',
                    component: () => import('@/views/pages/SalaryReport/SalaryReport.vue')
                }
            ]
        }
        // {
        //     path: '/auth',
        //     name: 'login',
        //     component: AppLayout,
        //     children: [
        //         {
        //             path: '/login',
        //             name: 'login',
        //             component: () => import('@/views/Auth/Login.vue')
        //         }
        //     ]
        // }
    ]
});

export default router;
