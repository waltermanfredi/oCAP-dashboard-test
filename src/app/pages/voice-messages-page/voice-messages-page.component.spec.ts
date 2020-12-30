import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceMessagesPageComponent } from './voice-messages-page.component';

describe('VoiceMessagesPageComponent', () => {
  let component: VoiceMessagesPageComponent;
  let fixture: ComponentFixture<VoiceMessagesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoiceMessagesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceMessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
