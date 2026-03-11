import { useAuthStore } from '@/stores/auth.ts'

export async function subscribe(emailId: number) {

  const auth = useAuthStore()
  const url = `https://api.blackserver.de/spamurai/email/${emailId}/activate`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {})
    }
  })
}

export async function unsubscribe(emailId: number) {
  const auth = useAuthStore()
  const url = `https://api.blackserver.de/spamurai/email/${emailId}/deactivate`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })
}
