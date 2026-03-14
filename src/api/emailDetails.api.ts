import { useAuthStore } from '@/stores/auth.ts'
import { ensureOk } from '@/api/httpError.ts'
import type { Email } from '@/types/email.type.ts'

const url = 'https://api.blackserver.de/spamurai/email'

export async function getEmailDetails(emailId: number | null): Promise<Email> {
  const auth = useAuthStore()

  const res = await fetch(`${url}/${emailId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  await ensureOk(res, 'E-Mail-Details konnten nicht geladen werden.', `GET ${url}/${emailId}`)

  return (await res.json()) as Email
}
