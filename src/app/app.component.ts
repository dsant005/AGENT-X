import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Subscription } from 'rxjs';

import { slideInAnimation } from '@app/core/animations/slide-in';
import { CaptainsLogService, LOG_LEVEL } from '@app/core/services/captains-log.service';
import { Error } from '@app/core/models/error.model';
import { ChromeService } from '@app/core/services/chrome.service';
import { StorageService } from '@app/core/services/storage.service';

const ERROR_MESSAGE = 'errorMessage';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ slideInAnimation ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  error: Error = null;
  msgSubscription: Subscription;

  constructor(private captain: CaptainsLogService, private chromeService: ChromeService, private storage: StorageService) {
    this.captain.logLevel = LOG_LEVEL.DEBUG;
    this.msgSubscription = this.chromeService.listenForMessage(ERROR_MESSAGE).subscribe((msg) => {
      if (msg && msg.payload as Error) {
        this.error = msg.payload;
      }
    });
    this.storage.setLocalStorage();
    this.error =  this.storage.getObject(ERROR_MESSAGE);
  }

  dismissError() {
    this.captain.debug('Dismissing Error.');
    this.error = null;
    this.storage.remove(ERROR_MESSAGE);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
