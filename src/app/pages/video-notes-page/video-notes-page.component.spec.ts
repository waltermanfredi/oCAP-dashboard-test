import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoNotesPageComponent } from './video-notes-page.component';

describe('VideoNotesPageComponent', () => {
  let component: VideoNotesPageComponent;
  let fixture: ComponentFixture<VideoNotesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoNotesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoNotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
