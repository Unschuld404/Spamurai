export interface EmailTarget {
  id: number
  user_id?: number | null
  active?: boolean
  address?: string | null
  email?: string | null
  caption?: string | null
  name?: string | null
}

export interface EmailSharedUser {
  id: number
  name: string | null
  email: string | null
  caption: string
}

export interface EmailSpaceMember {
  id: number
  name: string | null
  email: string | null
  caption: string
}

export interface EmailSpace {
  id: number
  name: string
  users?: EmailSpaceMember[]
}

export interface Email {
  email_id: number
  email: string
  active: boolean
  owner_id?: number | null
  in_space?: boolean
  is_shared: boolean
  has_target: boolean
  is_owner: boolean
  password: string | null
  comment: string
  targets: EmailTarget[]
  shared: EmailSharedUser[]
  spaces: EmailSpace[]
}

export interface SaveEmailPayload {
  id: number
  password: string | null
  comment: string
}
