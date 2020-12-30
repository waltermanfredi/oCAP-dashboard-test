import { Injectable } from '@angular/core';
import TwitchJs, { ApiVersions, Chat } from 'twitch-js'

@Injectable({
  providedIn: 'root'
})
export class TwitchChatService {

  constructor() { 
    window["twitch_chat"] = this;
  }

  _chat: Chat;
  get chat(){
    return this._chat;
  }


  init(token:string, username:string){
    const { api, chat } = new TwitchJs({ token, username })
    this._chat = chat;
     // Get featured streams.
    /* api.get('streams/featured', { version: ApiVersions.Kraken}).then(response => {
      console.log(response);
      // Do stuff ...
    });*/

    const handleMessage = message => {
      console.log("MESSAGGIO", message);
      // Do other stuff ...
    };

    // Listen for all events.
    chat.on(TwitchJs.Chat.Events.ALL, handleMessage);
    chat.connect().then(globalUserState => {
      console.log(globalUserState);
      const channel = '#ocapmedia'

      chat.join(channel).then(channelState => {
        console.log(channelState);
      })

      chat.say(channel,"bella");
    })
  }
  
}
