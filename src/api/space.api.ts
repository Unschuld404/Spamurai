import { useAuthStore } from '@/stores/auth.ts'
import { ensureOk } from '@/api/httpError.ts'
import type { Space } from '@/types/space.type.ts'

const baseUrl = 'https://api.blackserver.de/spamurai'

export async function getSpaces(): Promise<Space[]> {
  const auth = useAuthStore()

  const res = await fetch(`${baseUrl}/space`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  await ensureOk(res, 'Spaces konnten nicht geladen werden.', `GET ${baseUrl}/space`)

  return (await res.json()) as Space[]
}

export async function addEmailToSpace(emailId: number, spaceId: number): Promise<void> {
  const auth = useAuthStore()

  const res = await fetch(`${baseUrl}/email/${emailId}/space/${spaceId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  await ensureOk(
    res,
    'Space konnte nicht zugewiesen werden.',
    `PUT ${baseUrl}/email/${emailId}/space/${spaceId}`,
  )
}

export async function removeEmailFromSpace(emailId: number, spaceId: number): Promise<void> {
  const auth = useAuthStore()

  const res = await fetch(`${baseUrl}/email/${emailId}/space/${spaceId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  await ensureOk(
    res,
    'Space konnte nicht entfernt werden.',
    `DELETE ${baseUrl}/email/${emailId}/space/${spaceId}`,
  )
}
