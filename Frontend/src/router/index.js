import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHistory(), // createWebHashHistory() yerine
    routes: [
        {
            path: '/',
            component: AppLayout,
            redirect: 'home',
            children: [
                {
                    path: 'home',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: 'Employeer-Management',
                    name: 'employeer-management',
                    component: () => import('@/views/pages/EmployeerManagement/EmployeerManagement.vue')
                }
            ]
        },
        {
            path: '/departmant',
            component: AppLayout,
            children: [
                {
                    path: 'departmant-management',
                    name: 'departmant-management',
                    component: () => import('@/views/pages/Departmant/Departmant.vue')
                }
            ]
        },
        {
            path: '/report',
            component: AppLayout,
            children: [
                {
                    path: 'average-and-salary-report',
                    name: 'average-salary-report',
                    component: () => import('@/views/pages/SalaryReport/SalaryReport.vue')
                }
            ]
        },
        {
            path: '/order',
            component: AppLayout,
            children: [
                {
                    path: 'order-management',
                    name: 'order-management',
                    component: () => import('@/views/pages/Order/Order.vue')
                },
                {
                    path: 'create-order',
                    name: 'create-order',
                    component: () => import('@/views/pages/Order/CreateOrder/CreateOrder.vue')
                }
            ]
        },
        {
            path: '/complaint',
            component: AppLayout,
            children:
            [
                {
                    path: 'complaint',
                    name: 'complaint',
                    component: () => import('@/views/pages/Complaint/Complaint.vue')
                }
            ]
        },
        {
            path: '/auth',
            children: [
                {
                    path: 'login',
                    name: 'auth-login',
                    component: () => import('@/views/pages/Auth/Login.vue')
                }
            ]
        }
    ]
});

export default router;
