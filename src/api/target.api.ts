import {useAuthStore} from '@/stores/auth.ts'
import type {Target} from '@/types/target.type.ts'

const Url = 'https://api.blackserver.de/spamurai/user'

export async function getTarget(): Promise<Target[]> {
  const auth = useAuthStore()

  const res = await fetch(`${Url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {})
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => '')
    throw new Error(
      'Fehler bei: Ziele finden.'
    )
  }

  return (await res.json()) as Target[]
}
