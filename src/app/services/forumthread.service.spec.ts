import { TestBed } from '@angular/core/testing';

import { ForumthreadService } from './forumthread.service';

describe('ForumthreadService', () => {
  let service: ForumthreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumthreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
