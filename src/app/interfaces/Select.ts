import { City } from '../models/City.model';
import { Sector } from '../models/Sector.model';
import { CarBrand } from '../models/CarBrand.model';
import { CarModel } from '../models/CarModel.model';
export interface CitySelect {
  value: City;
  viewValue: string;
}
export interface SectorSelect {
  value: Sector;
  viewValue: string;
}

export interface SelectModel {
  value: CarModel;
  viewValue: string;
}
export interface SelectBrand {
  value: CarBrand;
  viewValue: string;
}
export interface Body_Style {
  value: string;
  viewValue: string;
  avatar: string;
}
export interface Car_Class {
  value: string;
  viewValue: string;
}
