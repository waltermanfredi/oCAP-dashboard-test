import { Component, Input, OnInit } from '@angular/core';
import { PusherService } from 'src/app/services/pusher.service';
import { TelegramBotService } from 'src/app/services/telegram-bot.service';

@Component({
  selector: 'app-audio-note-item',
  templateUrl: './audio-note-item.component.html',
  styleUrls: ['./audio-note-item.component.scss']
})
export class AudioNoteItemComponent implements OnInit {

  @Input()
  item:any;

  constructor(public pusher: PusherService, public telegram: TelegramBotService) { }

  ngOnInit(): void {
    this.check();
  }

  public check(){
    if(!this.item.URL){
      this.telegram.getFile(this.item.message.voice.file_id).then((URL)=>{
        this.item.URL = URL;
      });
    }

    if(!this.item.profile_pic){
      this.telegram.getHQUserProfilePhoto(this.item.message.from.id).then((URL)=>{
        this.item.profile_pic = URL;
      });
    }
  }

  showAudio(){
    this.pusher.triggerLiveViewEvent("show-audio",this.item);
    this.telegram.sendMessage(this.item.message.from.id, "Il tuo messaggio vocale è stato mandato in live");
  }

  playAudio(audio: HTMLAudioElement){
    audio.play();
  }

}
