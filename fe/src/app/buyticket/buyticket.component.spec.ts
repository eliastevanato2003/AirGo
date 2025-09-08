import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyticketComponent } from './buyticket.component';

describe('BuyticketComponent', () => {
  let component: BuyticketComponent;
  let fixture: ComponentFixture<BuyticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyticketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
