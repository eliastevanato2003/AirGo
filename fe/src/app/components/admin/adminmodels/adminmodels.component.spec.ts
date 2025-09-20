import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmodelsComponent } from './adminmodels.component';

describe('AdminmodelsComponent', () => {
  let component: AdminmodelsComponent;
  let fixture: ComponentFixture<AdminmodelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminmodelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminmodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
