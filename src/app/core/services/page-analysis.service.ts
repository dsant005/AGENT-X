import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { ChromeMessage } from '@app/core/models/chrome_message.interface';
import { Scrape } from '@app/core/models/scrape.interface';
import { StorageService } from '@app/core/services/storage.service';
import { Analysis } from '../models/analysis.interface';

@Injectable({
  providedIn: 'root'
})
export class PageAnalysisService {

  scrape: Subject<Scrape>;

  constructor(private http: HttpClient, private storage: StorageService) {
    this.scrape = new Subject<Scrape>();
    this.storage.setLocalStorage();
  }

  getPreviousAnalysis(): Observable<Analysis> {
    const subject = new Subject<Analysis>();
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0];
      console.log('getting', activeTab.url);
      subject.next(this.storage.getObject(activeTab.url));
    });
    return subject.asObservable();
  }

  storeAnalysis(analysis: Analysis): void {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0];
      console.log('storing', activeTab.url);
      this.storage.setObject(activeTab.url, analysis);
    });
  }

  deleteAnalysis(): void {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0];
      console.log('remove', activeTab.url);
      this.storage.remove(activeTab.url);
    });
  }

  sendScrape(scrape: Scrape): Observable < any > {
    const cleanBody = unescape(encodeURIComponent(JSON.stringify(scrape)));
    return this.http.post(`${this.storage.get('baseUrl')}/v1/pageAnalysis/state/concrete`, cleanBody);
  }

  analyzePage(): Observable < Scrape > {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, 'startPageAnalysis', (msg) => this.completeScrape(msg));
    });
    return this.scrape;
  }

  completeScrape(msg: ChromeMessage): void {
    console.log('Response', msg);
    if (msg) {
      switch (msg.name) {
        case 'completePageAnalysis':
          console.log('Publishing response', msg.payload);
          this.scrape.next(msg.payload);
          break;
      }
    }
  }
}
