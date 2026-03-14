import { useAuthStore } from '@/stores/auth.ts'
import { ensureOk } from '@/api/httpError.ts'
import type { User } from '@/types/user.type.ts'

const url = 'https://api.blackserver.de/spamurai/user'
const listUrl = 'https://api.blackserver.de/spamurai/user/list'

export async function getUser(): Promise<User> {
  const auth = useAuthStore()

  const res = await fetch(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    }
  })

  await ensureOk(res, 'Nutzerprofil konnte nicht geladen werden.', `GET ${url}`)

  return (await res.json()) as User
}

export async function getUserList(): Promise<User[]> {
  const auth = useAuthStore()

  const res = await fetch(listUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  await ensureOk(res, 'Nutzerliste konnte nicht geladen werden.', `GET ${listUrl}`)

  return (await res.json()) as User[]
}
