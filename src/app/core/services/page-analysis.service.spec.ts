import { TestBed } from '@angular/core/testing';

import { PageAnalysisService } from './page-analysis.service';

describe('PageAnalysisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageAnalysisService = TestBed.get(PageAnalysisService);
    expect(service).toBeTruthy();
  });
});
