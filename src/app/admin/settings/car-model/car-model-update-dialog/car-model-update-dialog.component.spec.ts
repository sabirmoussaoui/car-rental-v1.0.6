import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelUpdateDialogComponent } from './car-model-update-dialog.component';

describe('CarModelUpdateDialogComponent', () => {
  let component: CarModelUpdateDialogComponent;
  let fixture: ComponentFixture<CarModelUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarModelUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarModelUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
