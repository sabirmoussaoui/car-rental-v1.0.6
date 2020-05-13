import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenCarImageDialogComponent } from './open-car-image-dialog.component';

describe('OpenCarImageDialogComponent', () => {
  let component: OpenCarImageDialogComponent;
  let fixture: ComponentFixture<OpenCarImageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenCarImageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenCarImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
