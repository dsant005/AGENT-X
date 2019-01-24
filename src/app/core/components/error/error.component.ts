import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Error } from '@app/core/models/error.model';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  private _error: Error;

  @Output() dismiss = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get error(): Error {
    return this._error;
  }

  @Input()
  set error(val: Error) {
    this._error = val;
  }

  hide() {
    this.dismiss.emit();
  }

}
