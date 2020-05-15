import { Client } from './Client.model';
export class Review {
  constructor(
    public carKey,
    public stars: number,
    public comment: string,
    public client: Client,
    public createdAt: string
  ) {}
}
