import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBrandLogoDialogComponent } from './car-brand-logo-dialog.component';

describe('CarBrandLogoDialogComponent', () => {
  let component: CarBrandLogoDialogComponent;
  let fixture: ComponentFixture<CarBrandLogoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarBrandLogoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarBrandLogoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
