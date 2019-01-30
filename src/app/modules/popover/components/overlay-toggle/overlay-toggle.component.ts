import { Component, OnInit } from '@angular/core';

import { OverlayService } from '@app/core/services/overlay.service';

@Component({
  selector: 'app-overlay-toggle',
  templateUrl: './overlay-toggle.component.html',
  styleUrls: ['./overlay-toggle.component.scss']
})
export class OverlayToggleComponent implements OnInit {
  overlayEnabled: boolean;

  constructor(private overlayService: OverlayService) {
    this.overlayEnabled = this.overlayService.isEnabled();
  }

  ngOnInit() {
  }

  toggleOverlay(event: boolean): void {
    this.overlayEnabled = event;
    if (this.overlayEnabled) {
      this.overlayService.enableOverlay();
    } else {
      this.overlayService.disableOverlay();
    }
  }

}
