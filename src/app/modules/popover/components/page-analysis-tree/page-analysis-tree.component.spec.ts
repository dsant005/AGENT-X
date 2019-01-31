import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAnalysisTreeComponent } from './page-analysis-tree.component';
import { CoreModule } from '@app/core/core.module';
import { ClarityModule } from '@clr/angular';
import { Component } from '@angular/core';

describe('PageAnalysisTreeComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, ClarityModule],
      declarations: [ PageAnalysisTreeComponent, TestHostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  @Component({
    selector: 'app-host-component',
    template: '<app-page-analysis-tree [analysis]="analysis"></app-page-analysis-tree>'
  })
  class TestHostComponent {
    analysis = {
      cancels: [],
      commits: [],
      errorMessages: [],
      pageTitles: [],
      labelCandidates: []
    };
  }
});
