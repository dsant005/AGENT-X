import { TestBed } from '@angular/core/testing';

import { ChromeService } from './chrome.service';

describe('ChromeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChromeService = TestBed.get(ChromeService);
    expect(service).toBeTruthy();
  });
});
