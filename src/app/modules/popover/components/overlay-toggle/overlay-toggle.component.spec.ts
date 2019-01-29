import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayToggleComponent } from './overlay-toggle.component';

describe('OverlayToggleComponent', () => {
  let component: OverlayToggleComponent;
  let fixture: ComponentFixture<OverlayToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
