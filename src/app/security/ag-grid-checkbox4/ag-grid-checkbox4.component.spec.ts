import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCheckbox4Component } from './ag-grid-checkbox4.component';

describe('AgGridCheckbox4Component', () => {
  let component: AgGridCheckbox4Component;
  let fixture: ComponentFixture<AgGridCheckbox4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridCheckbox4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridCheckbox4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
