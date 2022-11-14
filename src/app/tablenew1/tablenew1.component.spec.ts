import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tablenew1Component } from './tablenew1.component';

describe('Tablenew1Component', () => {
  let component: Tablenew1Component;
  let fixture: ComponentFixture<Tablenew1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tablenew1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tablenew1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
