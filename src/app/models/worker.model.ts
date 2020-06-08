import { Sector } from './Sector.model';
import { City } from './City.model';

export class Worker {
  public nbCars: number;
  public logo: string = 'assets/img/avatar/avatar_profile.png';
  public workerKey: string;
  constructor(
    public name: string,
    public phone: string,
    public website: string,
    public city: City,
    public sector: Sector,
    public adresse: string,
    public email: string,
    public longitude: number,
    public latitude: number,
    public accepted: boolean,
    public blocked: boolean,
    public created_at: Date,
    public updated_at: Date
  ) {}
}
