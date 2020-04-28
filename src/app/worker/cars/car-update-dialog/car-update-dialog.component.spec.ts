import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarUpdateDialogComponent } from './car-update-dialog.component';

describe('CarUpdateDialogComponent', () => {
  let component: CarUpdateDialogComponent;
  let fixture: ComponentFixture<CarUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
