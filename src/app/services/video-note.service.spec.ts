import { TestBed } from '@angular/core/testing';

import { VideoNoteService } from './video-note.service';

describe('VideoNoteService', () => {
  let service: VideoNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideoNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
