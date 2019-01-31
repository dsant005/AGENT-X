import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelComponent } from './label.component';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from '@app/core/core.module';

describe('LabelComponent', () => {
  let component: LabelComponent;
  let fixture: ComponentFixture<LabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, CoreModule],
      declarations: [ LabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
