import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigInfoComponent } from './pig-info.component';

describe('PigInfoComponent', () => {
  let component: PigInfoComponent;
  let fixture: ComponentFixture<PigInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PigInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PigInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
