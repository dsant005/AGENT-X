import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { PageAnalysisService } from '@app/core/services/page-analysis.service';
import { Error } from '@app/core/models/error.model';
import { Analysis } from '@app/core/models/analysis.interface';
import { Scrape } from '@app/core/models/scrape.interface';

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
  public error: Error;
  public analysis: Analysis;
  private scrapeSubscription: Subscription;
  private analysisSubscription: Subscription;

  constructor(private pageAnalysisService: PageAnalysisService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.pageAnalysisService.getPreviousAnalysis().subscribe(analysis => {
      if (analysis) {
        this.analysis = analysis;
        this.analysisComplete = true;
        console.log('init', this.analysis);
        this.ref.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.scrapeSubscription) {
      this.scrapeSubscription.unsubscribe();
    }
    if (this.analysisSubscription) {
      this.analysisSubscription.unsubscribe();
    }
  }

  analyze(): void {
    this.analysisComplete = false;
    this.inProgress = true;
    this.pageTitle = 'Scraping DOM...';
    this.scrapeSubscription = this.pageAnalysisService.analyzePage().subscribe(scrape => this.scrapeComplete(scrape));
  }

  scrapeComplete(scrape: Scrape) {
    // at this point this is outside the NGZone since it was returned via callback in Chrome.
    this.pageTitle = 'Sending DOM Scrape...';
    console.log('Scrape completed');
    this.ref.detectChanges();
    this.analysisSubscription = this.pageAnalysisService.sendScrape(scrape)
      .subscribe(
        response => {
          response.analysis.timeStamp = Date.now();
          this.analysisCompleted(response.analysis as Analysis);
        },
        error => {
          this.error = {
            heading: 'Error',
            message: 'An error occured while sending the DOM scrape for analysis, please try again later.'
          };
          this.resetPage();
        });
  }

  analysisCompleted(analysis: Analysis) {
    console.log(analysis);
    this.pageAnalysisService.storeAnalysis(analysis);
    this.analysis = analysis;
    this.analysisComplete = true;
    this.inProgress = false;
    this.pageTitle = DEFAULT_PAGE_TITLE;
    this.ref.detectChanges();
  }

  resetPage() {
    this.pageTitle = DEFAULT_PAGE_TITLE;
    this.analysisComplete = false;
    this.inProgress = false;
    this.analysis = null;
    this.ref.detectChanges();
  }

  dismissError() {
    console.log('Dismissed');
    this.error = null;
    this.resetPage();
  }

  deleteAnalysis() {
    this.pageAnalysisService.deleteAnalysis();
    this.resetPage();
  }

  timeSince(timeStamp) {
    const now = new Date(),
      secondsPast = (now.getTime() - new Date(timeStamp).getTime()) / 1000;

    const formatDate = function (date, format, utc = undefined) {
      const MMMM = ['\x00', 'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
      const MMM = ['\x01', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dddd = ['\x02', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const ddd = ['\x03', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      function ii(i, len = 2) {
        let s = i + '';
        len = len || 2;
        while (s.length < len) { s = '0' + s; }
        return s;
      }

      const y = utc ? date.getUTCFullYear() : date.getFullYear();
      format = format.replace(/(^|[^\\])yyyy+/g, '$1' + y);
      format = format.replace(/(^|[^\\])yy/g, '$1' + y.toString().substr(2, 2));
      format = format.replace(/(^|[^\\])y/g, '$1' + y);

      const M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
      format = format.replace(/(^|[^\\])MMMM+/g, '$1' + MMMM[0]);
      format = format.replace(/(^|[^\\])MMM/g, '$1' + MMM[0]);
      format = format.replace(/(^|[^\\])MM/g, '$1' + ii(M));
      format = format.replace(/(^|[^\\])M/g, '$1' + M);

      const d = utc ? date.getUTCDate() : date.getDate();
      format = format.replace(/(^|[^\\])dddd+/g, '$1' + dddd[0]);
      format = format.replace(/(^|[^\\])ddd/g, '$1' + ddd[0]);
      format = format.replace(/(^|[^\\])dd/g, '$1' + ii(d));
      format = format.replace(/(^|[^\\])d/g, '$1' + d);

      const H = utc ? date.getUTCHours() : date.getHours();
      format = format.replace(/(^|[^\\])HH+/g, '$1' + ii(H));
      format = format.replace(/(^|[^\\])H/g, '$1' + H);

      const h = H > 12 ? H - 12 : H === 0 ? 12 : H;
      format = format.replace(/(^|[^\\])hh+/g, '$1' + ii(h));
      format = format.replace(/(^|[^\\])h/g, '$1' + h);

      const m = utc ? date.getUTCMinutes() : date.getMinutes();
      format = format.replace(/(^|[^\\])mm+/g, '$1' + ii(m));
      format = format.replace(/(^|[^\\])m/g, '$1' + m);

      const s = utc ? date.getUTCSeconds() : date.getSeconds();
      format = format.replace(/(^|[^\\])ss+/g, '$1' + ii(s));
      format = format.replace(/(^|[^\\])s/g, '$1' + s);

      let f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
      format = format.replace(/(^|[^\\])fff+/g, '$1' + ii(f, 3));
      f = Math.round(f / 10);
      format = format.replace(/(^|[^\\])ff/g, '$1' + ii(f));
      f = Math.round(f / 10);
      format = format.replace(/(^|[^\\])f/g, '$1' + f);

      const T = H < 12 ? 'AM' : 'PM';
      format = format.replace(/(^|[^\\])TT+/g, '$1' + T);
      format = format.replace(/(^|[^\\])T/g, '$1' + T.charAt(0));

      const t = T.toLowerCase();
      format = format.replace(/(^|[^\\])tt+/g, '$1' + t);
      format = format.replace(/(^|[^\\])t/g, '$1' + t.charAt(0));

      let tz = -date.getTimezoneOffset();
      let K = utc || !tz ? 'Z' : tz > 0 ? '+' : '-';
      if (!utc) {
        tz = Math.abs(tz);
        const tzHrs = Math.floor(tz / 60);
        const tzMin = tz % 60;
        K += ii(tzHrs) + ':' + ii(tzMin);
      }
      format = format.replace(/(^|[^\\])K/g, '$1' + K);

      const day = (utc ? date.getUTCDay() : date.getDay()) + 1;
      format = format.replace(new RegExp(dddd[0], 'g'), dddd[day]);
      format = format.replace(new RegExp(ddd[0], 'g'), ddd[day]);

      format = format.replace(new RegExp(MMMM[0], 'g'), MMMM[M]);
      format = format.replace(new RegExp(MMM[0], 'g'), MMM[M]);

      format = format.replace(/\\(.)/g, '$1');

      return format;
    };

    if (secondsPast < 60) { // Less than a minute
      return Math.round(secondsPast) + ' seconds ago...';
    }
    if (secondsPast < 3600) { // Less than an hour
      return Math.round(secondsPast / 60) + ' minutes ago...';
    }
    if (secondsPast <= 86400) { // Less than a day
      return Math.round(secondsPast / 3600) + ' hours ago...';
    }
    if (secondsPast <= 172800) { // Less than 2 days
      return 'Yesderday at ' + formatDate(timeStamp, 'h:mmtt');
    }
    if (secondsPast > 172800) { // After two days
      let timeString;

      if (secondsPast <= 604800) {
        timeString = formatDate(timeStamp, 'dddd') + ' at ' + formatDate(timeStamp, 'h:mmtt');
      } else if (now.getFullYear() > timeStamp.getFullYear()) {
        timeString = formatDate(timeStamp, 'MMMM d, yyyy');
      } else if (now.getMonth() > timeStamp.getMonth()) {
        timeString = formatDate(timeStamp, 'MMMM d');
      } else {
        timeString = formatDate(timeStamp, 'MMMM d') + ' at ' + formatDate(timeStamp, 'h:mmtt');
      } // with in a month

      return timeString;
    }
  }

}
