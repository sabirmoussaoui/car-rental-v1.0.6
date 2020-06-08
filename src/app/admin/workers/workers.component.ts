import { Component, OnInit } from '@angular/core';
import { WorkerService } from 'src/app/services/worker.service';
import { Worker } from 'src/app/models/worker.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss'],
})
export class WorkersComponent implements OnInit {
  public photos: any[] = [];
  workers: Array<any>;
  constructor(
    private workerservice: WorkerService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.getworkers();
  }
  getworkers() {
    this.workerservice.getWorkers().subscribe((workers) => {
      this.workers = workers;
      console.log(workers);
    });
  }
  acceptWorker(workerkey) {
    console.log(workerkey);

    this.workerservice.acceptWorker(workerkey).then((cpm) => {
      console.log('worker accepted');
    });
  }
  disacceptedWorker(workerkey) {
    this.workerservice.disacceptedWorker(workerkey).then((cpm) => {
      console.log('worker disaccepted');
    });
  }
  blockWorker(workerkey, status) {
    this.workerservice.blockWorker(workerkey, status).then((cpm) => {
      console.log('worker :' + status);
    });
  }
}
