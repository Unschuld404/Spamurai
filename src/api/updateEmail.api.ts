import { useAuthStore } from '@/stores/auth.ts'
import type { SaveEmailPayload } from '@/types/email.type.ts'

const url = 'https://api.blackserver.de/spamurai/email'

export async function updateEmail(data: SaveEmailPayload): Promise<void> {
  const auth = useAuthStore()

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('POST /email fehlgeschlagen')
  }
}
