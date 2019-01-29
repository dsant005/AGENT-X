import { TestBed } from '@angular/core/testing';

import { CaptainsLogService } from './captains-log.service';

describe('CaptainsLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaptainsLogService = TestBed.get(CaptainsLogService);
    expect(service).toBeTruthy();
  });
});
