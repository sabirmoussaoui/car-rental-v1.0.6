import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsDialogComponent } from './maps-dialog.component';

describe('MapsDialogComponent', () => {
  let component: MapsDialogComponent;
  let fixture: ComponentFixture<MapsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
