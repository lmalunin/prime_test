import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerFormComponent } from './inner-form.component';

describe('InnerFormComponent', () => {
  let component: InnerFormComponent;
  let fixture: ComponentFixture<InnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
