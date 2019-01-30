import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { slideInAnimation } from '@app/core/animations/slide-in';
import { CaptainsLogService, LOG_LEVEL } from '@app/core/services/captains-log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [ slideInAnimation ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private captain: CaptainsLogService) {
    this.captain.logLevel = LOG_LEVEL.DEBUG;
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
