import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayAirComponent } from './one-way-air.component';

describe('OneWayAirComponent', () => {
  let component: OneWayAirComponent;
  let fixture: ComponentFixture<OneWayAirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneWayAirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWayAirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
