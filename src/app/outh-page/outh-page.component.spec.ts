import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuthPageComponent } from './outh-page.component';

describe('OuthPageComponent', () => {
  let component: OuthPageComponent;
  let fixture: ComponentFixture<OuthPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OuthPageComponent]
    });
    fixture = TestBed.createComponent(OuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
