import { Injectable} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';

import { Scrape } from '@app/core/models/scrape.interface';
import { StorageService } from '@app/core/services/storage.service';
import { Analysis } from '@app/core/models/analysis.interface';
import { ChromeService } from '@app/core/services/chrome.service';
import { CaptainsLogService } from '@app/core/services/captains-log.service';

@Injectable({
  providedIn: 'root'
})
export class PageAnalysisService {

  scrape: Subject<Scrape>;

  constructor(private storage: StorageService, private chromeService: ChromeService, private captain: CaptainsLogService) {
    this.scrape = new Subject<Scrape>();
    this.storage.setLocalStorage();
  }

  getPreviousAnalysis(): Observable<Analysis> {
    const subject = new Subject<Analysis>();
    this.chromeService.queryActiveTab().pipe(first()).subscribe(tab => {
      const analysis = this.storage.getObject(tab.url);
      this.captain.log('Found previous analysis', analysis);
      subject.next(analysis);
    });
    return subject.asObservable();
  }

  getAnalysisState(): number {
    const scraping = this.storage.get('scraping'),
        analyzing = this.storage.get('analyzing');

    if (scraping) {
      return 1;
    } else if (analyzing) {
      return 2;
    }
    return 0;
  }

  deleteAnalysis(): void {
    this.chromeService.queryActiveTab().pipe(first()).subscribe(tab => {
      this.captain.log('Found tab, removing store', tab.url);
      this.storage.remove(tab.url);
    });
  }

  analyzePage(): void {
    this.chromeService.sendMessage({ name: 'startPageScrape', payload: null });
  }

  subscribeToScrapes(): Observable<Scrape> {
    const subject = new Subject<Scrape>();
    this.chromeService.listenForMessage('completePageAnalysis').subscribe(msg => {
      this.captain.log('Found new scrape', JSON.stringify(msg));
      subject.next(msg.payload as Scrape);
    });
    return subject.asObservable();
  }

  subscribeToAnalysis(): Observable<Analysis> {
    const subject = new Subject<Analysis>();
    this.chromeService.listenForMessage('analysisRecieved').subscribe(msg => {
      this.captain.log('Found new analysis', JSON.stringify(msg));
      subject.next(msg.payload.analysis as Analysis);
    });
    return subject.asObservable();
  }
}
