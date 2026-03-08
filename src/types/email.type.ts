export interface Email {
  email_id: number
  email: string
  active: boolean
  in_space: boolean
  is_shared: boolean
  has_target: boolean
  is_owner: boolean
  password: string
  comment: string
  targets: Target[]
  shared: User[]
}

interface Target {
  user_id: number
  address: string
  id: number;
}

interface User {
  id: number
  name: string
  email: string
  caption: string
}
