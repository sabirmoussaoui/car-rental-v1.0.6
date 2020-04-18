import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorUpdateDialogComponent } from './sector-update-dialog.component';

describe('SectorUpdateDialogComponent', () => {
  let component: SectorUpdateDialogComponent;
  let fixture: ComponentFixture<SectorUpdateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorUpdateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
