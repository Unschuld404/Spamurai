import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import Login from '@/components/Login.vue'
import Search from '@/components/Search.vue'
import InviteUser from '@/components/InviteUser.vue'
import NewEmail from '@/components/NewEmail.vue'
import UserSettings from '@/components/UserSettings.vue'
import EmailDetails from '@/components/EmailDetails.vue'
import EmailDetailsProvided from '@/components/EmailDetailsProvided.vue'

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
