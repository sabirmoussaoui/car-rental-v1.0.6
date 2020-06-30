import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRequestDetailDialogComponent } from './car-request-detail-dialog.component';

describe('CarRequestDetailDialogComponent', () => {
  let component: CarRequestDetailDialogComponent;
  let fixture: ComponentFixture<CarRequestDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRequestDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRequestDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
