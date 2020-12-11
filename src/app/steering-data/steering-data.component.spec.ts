import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SteeringDataComponent } from './steering-data.component';

describe('SteeringDataComponent', () => {
  let component: SteeringDataComponent;
  let fixture: ComponentFixture<SteeringDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SteeringDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SteeringDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
