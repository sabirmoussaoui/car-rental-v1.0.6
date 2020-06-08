import { CarBrand } from './CarBrand.model';
import { CarModel } from './CarModel.model';
import { Worker } from './Worker.model';

export class Car {
  carKey: string;
  carBrandKey: string;
  workerKey: string;
  visitor: number = 0;
  main_photo: string;
  rating: number = 0;
  photos: any[];
  constructor(
    public price?: number,
    public quantity?: number,
    public carBrand?: CarBrand,
    public carModel?: CarModel,
    public seat?: number,
    public door?: number,
    public fuel?: string,
    public created_at?: Date,
    public updated_at?: Date,
    public worker?: Worker,
    public large_bag?: number,
    public small_bag?: number,
    public gearbox?: string,
    public air_conditioning?: boolean,
    public description?: string,
    public car_class?: string,
    public body_style?: string
  ) {}
}
