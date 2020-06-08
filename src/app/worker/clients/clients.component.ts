import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as firebase from 'firebase';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/models/Worker.model';
import { CarRequestService } from 'src/app/services/car-requests.service';
import { CarRequest } from 'src/app/models/CarRequest.model';
import { Client } from 'src/app/models/Client.model';
import { ThrowStmt } from '@angular/compiler';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  public photos: any[] = [];
  public clients: Client[] = [];
  car_requests: CarRequest[] = [];
  worker: Worker;
  workerKey: string;
  constructor(
    private clientservice: ClientService,
    private spinner: NgxSpinnerService,
    private workerService: WorkerService,
    private carRequestservice: CarRequestService
  ) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((worker) => {
      if (worker) {
        this.workerKey = worker.uid;
        this.getCurrentWorker(worker.uid);
        this.getClients();
      }
    });
  }
  getCurrentWorker(workerKey) {
    this.workerService.getWorkerSnapShot(workerKey).subscribe((data) => {
      this.worker = data.payload.data() as Worker;
    });
  }
  getClients() {
    this.carRequestservice
      .getClientsByWorker(this.workerKey)
      .subscribe((data) => {
        data.forEach((client) => {
          console.log(client.client);
          this.clients.push(client.client as Client);
        });
      });
  }
}
