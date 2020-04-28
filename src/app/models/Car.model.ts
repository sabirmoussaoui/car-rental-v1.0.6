import { CarBrand } from './CarBrand.model';
import { CarModel } from './CarModel.model';

export class Car {
  main_photo: string;
  photos: any[];
  constructor(
    public price: number,
    public quantity: number,
    public carBrand: CarBrand,
    public carModel: CarModel,
    public place: number,
    public door: number,
    public fuel: string,
    public created_at: string
  ) {}
}
