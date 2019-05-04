import { TestBed } from '@angular/core/testing';

import { IdSelectorService } from './id-selector.service';

describe('IdSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdSelectorService = TestBed.get(IdSelectorService);
    expect(service).toBeTruthy();
  });
});
