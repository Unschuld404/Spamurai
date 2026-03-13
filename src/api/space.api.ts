import { useAuthStore } from '@/stores/auth.ts'
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

  if (!res.ok) {
    throw new Error('Spaces konnten nicht geladen werden')
  }

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

  if (!res.ok) {
    throw new Error('Space konnte nicht zugewiesen werden')
  }
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

  if (!res.ok) {
    throw new Error('Space konnte nicht entfernt werden')
  }
}
