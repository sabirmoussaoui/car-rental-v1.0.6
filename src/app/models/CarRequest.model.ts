import { Car } from './Car.model';
import { Client } from './Client.model';

export class CarRequest {
  clientKey: string;
  workerKey: string;
  carRequestKey: string;
  carBrandKey: string;
  clientCityKey: string;
  pick_up: string;
  drop_off: string;
  pick_up_time: string;
  drop_off_time: string;
  price_total: number;
  days: number;
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
