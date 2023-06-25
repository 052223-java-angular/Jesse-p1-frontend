import { TestBed } from '@angular/core/testing';

import { SongserviceService } from './songservice.service';

describe('SongserviceService', () => {
  let service: SongserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
