export interface Host {
  id: number
  caption: string
  prefix: Prefix[]
  domain: Domain[]
}

interface Prefix {
  id: number
  name: string
}

interface Domain {
  id: number
  name: string
}
