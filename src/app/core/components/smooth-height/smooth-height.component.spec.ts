import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmoothHeightComponent } from './smooth-height.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SmoothHeightComponent', () => {
  let component: SmoothHeightComponent;
  let fixture: ComponentFixture<SmoothHeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [ SmoothHeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmoothHeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
