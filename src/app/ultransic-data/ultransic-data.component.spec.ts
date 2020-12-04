import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UltransicDataComponent } from './ultransic-data.component';

describe('UltransicDataComponent', () => {
  let component: UltransicDataComponent;
  let fixture: ComponentFixture<UltransicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UltransicDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UltransicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
