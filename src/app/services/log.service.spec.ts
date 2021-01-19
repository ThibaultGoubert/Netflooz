import { TestBed } from '@angular/core/testing';

import { LogService } from './log.service';

describe('LogServiceService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
