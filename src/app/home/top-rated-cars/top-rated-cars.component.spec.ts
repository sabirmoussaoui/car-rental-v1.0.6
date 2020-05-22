import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedCarsComponent } from './top-rated-cars.component';

describe('TopRatedCarsComponent', () => {
  let component: TopRatedCarsComponent;
  let fixture: ComponentFixture<TopRatedCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRatedCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
