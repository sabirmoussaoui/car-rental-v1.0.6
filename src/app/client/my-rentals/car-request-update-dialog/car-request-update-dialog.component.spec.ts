import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRequestUpdateDialogComponent } from './car-request-update-dialog.component';

describe('CarRequestUpdateDialogComponent', () => {
  let component: CarRequestUpdateDialogComponent;
  let fixture: ComponentFixture<CarRequestUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRequestUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRequestUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
