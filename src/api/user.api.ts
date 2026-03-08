import { useAuthStore } from '@/stores/auth.ts'
import type { User } from '@/types/user.type.ts'

const url = 'https://api.blackserver.de/spamurai/user'

export async function getUser(): Promise<User> {
  const auth = useAuthStore()

  const res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    }
  })

  if (!res.ok) {
    throw new Error(
      'Failed to get user.',
    )
  }

  return (await res.json()) as User
}
