import { City } from './City.model';

export class Client {
  public profil: string = 'assets/img/avatar/avatar_profile.png';
  public clientKey: string;
  constructor(
    public firstname?: string,
    public lastname?: string,
    public phone?: string,
    public city?: City,
    public adresse?: string,
    public email?: string,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
