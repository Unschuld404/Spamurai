import { useAuthStore} from '@/stores/auth.ts'
import type { Host } from '@/types/config.type.ts'

const url = 'https://api.blackserver.de/spamurai/config'

export async function getConfig(): Promise<Host[]> {
  const auth = useAuthStore()

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${auth.token}` } : {})
    }
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return (await res.json() as Host[])
}
