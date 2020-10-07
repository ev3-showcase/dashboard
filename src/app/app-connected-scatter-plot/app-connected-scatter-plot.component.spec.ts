import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConnectedScatterPlotComponent } from './app-connected-scatter-plot.component';

describe('AppConnectedScatterPlotComponent', () => {
  let component: AppConnectedScatterPlotComponent;
  let fixture: ComponentFixture<AppConnectedScatterPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppConnectedScatterPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConnectedScatterPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
