import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAboutDialogComponent } from './edit-about-dialog.component';

describe('EditAboutDialogComponent', () => {
  let component: EditAboutDialogComponent;
  let fixture: ComponentFixture<EditAboutDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAboutDialogComponent]
    });
    fixture = TestBed.createComponent(EditAboutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
