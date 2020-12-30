import { Injectable, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PusherService } from './pusher.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  liveViewToken:string = "FA.eyJhY2NvdW50IjoiMSIsImZyb20iOi0xLCJjaGF0IjoiMCIsImZpcnN0X25hbWUiOiJvQ0FQIiwibGFzdF9uYW1lIjoiIiwidXNlcm5hbWUiOiJMaXZlIFN0cmVhbSJ9.KE";
  controlPanelToken:string = "FA.eyJhY2NvdW50IjoiMSIsImZyb20iOi0xLCJjaGF0IjoiMCIsImZpcnN0X25hbWUiOiJvQ0FQIiwibGFzdF9uYW1lIjoiIiwidXNlcm5hbWUiOiJMaXZlIFN0cmVhbSJ9.KE";
  private currentGame:string;

  public currentPanel: any;
  public panelOpened: boolean;

  constructor(private pusher: PusherService, private sanitizer: DomSanitizer) { }

  get gameRunning():boolean{
    return this.currentGame != undefined;
  }

  startGame(short_name:string){
    if(this.currentGame){return;}
    this.currentGame = short_name;
    this.pusher.triggerLiveViewEvent("start-game",{URL:"https://www.ocap.cloud/dashboard/public/games/"+short_name+"/liveview.html?token=" + this.liveViewToken});
    this.panelOpened = false;
    this.currentPanel = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.ocap.cloud/dashboard/public/games/"+this.currentGame+"/controlpanel.html?token=" + this.controlPanelToken);
  }

  stopGame(){
    this.currentGame = undefined;
    this.pusher.triggerLiveViewEvent("stop-game",{});
    this.currentPanel = undefined;
    this.panelOpened = false;
  }

  openConfigurationPanelExternal(){
    if(this.gameRunning){
        window.open("https://www.ocap.cloud/dashboard/public/games/"+this.currentGame+"/controlpanel.html?token=" + this.controlPanelToken);
    }
  }

  

  openConfigurationPanel(){
    if(this.gameRunning){
      this.panelOpened = true;
    }
  }

  hideConfigurationPanel(){
    if(this.gameRunning){
      this.panelOpened = false;
    }
  }


}
