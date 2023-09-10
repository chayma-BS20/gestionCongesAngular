import { TestBed } from '@angular/core/testing';

import { SHService } from './sh.service';

describe('SHService', () => {
  let service: SHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
