import {useAuthStore} from '@/stores/auth.ts'
import type {Prefix} from '@/types/prefix.types.ts'

const baseUrl = 'https://api.blackserver.de/spamurai/host'

export async function getPrefix(hostId: number): Promise<Prefix[]> {
  const auth = useAuthStore()

  const res = await fetch(`${baseUrl}/${hostId}/prefix`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(
      `GET /prefix/${hostId} failed (${res.status}) ${res.statusText}${body ? ` — ${body}` : ''}`,
    )
  }

  return (await res.json()) as Prefix[]
}
