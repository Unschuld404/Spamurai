export interface Host {
  id: number
  caption: string
  prefix: Prefix[]
  domain: Domain[]
}

export interface Prefix {
  id: number
  name: string
}

export interface Domain {
  id: number
  name: string
}
