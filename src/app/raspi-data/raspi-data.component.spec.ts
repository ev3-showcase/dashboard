import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspiDataComponent } from './raspi-data.component';

describe('RaspiDataComponent', () => {
  let component: RaspiDataComponent;
  let fixture: ComponentFixture<RaspiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaspiDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaspiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
