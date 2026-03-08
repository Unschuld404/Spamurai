import { useAuthStore } from '@/stores/auth.ts'
import type { Preferences } from '@/types/preferences.type.ts'

const url = 'https://api.blackserver.de/spamurai/preferences'

export async function getPreferences(): Promise<Preferences> {
  const auth = useAuthStore()

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` }: {}),
    }
  })

  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return (await res.json()) as Preferences
}
