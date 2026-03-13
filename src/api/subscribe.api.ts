import { useAuthStore } from '@/stores/auth.ts'

export async function subscribe(emailId: number, target?: string | number) {
  const auth = useAuthStore()
  const suffix = target === undefined ? '' : `/${encodeURIComponent(String(target))}`
  const url = `https://api.blackserver.de/spamurai/email/${emailId}/activate${suffix}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  if (!res.ok) {
    throw new Error('Aktivieren des Targets fehlgeschlagen')
  }
}

export async function unsubscribe(emailId: number, target?: string | number) {
  const auth = useAuthStore()
  const suffix = target === undefined ? '' : `/${encodeURIComponent(String(target))}`
  const url = `https://api.blackserver.de/spamurai/email/${emailId}/deactivate${suffix}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
  })

  if (!res.ok) {
    throw new Error('Deaktivieren des Targets fehlgeschlagen')
  }
}
