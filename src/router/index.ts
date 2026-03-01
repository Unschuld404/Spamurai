import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import Login from '@/views/Login.vue'
import Search from '@/views/Search.vue'
import InviteUser from '@/views/InviteUser.vue'
import NewEmail from '@/views/NewEmail.vue'
import UserSettings from '@/views/UserSettings.vue'
import EmailDetails from '@/views/EmailDetails.vue'
import EmailDetailsProvided from '@/views/EmailDetailsProvided.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/invite-user',
      name: 'Invite User',
      component: InviteUser,
    },
    {
      path: '/new-email',
      name: 'New Email',
      component: NewEmail,
    },
    {
      path: '/user-settings',
      name: 'User Settings',
      component: UserSettings,
    },
    {
      path: '/email-details',
      name: 'Email Details',
      component: EmailDetails,
    },
    {
      path: '/email-details-provided',
      name: 'Email Details Provided',
      component: EmailDetailsProvided,
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthed) {
    return { path: "/login", query: { redirect: to.fullPath}}
  }
})

export default router
