import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorDataComponent } from './motor-data.component';

describe('MotorDataComponent', () => {
  let component: MotorDataComponent;
  let fixture: ComponentFixture<MotorDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotorDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
