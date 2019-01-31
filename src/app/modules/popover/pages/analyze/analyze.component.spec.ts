import { async, TestBed } from '@angular/core/testing';
import sinon from 'sinon';
import { ClarityModule } from '@clr/angular';

import { AnalyzeComponent } from './analyze.component';
import { PageAnalysisService } from '@app/core/services/page-analysis.service';
import { DateTimeService } from '@app/core/services/date-time.service';
import { CaptainsLogService } from '@app/core/services/captains-log.service';
import { CoreModule } from '@app/core/core.module';
import { PageAnalysisTreeComponent } from '../../components/page-analysis-tree/page-analysis-tree.component';
import { StorageService } from '@app/core/services/storage.service';
import { ChromeService } from '@app/core/services/chrome.service';


describe('AnalyzeComponent', () => {
  let component: AnalyzeComponent;
  let analysisServiceMock = null;
  let dateTimeService: DateTimeService;
  let captain: CaptainsLogService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, CoreModule],
      declarations: [ AnalyzeComponent, PageAnalysisTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const storage = new StorageService();
    const chrome = new ChromeService(null);
    captain = new CaptainsLogService();
    dateTimeService = new DateTimeService();
    const analysisService = new PageAnalysisService(storage, chrome, captain);
    analysisServiceMock = sinon.mock(analysisService);
    component = new AnalyzeComponent(analysisService, dateTimeService, captain);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to scrape and analysis', () => {
    analysisServiceMock.expects('getAnalysisState').returns(1);
    analysisServiceMock.expects('getAnalysisState').once();
    analysisServiceMock.expects('subscribeToScrapes').once();
    analysisServiceMock.expects('subscribeToAnalysis').once();
    analysisServiceMock.expects('getPreviousAnalysis').once();

    component.ngOnInit();

    analysisServiceMock.verify();
    expect(component.analysisComplete).toBeFalsy();
    expect(component.inProgress).toBeTruthy();
    expect(component.pageTitle).toEqual('Scraping DOM...');
  });
});
