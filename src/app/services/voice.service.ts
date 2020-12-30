import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from './notification.service';
import { PusherService } from './pusher.service';
import { TelegramBotService } from './telegram-bot.service';


@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  private _notes = [];

  get notes(){
    return this._notes;
  }


  constructor(
    private pusher: PusherService, 
    private auth: AuthService, 
    private telegramBot: TelegramBotService,
    private notificationService: NotificationService,
    private router: Router
    ) {

    let scope = this;
    
    window["voice_messages"] = this;

    this.pusher.onNewVoiceMessage((data)=>{
      this.onNewVoiceMessage(data,scope);
      if(this.router.url != "voice-messages"){
        this.notificationService.newNotification("Nuovo messaggio audio!","voice-messages");
      }
      
    });
   
    this.telegramBot.onReady(()=>{
      scope.auth.getMessagesBot(scope.telegramBot.bot,{type:"VOICE_MESSAGE"}).toPromise().then((data)=>{
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


  private onNewVoiceMessage(voiceMessage,scope){
    voiceMessage.status = 0;
    scope._notes.unshift(voiceMessage);
    console.log(voiceMessage);
  }
}
