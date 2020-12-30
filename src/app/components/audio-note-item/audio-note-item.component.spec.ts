import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioNoteItemComponent } from './audio-note-item.component';

describe('AudioNoteItemComponent', () => {
  let component: AudioNoteItemComponent;
  let fixture: ComponentFixture<AudioNoteItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioNoteItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioNoteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
