import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoNoteItemComponent } from './video-note-item.component';

describe('VideoNoteItemComponent', () => {
  let component: VideoNoteItemComponent;
  let fixture: ComponentFixture<VideoNoteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoNoteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoNoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
