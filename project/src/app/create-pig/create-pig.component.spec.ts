import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePigComponent } from './create-pig.component';

describe('CreatePigComponent', () => {
  let component: CreatePigComponent;
  let fixture: ComponentFixture<CreatePigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
