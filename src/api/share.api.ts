import { useAuthStore } from '@/stores/auth.ts'
import { ensureOk } from '@/api/httpError.ts'

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

  await ensureOk(
    res,
    'Freigabe konnte nicht hinzugefuegt werden.',
    `PUT ${baseUrl}/email/${emailId}/user/${userId}`,
  )
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

  await ensureOk(
    res,
    'Freigabe konnte nicht entfernt werden.',
    `DELETE ${baseUrl}/email/${emailId}/user/${userId}`,
  )
}
