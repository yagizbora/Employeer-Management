import { createRouter, createWebHistory } from 'vue-router';
import NotesService from "@/service/NotesService"
const noteservice = new NotesService()
import AppLayout from '@/layout/AppLayout.vue';
import { resolveComponent } from 'vue';

const router = createRouter({
    history: createWebHistory(),
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
            path: '/communaction',
            component: AppLayout,
            children: [
                {
                    path: 'listAllCommunaction',
                    name: 'communaction-history',
                    component: () => import('@/views/pages/CommunactionHistory/CommunactionHistory.vue')
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
                    },
                    {
                        path: 'create-complaint',
                        name: 'create-complaint',
                        component: () => import('@/views/pages/Complaint/CreateComplaint/CreateComplaint.vue')
                    },
                    {
                        path: 'edit-complaint/:id',
                        name: 'Edit Complaint',
                        component:() => import('@/views/pages/Complaint/EditComplaint/EditComplaint.vue')
                    }
                ]
        },
        {
            path: '/notes',
            component: AppLayout,
            children: [
                {
                    path: 'notes',
                    name: 'notes',
                    component: () => import('@/views/pages/Notes/Notes.vue')
                },
                {
                    path: 'create-notes',
                    name: 'create-notes',
                    component: () => import('@/views/pages/Notes/CreateNotes/CreateNotes.vue')
                },
                {
                    path: 'edit-notes/:id',
                    name: 'edit-notes',
                    component: () => import('@/views/pages/Notes/EditNotes/EditNotes.vue')
                }
            ]
        },
        {
            path: '/need',
            component: AppLayout,
            children: [
                {
                    path: 'need-management',
                    name: 'need-management',
                    component: () => import('@/views/pages/Need/Need.vue')
                },
                {
                    path: 'create-need',
                    name: 'create-need',
                    component: () => import('@/views/pages/Need/CreateNeed/CreateNeed.vue')
                }
            ]
        },
        {
            path: '/users',
            component: AppLayout,
            children:
            [
                {
                    path: 'users',
                    name: 'Users',
                    component: () => import('@/views/pages/Users/Users.vue'),
                       meta: {
                        requiresAdmin: true
                    }
                }
            ]
        },
        {
            path: '/customer',
            component: AppLayout,
            children: [
                {
                    path: 'customer',
                    name: 'customer',
                    component: () => import('@/views/pages/Customer/Customer.vue')
                },
                {
                    path: 'create-customer',
                    name: 'create-customer',
                    component: () => import('@/views/pages/Customer/CreateCustomer/CreateCustomer.vue')
                },
            ]
        },
        {
            path: '/projects',
            component: AppLayout,
            children: [
                {
                    path: '',
                    name: 'projects',
                    component: () => import('@/views/pages/Projects/Projects.vue')
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
                },
                {
                    path: 'error',
                    name: 'acces-denied',
                    component: () => import('@/views/pages/Auth/Access.vue')
                }
            ]
        }
    ]
});

const checkadmin = () => {
    let admin = localStorage.getItem("is_admin") === "true";
    let super_admin = localStorage.getItem("super_admin") === "true";

    return !admin && super_admin;
};



router.beforeEach((to, from, next) => {
    if (to.meta.requiresAdmin && !checkadmin()) {
        next({ name: "access-denied" }); 
    } else {
        next();
    }
});




export default router;
