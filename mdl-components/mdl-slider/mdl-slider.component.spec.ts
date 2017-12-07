import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdlSliderComponent } from './mdl-slider.component';

describe('MdlSliderComponent', () => {
  let component: MdlSliderComponent;
  let fixture: ComponentFixture<MdlSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdlSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdlSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
