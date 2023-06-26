import { TestBed } from '@angular/core/testing';

import { SpotifyapicallsService } from './spotifyapicalls.service';

describe('SpotifyapicallsService', () => {
  let service: SpotifyapicallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyapicallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
