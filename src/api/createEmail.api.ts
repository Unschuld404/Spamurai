import {useAuthStore} from '@/stores/auth.ts'
import type { CreateEmailBody, CreateEmailBodySuccess } from '@/types/createEmailBody.ts'


const url = 'https://api.blackserver.de/spamurai/email'

export async function createEmail(data: CreateEmailBody): Promise<CreateEmailBodySuccess> {
  const auth = useAuthStore()

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(auth.token ? { Authorization: `Bearer ${auth.token}` } : {}),
    },
    body: JSON.stringify(data),
  })

  if (res.status === 400) {
    const message = await res.text()
    throw new Error(message || 'Ungültiges Dateiformat')
  }

  if (!res.ok) {
    throw new Error('POST /email fehlgeschlagen')
  }

  return (await res.json()) as CreateEmailBodySuccess
}
