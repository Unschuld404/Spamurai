import { useAuthStore } from '@/stores/auth.ts'
import { ensureOk } from '@/api/httpError.ts'

export async function subscribe(emailId: number, target?: string | number) {
  const auth = useAuthStore()
  const suffix = target === undefined ? '' : `/${String(target)}`
  const url = `https://api.blackserver.de/spamurai/email/${emailId}/activate${suffix}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  await ensureOk(res, 'Aktivieren fehlgeschlagen.', `GET ${url}`)
}

export async function unsubscribe(emailId: number, target?: string | number) {
  const auth = useAuthStore()
  const suffix = target === undefined ? '' : `/${String(target)}`
  const url = `https://api.blackserver.de/spamurai/email/${emailId}/deactivate${suffix}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  await ensureOk(res, 'Deaktivieren fehlgeschlagen.', `GET ${url}`)
}
