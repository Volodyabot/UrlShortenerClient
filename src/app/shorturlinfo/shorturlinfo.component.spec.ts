import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShorturlinfoComponent } from './shorturlinfo.component';

describe('ShorturlinfoComponent', () => {
  let component: ShorturlinfoComponent;
  let fixture: ComponentFixture<ShorturlinfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShorturlinfoComponent]
    });
    fixture = TestBed.createComponent(ShorturlinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
