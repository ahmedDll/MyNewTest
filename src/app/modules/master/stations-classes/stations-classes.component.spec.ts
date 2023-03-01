import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsClassesComponent } from './stations-classes.component';

describe('StationsClassesComponent', () => {
  let component: StationsClassesComponent;
  let fixture: ComponentFixture<StationsClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationsClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
