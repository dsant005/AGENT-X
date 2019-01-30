import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { ChromeService } from './chrome.service';
import { PageAnalysisService } from './page-analysis.service';
import { first } from 'rxjs/operators';

const OVERLAY_ENABLED = 'overlayEnabled',
      OVERLAY_PAINTED = 'overlayPainted',
      START_OVERLAY = 'paintOverlay',
      DISABLE_OVERLAY = 'clearOverlay';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private enabled: boolean;
  constructor(
    private storage: StorageService,
    private chromeService: ChromeService,
    private pageAnalysisService: PageAnalysisService) {
    this.enabled =  this.storage.get(OVERLAY_ENABLED) === '1' ? true : false;
  }

  enableOverlay(): void {
    this.enabled = true;
    this.storage.set(OVERLAY_ENABLED, 1);
    this.paintOverlay();
  }

  disableOverlay(): void {
    this.enabled = false;
    this.storage.set(OVERLAY_ENABLED, 0);
    this.chromeService.sendMessage({ name: DISABLE_OVERLAY, payload: null });
  }

  paintOverlay(): void {
    if (this.enabled) {
      this.pageAnalysisService.getPreviousAnalysis().pipe(first()).subscribe(analysis => {
        this.pageAnalysisService.getPreviousScrape().pipe(first()).subscribe(scrape => {
          this.chromeService.sendMessage({
            name: START_OVERLAY,
            payload: {
              analysis: analysis,
              scrape: scrape } });
          this.storage.get(OVERLAY_PAINTED + scrape.url);
        });
      });
    }
  }

  isEnabled(): boolean {
    return this.enabled;
  }

}
