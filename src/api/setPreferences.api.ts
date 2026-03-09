import { useAuthStore } from '@/stores/auth.ts'
import type { Preferences} from '@/types/preferences.type.ts'

const url = 'https://api.blackserver.de/spamurai/preferences'

export async function setPreferences(
  data: object
) {
  const auth = useAuthStore()

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) throw new Error(res.statusText)

  return await res.json() as Preferences
}
