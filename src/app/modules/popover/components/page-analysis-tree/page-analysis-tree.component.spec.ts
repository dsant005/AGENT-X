import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAnalysisTreeComponent } from './page-analysis-tree.component';
import { CoreModule } from '@app/core/core.module';
import { ClarityModule } from '@clr/angular';

describe('PageAnalysisTreeComponent', () => {
  let component: PageAnalysisTreeComponent;
  let fixture: ComponentFixture<PageAnalysisTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, ClarityModule],
      declarations: [ PageAnalysisTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAnalysisTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
