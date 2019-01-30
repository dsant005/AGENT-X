import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { PageAnalysisService } from '@app/core/services/page-analysis.service';
import { Error } from '@app/core/models/error.model';
import { Analysis } from '@app/core/models/analysis.interface';
import { DateTimeService } from '@app/core/services/date-time.service';
import { CaptainsLogService } from '@app/core/services/captains-log.service';
import { OverlayService } from '@app/core/services/overlay.service';

const DEFAULT_PAGE_TITLE = 'Analyze this Page';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  public pageTitle = DEFAULT_PAGE_TITLE;
  public inProgress = false;
  public analysisComplete = false;
  public error: Error;
  public analysis: Analysis;
  public modal = { opened: false };

  constructor(
    private pageAnalysisService: PageAnalysisService,
    private dateTimeService: DateTimeService,
    private captain: CaptainsLogService,
    private overlayService: OverlayService) { }

  ngOnInit() {
    this.pageAnalysisService.getPreviousAnalysis().subscribe(analysis => {
      if (analysis) {
        this.analysisCompleted(analysis);
        this.captain.log('Init popover with existing Analysis', this.analysis);
      }
    });
    const state = this.pageAnalysisService.getAnalysisState();
    if (state === 1) {
      this.scraping();
      this.subscribeToScrape();
      this.subscribeToAnalysis();
    } else if (state === 2) {
      this.analyzing();
      this.subscribeToAnalysis();
    }
  }

  analyze(): void {
    this.pageAnalysisService.analyzePage();
    this.subscribeToScrape();
    this.subscribeToAnalysis();
    this.scraping();
  }

  dismissError() {
    console.log('Dismissed');
    this.error = null;
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

  protected subscribeToScrape(): void {
    this.pageAnalysisService.subscribeToScrapes().pipe(first()).subscribe(
      scrape => this.analyzing(),
      err => {
        this.error = {
          heading: 'Error',
          message: 'An error occured while scraping the page, if ' +
            'you believe this is a bug you can report this error with a link to the page in Github.'
        };
      });
  }

  protected subscribeToAnalysis(): void {
    this.pageAnalysisService.subscribeToAnalysis().pipe(first()).subscribe(
      analysis => this.analysisCompleted(analysis as Analysis),
      err => {
        this.error = {
          heading: 'Error',
          message: 'An error occured while sending the DOM scrape for analysis, please try again later.'
        };
      });
  }
}
