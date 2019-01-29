import { Injectable } from '@angular/core';

export enum LOG_LEVEL {
  ERROR = 0,
  INFO = 1,
  DEBUG = 2
}

@Injectable({
  providedIn: 'root'
})
export class CaptainsLogService {
  private _logger: Console;
  private _logLevel: LOG_LEVEL;

  constructor() {
    this._logger = console;
    this.logLevel = LOG_LEVEL.ERROR;
  }

  set logger(logger: Console) {
    this._logger = logger;
  }

  set logLevel(logLevel: LOG_LEVEL) {
    this._logLevel = logLevel;
  }

  log(...msg: any[]): void {
    if (this._logLevel > 0) {
      this._logger.log(...msg);
    }
  }

  error(...msg: any[]): void {
    this._logger.error(...msg);
  }

  debug(...msg: any[]): void {
    if (this._logLevel > 1) {
      this._logger.debug(...msg);
    }
  }
}
