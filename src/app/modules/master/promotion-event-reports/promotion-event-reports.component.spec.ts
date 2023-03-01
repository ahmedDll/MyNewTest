import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionEventReportsComponent } from './promotion-event-reports.component';

describe('PromotionEventReportsComponent', () => {
  let component: PromotionEventReportsComponent;
  let fixture: ComponentFixture<PromotionEventReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionEventReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionEventReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
