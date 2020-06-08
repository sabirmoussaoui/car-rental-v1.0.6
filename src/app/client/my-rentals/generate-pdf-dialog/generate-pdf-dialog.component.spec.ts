import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePdfDialogComponent } from './generate-pdf-dialog.component';

describe('GeneratePdfDialogComponent', () => {
  let component: GeneratePdfDialogComponent;
  let fixture: ComponentFixture<GeneratePdfDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePdfDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePdfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
