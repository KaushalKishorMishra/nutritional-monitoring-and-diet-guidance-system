export interface Token {
  id?: number;
  purpose: string;
  expires_in: Date;
  value: string;
  userId: number;
}
