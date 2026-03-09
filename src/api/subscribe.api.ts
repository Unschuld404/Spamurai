import { useAuthStore } from '@/stores/auth.ts'

export async function subscribe(emailId: number, targetID: number) {

  const auth = useAuthStore()
  const url = `https://api.blackserver.de/spamurai/email/${emailId}/activate/${targetID}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {})
    }
  })
}
