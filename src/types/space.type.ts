export interface SpaceMember {
  id: number
  name: string | null
  email: string | null
  caption: string
}

export interface Space {
  id: number
  name: string
  users?: SpaceMember[]
}
