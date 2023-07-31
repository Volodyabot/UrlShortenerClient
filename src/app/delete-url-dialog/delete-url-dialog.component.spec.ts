import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUrlDialogComponent } from './delete-url-dialog.component';

describe('DeleteUrlDialogComponent', () => {
  let component: DeleteUrlDialogComponent;
  let fixture: ComponentFixture<DeleteUrlDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUrlDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteUrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
