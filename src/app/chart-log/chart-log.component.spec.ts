import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartLogComponent } from './chart-log.component';

describe('ChartLogComponent', () => {
  let component: ChartLogComponent;
  let fixture: ComponentFixture<ChartLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
