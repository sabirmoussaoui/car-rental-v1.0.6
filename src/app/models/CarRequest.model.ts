import { City } from './City.model';
import { Car } from './Car.model';
import { Client } from './Client.model';

export class CarRequest {
  carRequestKey: string;
  pick_up: Date;
  drop_off: Date;
  constructor();
  constructor(
    public client?: Client,
    public car?: Car,
    public accepted?: boolean,
    public blocked?: boolean,
    public created_at?: Date,
    public updated_at?: Date
  ) {}
}
