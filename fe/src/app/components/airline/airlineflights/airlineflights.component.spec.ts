import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineFlightsComponent } from './airlineflights.component';

describe('FlightsComponent', () => {
  let component: AirlineFlightsComponent;
  let fixture: ComponentFixture<AirlineFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirlineFlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirlineFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
