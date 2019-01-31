import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { PageAnalysisService } from '@app/core/services/page-analysis.service';
import { Analysis } from '@app/core/models/analysis.interface';
import { DateTimeService } from '@app/core/services/date-time.service';
import { CaptainsLogService } from '@app/core/services/captains-log.service';

const DEFAULT_PAGE_TITLE = 'Analyze this Page';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit, OnDestroy {
  public pageTitle = DEFAULT_PAGE_TITLE;
  public inProgress = false;
  public analysisComplete = false;
  public analysis: Analysis;
  public modal = { opened: false };

  private analysisSubscription: Subscription;
  private scrapeSubscription: Subscription;

  constructor(
    private pageAnalysisService: PageAnalysisService,
    private dateTimeService: DateTimeService,
    private captain: CaptainsLogService) { }

  ngOnInit() {
    this.pageAnalysisService.getPreviousAnalysis().pipe(first()).subscribe(analysis => {
      if (analysis) {
        this.analysisCompleted(analysis);
        this.captain.debug('Init popover with existing Analysis', this.analysis);
      }
    });
    this.scrapeSubscription = this.pageAnalysisService.subscribeToScrapes().subscribe(
      scrape => this.analyzing(),
      err => {
        this.resetPage();
      });
    this.analysisSubscription = this.pageAnalysisService.subscribeToAnalysis().subscribe(
      analysis => this.analysisCompleted(analysis as Analysis),
      err => {
        this.resetPage();
      });
    const state = this.pageAnalysisService.getAnalysisState();
    if (state === 1) {
      this.scraping();
    } else if (state === 2) {
      this.analyzing();
    }
  }

  ngOnDestroy() {
    this.analysisSubscription.unsubscribe();
    this.scrapeSubscription.unsubscribe();
  }

  analyze(): void {
    this.pageAnalysisService.analyzePage();
    this.scraping();
  }

  dismissError() {
    this.resetPage();
  }

  openModal() {
    console.log('Open Modal');
    this.modal.opened = true;
  }

  deleteAnalysis() {
    console.log('Deleting Analysis');
    this.pageAnalysisService.deleteAnalysis();
    this.resetPage();
    this.modal.opened = false;
  }

  copyScrape() {
    this.pageAnalysisService.copyScrape();
  }

  protected scraping(): void {
    this.analysisComplete = false;
    this.inProgress = true;
    this.pageTitle = 'Scraping DOM...';
  }

  protected analyzing(): void {
    this.analysisComplete = false;
    this.inProgress = true;
    this.pageTitle = 'Sending DOM Scrape for Analysis...';
  }

  protected analysisCompleted(analysis: Analysis) {
    console.log(analysis);
    this.analysis = analysis;
    this.analysisComplete = true;
    this.inProgress = false;
    this.pageTitle = DEFAULT_PAGE_TITLE;
  }

  protected resetPage() {
    console.log('Resetting page');
    this.pageTitle = DEFAULT_PAGE_TITLE;
    this.analysisComplete = false;
    this.inProgress = false;
    this.analysis = null;
  }

  protected timeSince(timeStamp: string): string {
    return this.dateTimeService.timeSince(timeStamp);
  }
}
