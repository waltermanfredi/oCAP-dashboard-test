import { Injectable } from '@angular/core';
import { PusherService } from './pusher.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications = [];

  constructor() { 
    
  }

  newNotification(text, route?){
    let not = {
      text:text,
      type:"success",
      route: route
    }
    this.notifications.push(not)
    setTimeout(()=>{
      //Rimuovi la notifica
      this.closeNotification(not);
    },6000);
  }

  onNotificationClick(not){
    if(not.route){
      this.closeNotification(not);
    }
  }

  closeNotification(not){
    const index = this.notifications.indexOf(not);
    if (index > -1) {
      this.notifications.splice(index, 1);
    }
  }

}
