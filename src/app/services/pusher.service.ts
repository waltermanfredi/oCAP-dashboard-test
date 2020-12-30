import { Injectable } from '@angular/core';
import { AuthStateService } from './auth-state.service';
import { TelegramBotService } from './telegram-bot.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PusherService {
    private Pusher:any = window["Pusher"];
    private baseURL = environment.apiEndPoint + "/api/";
    private video_notes_listeners: Array<Function> = [];
    private voice_messages_listeners: Array<Function> = [];
    private liveViewChannel;
    private pusher;

    constructor(public telegram: TelegramBotService, public auth: AuthStateService) { 
      
    }

    init(){
      let scope = this;
      this.Pusher.logToConsole = true;
  
      if(!this.auth.token.getToken()){return;}

      let subscriber = this.auth.token.payload(this.auth.token.getToken()).sub;
      
      
      this.pusher = new scope.Pusher(environment.pusherAppID, {
        cluster: 'eu',
        authEndpoint: this.baseURL + 'auth/pusher',
        auth: {
          headers: {
            Authorization: 'Bearer ' + this.auth.token.getToken(),
            Accept: 'application/json',
          },
        },
      });
  
      var videoNoteChannel = this.pusher.subscribe('private-video-note-'+subscriber);
      videoNoteChannel.bind('new-video-note', async function(data) {
        console.log(data);

        var _data = {
          message: data,
          URL: await scope.telegram.getFile(data.video_note.file_id),
          profile_pic: await scope.telegram.getHQUserProfilePhoto(data.from.id)
        };
          
          if(_data.URL){
            scope.video_notes_listeners.forEach(cb=>{
              cb(_data);
            })
          }
      });


      var voiceNoteChannel = this.pusher.subscribe('private-voice-messages-'+subscriber);
      voiceNoteChannel.bind('new-voice', async function(data) {
        console.log(data);
        var _data = {
          message: data,
          URL: await scope.telegram.getFile(data.voice.file_id),
          profile_pic: await scope.telegram.getHQUserProfilePhoto(data.from.id)
        };
          
          if(_data.URL){
            scope.voice_messages_listeners.forEach(cb=>{
              cb(_data);
            })
          }
      });
      
      scope.liveViewChannel = this.pusher.subscribe('private-live-view-' + subscriber);
      
      
    }

    destroy(){
      this.video_notes_listeners = [];
      this.voice_messages_listeners = [];
      this.liveViewChannel = undefined;
      //Distruggi la weboscket
      this.pusher.disconnect()
      this.pusher = undefined;
    }

    triggerLiveViewEvent(eventName, data){
      this.liveViewChannel.trigger("client-" + eventName, data);
    }

    
  
 
  deleteNewVideoNoteListener(callback:Function){
    const index = this.video_notes_listeners.indexOf(callback, 0);
    if (index > -1) {
      this.video_notes_listeners.splice(index, 1);
    }
  }

  onNewVideoNote(callback: Function){
    this.video_notes_listeners.push(callback);
  }


  onNewVoiceMessage(callback: Function){
    this.voice_messages_listeners.push(callback);
  }

  deleteNewVoiceMessageListener(callback:Function){
    const index = this.voice_messages_listeners.indexOf(callback, 0);
    if (index > -1) {
      this.voice_messages_listeners.splice(index, 1);
    }
  }

  
}
