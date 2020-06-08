import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/models/Worker.model';
import { CarService } from 'src/app/services/car.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CityService } from 'src/app/services/city.service';
import { CitySelect, SectorSelect } from 'src/app/interfaces/Select';
import { City } from 'src/app/models/City.model';
import { SectorService } from 'src/app/services/sector.service';
import { Sector } from 'src/app/models/Sector.model';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MapsComponent } from 'src/app/maps/maps.component';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
  styles: [
    `
      .star {
        position: relative;
        display: inline-block;
        font-size: 3rem;
        color: #d3d3d3;
      }
      .full {
        color: red;
      }
      .half {
        position: absolute;
        display: inline-block;
        overflow: hidden;
        color: red;
      }
    `,
  ],
})
export class WorkersComponent implements OnInit {
  workers: Worker[] = [];
  cities: CitySelect[] = [];
  city_filtered_items: Worker[] = [];
  sector_filtered_items: Worker[] = [];
  name_filtered_items: Worker[] = [];
  sectors: SectorSelect[] = [];
  p: number = 1;
  currentrate = 3;
  nbCar: number = 0;
  searchForm: FormGroup;
  constructor(
    private cityService: CityService,
    private workerService: WorkerService,
    private carService: CarService,
    private fb: FormBuilder,
    private sectorService: SectorService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      city: [],
      sector: [],
      name: [],
    });
    this.getWorkers();
    this.getCities();
  }
  showDetails(worker) {}
  getWorkers() {
    this.workerService.getWorkers().subscribe((data) => {
      data.forEach((worker: Worker) => {
        return this.countCarByWorker(worker);
      });
    });
  }
  countCarByWorker(worker: Worker) {
    this.carService.getCarsByWorker(worker.workerKey).subscribe((cars) => {
      worker.nbCars = cars.length;
      console.log(cars.length);
      return this.workers.push(worker);
    });
  }
  searchByName() {
    const name = this.searchForm.get('name').value;
    this.workerService.findWorkersByName(name).subscribe((result) => {
      this.name_filtered_items = result;
      this.workers = this.combineLists(result, this.name_filtered_items);
    });
  }
  showMaps(worker: Worker) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.maxHeight = '150vh';
    dialogConfig.data = {
      worker: worker,
      lat: worker.latitude,
      lng: worker.longitude,
    };
    const dialogRef = this.dialog.open(MapsComponent, dialogConfig);
  }
  getCities() {
    this.cityService.getCities().subscribe((result) => {
      result.forEach((doc) => {
        const city = new City(doc.data().name);
        city.cityKey = doc.id;
        this.cities.push({ value: city, viewValue: city.name });
      });
    });
  }
  onCitySelected() {
    const city = this.searchForm.get('city').value;
    this.workerService.findWorkersByCity(city).subscribe((result) => {
      this.city_filtered_items = result;
      this.workers = this.combineLists(result, this.city_filtered_items);
    });
    this.getSectors(city.cityKey);
  }
  onSectorSelected() {
    const sector = this.searchForm.get('sector').value;
    this.workerService.findWorkersBySector(sector).subscribe((result) => {
      this.sector_filtered_items = result;
      this.workers = this.combineLists(result, this.sector_filtered_items);
    });
  }
  getSectors(cityKey) {
    this.sectors = [];
    this.sectorService.getSectors(cityKey).subscribe((result) => {
      result.forEach((doc) => {
        const sector = new Sector(doc.data().name, cityKey);
        this.sectors.push({ value: sector, viewValue: sector.name });
      });
    });
  }

  combineLists(a: Worker[], b: Worker[]) {
    let result = [];
    a.filter((x) => {
      return b.filter((x2) => {
        if (x2.workerKey == x.workerKey) {
          result.push(x2);
        }
      });
    });
    return result;
  }
}
