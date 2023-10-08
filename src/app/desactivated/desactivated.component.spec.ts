import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivatedComponent } from './desactivated.component';

describe('DesactivatedComponent', () => {
  let component: DesactivatedComponent;
  let fixture: ComponentFixture<DesactivatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesactivatedComponent]
    });
    fixture = TestBed.createComponent(DesactivatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
