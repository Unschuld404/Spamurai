import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('@/views/LoginView.vue') },
    { path: '/admin', component: () => import('@/views/AdminView.vue') },
    { path: '/add-new', component: () => import('@/views/AddEmailView.vue')},
  ],
})

router.beforeEach((to) => {
   if (to.meta.requiresAuth && !localStorage.getItem('auth')) return '/login'
 })

export default router
