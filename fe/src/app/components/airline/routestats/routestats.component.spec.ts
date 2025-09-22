import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutestatsComponent } from './routestats.component';

describe('RoutestatsComponent', () => {
  let component: RoutestatsComponent;
  let fixture: ComponentFixture<RoutestatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutestatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutestatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
