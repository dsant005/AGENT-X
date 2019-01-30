import { Component, OnInit } from '@angular/core';

import { StorageService } from '@app/core/services/storage.service';

const HOST_KEY = 'baseUrl';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  host: string;

  constructor(private storage: StorageService) {
    this.host = this.storage.get(HOST_KEY);
  }

  ngOnInit() {
  }

  update() {
    this.storage.set(HOST_KEY, this.host);
  }

}
