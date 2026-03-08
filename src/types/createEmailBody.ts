export interface CreateEmailBody {
  prefix_id: number | undefined;
  name: string;
  domain_id: number | undefined;
  password?: string;
  comment?: string;
}

export interface CreateEmailBodySuccess {
  id: number
  email: string
}
