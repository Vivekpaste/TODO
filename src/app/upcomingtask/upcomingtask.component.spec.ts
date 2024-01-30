import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingtaskComponent } from './upcomingtask.component';

describe('UpcomingtaskComponent', () => {
  let component: UpcomingtaskComponent;
  let fixture: ComponentFixture<UpcomingtaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingtaskComponent]
    });
    fixture = TestBed.createComponent(UpcomingtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
