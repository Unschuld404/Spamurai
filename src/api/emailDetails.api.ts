import { useAuthStore } from '@/stores/auth.ts'
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

  if (!res.ok) {
    throw new Error(
      `Failed to get email details for email ${emailId}`
    )
  }

  return  (await res.json()) as Email
}
