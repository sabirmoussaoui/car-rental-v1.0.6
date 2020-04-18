import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityUpdateDialogComponent } from './city-update-dialog.component';

describe('CityUpdateDialogComponent', () => {
  let component: CityUpdateDialogComponent;
  let fixture: ComponentFixture<CityUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
