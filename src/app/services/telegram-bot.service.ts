import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TelegramBotService {

  bot = {token:""};
  connected = false;

  constructor(private http: HttpClient, private auth: AuthService) {
    window["telegram"] = this;
   
  }

  init(){
    this.auth.getBot().toPromise().then((bot)=>{
      this.bot = bot;
      this.connected = this.bot!=undefined;
      this.onReadyCallbacks.forEach(callback=>{callback()})
    });
  }

  destroy(){
    this.bot = {token:""};
    this.connected = false;
  }


  private onReadyCallbacks = [];
  onReady(callback){
    if(this.bot && this.bot.token == ""){
      this.onReadyCallbacks.push(callback);
    }else{
      callback();
    }
    
  }

  deleteOnReady(){
    console.error("TODO")
  }

  private get(method, params){
    return this.http.get("https://api.telegram.org/bot" + this.bot.token + "/" + method)
  }

  private post(method, params){
    return this.http.post("https://api.telegram.org/bot" + this.bot.token + "/" + method,params)
  }

  getFile(file_id){
    return new Promise((resolve, reject) => {
      this.get("getFile?file_id=" + file_id,{}).subscribe((result:any)=>{
        resolve("https://api.telegram.org/file/bot"+this.bot.token+"/" + result.result.file_path);
      },()=>{reject()})
    });
  }

  getUserProfilePhotos(user_id, limit = 0){
    return new Promise((resolve, reject) => {
      this.get("getUserProfilePhotos?user_id=" + user_id + (limit?("&limit=" + limit):""),{}).subscribe(resolve,reject);
    });
  }

  /* Prende la più recente foto del profilo di un utente alla massima risoluzione disponibile*/
  getHQUserProfilePhoto(user_id){
    return new Promise((resolve,reject)=>{
      this.getUserProfilePhotos(user_id, 1).then((data:any)=>{
        if(data.result.photos.length>0){
          let photos:[any] = data.result.photos[0];
          let photo_id = photos[photos.length-1].file_id;
          this.getFile(photo_id).then(resolve,reject);
        }else{
          reject();
        }
      },reject);
    });
  }

  sendMessage(user_id, text){
    return new Promise((resolve, reject) => {
      this.post("sendMessage",{
        chat_id:user_id,
        text: text,
        parse_mode:"HTML"
      }).subscribe(resolve,reject);
    });
  }

}
