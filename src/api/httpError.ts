export class AppApiError extends Error {
  userMessage: string
  serverMessage: string | null
  status: number
  endpoint: string

  constructor(params: {
    userMessage: string
    serverMessage: string | null
    status: number
    endpoint: string
  }) {
    super(params.userMessage)
    this.name = 'AppApiError'
    this.userMessage = params.userMessage
    this.serverMessage = params.serverMessage
    this.status = params.status
    this.endpoint = params.endpoint
  }
}

function extractMessageFromObject(input: unknown): string | null {
  if (!input || typeof input !== 'object') return null

  const candidates = ['message', 'error', 'detail', 'title', 'description'] as const

  for (const key of candidates) {
    const value = (input as Record<string, unknown>)[key]
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
  }

  return null
}

function parseServerMessage(rawText: string): string | null {
  const trimmed = rawText.trim()
  if (!trimmed) return null

  try {
    const parsed = JSON.parse(trimmed) as unknown
    const extracted = extractMessageFromObject(parsed)
    if (extracted) return extracted
    return JSON.stringify(parsed)
  } catch {
    return trimmed
  }
}

export async function ensureOk(
  response: Response,
  userMessage: string,
  endpoint: string,
): Promise<void> {
  if (response.ok) return

  let serverMessage: string | null = null

  try {
    const text = await response.text()
    serverMessage = parseServerMessage(text)
  } catch {
    serverMessage = null
  }

  throw new AppApiError({
    userMessage,
    serverMessage,
    status: response.status,
    endpoint,
  })
}

export function formatErrorForDisplay(
  error: unknown,
  fallbackUserMessage: string,
): { userMessage: string; serverDetail: string | null } {
  if (error instanceof AppApiError) {
    const detail = error.serverMessage
      ? `${error.serverMessage}\n(Status ${error.status}, Endpoint ${error.endpoint})`
      : `Status ${error.status}, Endpoint ${error.endpoint}`

    return {
      userMessage: error.userMessage || fallbackUserMessage,
      serverDetail: detail,
    }
  }

  if (error instanceof Error) {
    return {
      userMessage: fallbackUserMessage,
      serverDetail: error.message || null,
    }
  }

  return {
    userMessage: fallbackUserMessage,
    serverDetail: null,
  }
}
