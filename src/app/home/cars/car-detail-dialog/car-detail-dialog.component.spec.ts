import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailDialogComponent } from './car-detail-dialog.component';

describe('CarDetailDialogComponent', () => {
  let component: CarDetailDialogComponent;
  let fixture: ComponentFixture<CarDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
