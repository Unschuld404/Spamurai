import { useAuthStore } from '@/stores/auth.ts'
import type { Domain } from '@/types/domain.type.ts'

const url = 'https://api.blackserver.de/spamurai/domain'

export async function getDomains(): Promise<Domain[]> {
  const auth = useAuthStore()

  const res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(
      `GET /domain failed (${res.status}) ${res.statusText}${body ? ` — ${body}` : ''}`,
    )
  }

  return (await res.json()) as Domain[]
}
