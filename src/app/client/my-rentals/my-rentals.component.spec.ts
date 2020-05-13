import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRentalsComponent } from './my-rentals.component';

describe('MyRentalsComponent', () => {
  let component: MyRentalsComponent;
  let fixture: ComponentFixture<MyRentalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRentalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
