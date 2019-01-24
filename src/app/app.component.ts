import { Component } from '@angular/core';
import { StorageService } from '@app/core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private storage: StorageService) {
    // setup initial configuration
    this.storage.setLocalStorage();
    const baseUrl = this.storage.get('baseUrl');
    if (!baseUrl) {
      this.storage.set('baseUrl', 'http://localhost:9000');
    }
  }
}
