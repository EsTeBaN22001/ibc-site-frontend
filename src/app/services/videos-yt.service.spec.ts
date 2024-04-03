import { TestBed } from '@angular/core/testing';

import { VideosYTService } from './videos-yt.service';

describe('VideosYTService', () => {
  let service: VideosYTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideosYTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
