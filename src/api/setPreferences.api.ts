import { useAuthStore } from '@/stores/auth.ts'
import type { Preferences} from '@/types/preferences.type.ts'

const url = 'https://api.blackserver.de/spamurai/preferences'

export async function setPreferences(
  default_domain_id: number,
  default_prefix_id: number
) {
  const auth = useAuthStore()

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
    body: JSON.stringify({
      default_domain_id,
      default_prefix_id
    }),
  })

  if (!res.ok) throw new Error(res.statusText)

  return await res.json() as Preferences
}
