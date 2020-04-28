import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPhotosDialogComponent } from './car-photos-dialog.component';

describe('CarPhotosDialogComponent', () => {
  let component: CarPhotosDialogComponent;
  let fixture: ComponentFixture<CarPhotosDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPhotosDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPhotosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
