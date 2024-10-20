import { createRouter, createWebHistory } from 'vue-router';
import NotesService from "@/service/NotesService"
const noteservice = new NotesService()
import AppLayout from '@/layout/AppLayout.vue';
import { resolveComponent } from 'vue';

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
                   component: () => import('@/views/pages/Users/Users.vue')
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
                }
            ]
        }
    ]
});

// router.beforeEach(async (to, from, next) => {
//     // Kullanıcının login olup olmadığını kontrol etmek için token'a bakıyoruz
//     const token = localStorage.getItem('token');

//     if (token) {
//         // Kullanıcı login ise önemli notları kontrol et
//         const checkImportantNotes = async () => {
//             try {
//                 const response = await noteservice.notesimportant();
//                 if (response.status === 200) {
//                     localStorage.setItem('important_notes', JSON.stringify(response.data.important_notes));
//                 }
//             } catch (error) {
//                 console.error("Error fetching important notes:", error);
//             }
//         };

//         await checkImportantNotes();
//     }

//     next(); // İşlem tamamlandıktan sonra yönlendirme devam ediyor
// });



export default router;
