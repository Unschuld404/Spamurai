import { useAuthStore } from '@/stores/auth.ts'
import type { Target } from '@/types/target.type.ts'

const url = 'https://api.blackserver.de/spamurai/target'

export async function getTargets(): Promise<Target[]> {
  const auth = useAuthStore()

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  if (!res.ok) {
    throw new Error('Fehler bei: Ziele finden.')
  }

  return (await res.json()) as Target[]
}

export async function getTarget(): Promise<Target[]> {
  return getTargets()
}

export async function createTarget(payload: {
  address: string
  caption?: string
}): Promise<{ id: number }> {
  const auth = useAuthStore()

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error('Externes Target konnte nicht gespeichert werden')
  }

  return (await res.json()) as { id: number }
}

export async function deleteTarget(targetId: number): Promise<void> {
  const auth = useAuthStore()

  const res = await fetch(`${url}/${targetId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  if (!res.ok) {
    throw new Error('Target konnte nicht entfernt werden')
  }
}
