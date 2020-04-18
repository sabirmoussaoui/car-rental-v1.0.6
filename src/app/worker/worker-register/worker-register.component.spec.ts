import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerRegisterComponent } from './worker-register.component';

describe('WorkerRegisterComponent', () => {
  let component: WorkerRegisterComponent;
  let fixture: ComponentFixture<WorkerRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkerRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
