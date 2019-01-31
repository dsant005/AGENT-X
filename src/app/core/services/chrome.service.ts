import { Injectable, NgZone } from '@angular/core';
import { ChromeMessage } from '../models/chrome_message.interface';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChromeService {

  constructor(private zone: NgZone) { }

  listenForMessage(messageId: string): Observable<ChromeMessage> {
    const subject = new Subject<ChromeMessage>();
    chrome.runtime.onMessage.addListener(
      (request: ChromeMessage, sender: any, sendResponse: any) => {
        if (request.name === messageId) {
          this.zone.run(() => subject.next(request));
        }
      });
      return subject.asObservable();
  }

  queryActiveTab(): Observable<chrome.tabs.Tab> {
    const subject = new Subject<chrome.tabs.Tab>();
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0];
      this.zone.run(() => subject.next(activeTab));
    });
    return subject.asObservable();
  }

  sendMessage(message: ChromeMessage): Observable<ChromeMessage> {
    const subject = new Subject<ChromeMessage>();
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, message, (msg) => this.zone.run(() => subject.next(msg)));
    });
    return subject.asObservable();
  }

  sendRuntimeMessage(message: ChromeMessage): void {
    chrome.runtime.sendMessage(message);
  }
}
