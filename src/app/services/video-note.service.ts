import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { PusherService } from './pusher.service';
import { TelegramBotService } from './telegram-bot.service';

export enum State {
  RECEIVED, 
  APPROVED,
  SHOWED, 
}

@Injectable({
  providedIn: 'root'
})
export class VideoNoteService {

  private _notes = [];

  get notes(){
    return this._notes;
  }

  constructor(private pusher: PusherService, private auth: AuthService, private telegramBot: TelegramBotService, private notificationService: NotificationService, private router: Router) {
    let scope = this;
    this.pusher.onNewVideoNote((data)=>{
      this.onNewVideoNote(data,scope);
      if(this.router.url != "video-notes"){
        this.notificationService.newNotification("Nuova video nota!","video-notes");
      }
    });

    this.telegramBot.onReady(()=>{
      scope.auth.getMessagesBot(scope.telegramBot.bot,{type:"VIDEO_NOTE"}).toPromise().then((data)=>{
        data.forEach(message => {
          var _data = {
            message: message.data,
            URL: undefined,
            profile_pic: undefined
          };
  
          scope._notes.push(_data);
        });
        scope._notes = scope._notes.reverse();
        console.log(data);
      });
    })
   }

  private onNewVideoNote(videoNote,scope){
    videoNote.status = 0;
    scope._notes.unshift(videoNote);
    console.log(videoNote);
  }
}
