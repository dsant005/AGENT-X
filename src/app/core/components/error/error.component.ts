import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs';

import { Error } from '@app/core/models/error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Input() error: Error;
  @Output() dismissError = new EventEmitter<any>();
  msgSubscription: Subscription;

  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.dismissError.emit({});
  }
}
