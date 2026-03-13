import { useAuthStore } from '@/stores/auth.ts'

const baseUrl = 'https://api.blackserver.de/spamurai'

export async function addEmailShare(emailId: number, userId: number): Promise<void> {
  const auth = useAuthStore()

  const res = await fetch(`${baseUrl}/email/${emailId}/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  if (!res.ok) {
    throw new Error('Freigabe konnte nicht hinzugefuegt werden')
  }
}

export async function removeEmailShare(emailId: number, userId: number): Promise<void> {
  const auth = useAuthStore()

  const res = await fetch(`${baseUrl}/email/${emailId}/user/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  if (!res.ok) {
    throw new Error('Freigabe konnte nicht entfernt werden')
  }
}
