import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {

  constructor() { }

  startLabelMode(type: string): void {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(
        activeTab.id,
        { name: 'startSelectorMode', payload: type },
        (msg) => msg.name === 'inSelectorMode' ? window.close() : window.close());
    });
  }

}
