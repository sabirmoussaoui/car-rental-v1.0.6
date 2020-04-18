import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBrandUpdateDialogComponent } from './car-brand-update-dialog.component';

describe('CarBrandUpdateDialogComponent', () => {
  let component: CarBrandUpdateDialogComponent;
  let fixture: ComponentFixture<CarBrandUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarBrandUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarBrandUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
