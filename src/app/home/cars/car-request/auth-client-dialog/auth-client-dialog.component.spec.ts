import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthClientDialogComponent } from './auth-client-dialog.component';

describe('AuthClientDialogComponent', () => {
  let component: AuthClientDialogComponent;
  let fixture: ComponentFixture<AuthClientDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthClientDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
