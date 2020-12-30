import { Component, Input, OnInit } from '@angular/core';
import { PusherService } from 'src/app/services/pusher.service';
import { TelegramBotService } from 'src/app/services/telegram-bot.service';

@Component({
  selector: 'app-video-note-item',
  templateUrl: './video-note-item.component.html',
  styleUrls: ['./video-note-item.component.scss']
})
export class VideoNoteItemComponent implements OnInit {

  @Input()
  item:any;

  popupOpened = false;

  constructor(public pusher: PusherService, public telegram: TelegramBotService) { 
    
  }

  ngOnInit(): void {
    this.check();
    
  }

  public check(){
    if(!this.item.URL){
      this.telegram.getFile(this.item.message.video_note.file_id).then((URL)=>{
        this.item.URL = URL;
      });
    }

    if(!this.item.profile_pic){
      this.telegram.getHQUserProfilePhoto(this.item.message.from.id).then((URL)=>{
        this.item.profile_pic = URL;
      });
    }
  }

  showVideo(){
    this.pusher.triggerLiveViewEvent("show-video",this.item);
    this.telegram.sendMessage(this.item.message.from.id, "Il tuo video messaggio è stato mandato in live")
  }

}
