import { Component, OnInit } from '@angular/core';
import { VoiceService } from 'src/app/services/voice.service';

@Component({
  selector: 'app-voice-messages-page',
  templateUrl: './voice-messages-page.component.html',
  styleUrls: ['./voice-messages-page.component.scss']
})
export class VoiceMessagesPageComponent implements OnInit {

  constructor(
    public audioNotes: VoiceService,) { }

  ngOnInit(): void {
  }

}
