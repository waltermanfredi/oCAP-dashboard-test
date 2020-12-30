import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthStateService } from './services/auth-state.service';
import { NotificationService } from './services/notification.service';
import { PusherService } from './services/pusher.service';
import { TokenService } from './services/token.service';
import { TwitchChatService } from './services/twitch-chat.service';
import { VideoNoteService } from './services/video-note.service';
import { VoiceService } from './services/voice.service';
import { PrimeNGConfig } from 'primeng/api';

import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { AuthService, User } from './services/auth.service';
import { GameService } from './services/game.service';
import { TelegramBotService } from './services/telegram-bot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  UserProfile:User;

  title = 'ocap-live-dashboard';

  logged:boolean;

  faTemperatureLow = faTemperatureLow;

  topMenuClosed:boolean = false;
  @ViewChild('scrollableContainer',{static: false}) scrollableContainer;

  pages = {
    "home":{
      title:"Home",
      submenus:[]
    },
    "profile":{
      title:"Profilo",
      submenus:[{title:"Profilo", route:"/profile"}, {title:"Collegamenti", route:"/"},{title:"Abbonamento", route:"/"}]
    },
    "telegram-messages":{
      title:"Messaggi Telegram",
      submenus:[{title:"Tutti", route:"/telegram-messages"}, {title:"Audio", route:"/telegram-messages/voice-messages"},{title:"Video Note", route:"/telegram-messages/videonotes"}]
    }
  };

  menu:[];
  smallScreen: boolean;
  menuOpened = false;
  

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public notificationService: NotificationService,
    public twitchChat: TwitchChatService,
    private primengConfig: PrimeNGConfig,
    public authService: AuthService,
    public gameService: GameService,
    public pusherService: PusherService,
    public telegramService: TelegramBotService
  ){
 
    
    


    this.smallScreen = window.innerWidth < 768;
    window["angular_app"] = this;
    router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
            this.menuOpened = false;
        }
    });
  }

  ngAfterViewInit(): void {
    
    this.scrollableContainer.nativeElement.addEventListener("scroll", (event)=>{
      this.topMenuClosed = this.scrollableContainer.nativeElement.scrollTop > 50;
    });
    window.onresize = ()=>{
     this.smallScreen = window.innerWidth < 768;
    }
    this.primengConfig.ripple = true;
    this.auth.userAuthState.subscribe(val => {
        this.logged = val;


        if(this.logged){
          this.authService.profileUser().subscribe((data:any) => {
            this.UserProfile = data;
          });
          this.pusherService.init();
          this.telegramService.init();
        }

        setTimeout(()=>{
          let elements = document.getElementsByClassName("noanimation");
          for(let i=0;i<elements.length;i++){
            let element = elements[i];
            element.classList.remove("noanimation");
          };
        },1000);
    });

    
  }

  ngOnInit() {
    
  }



  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['login']);
    this.telegramService.destroy();
    this.pusherService.destroy();
    this.UserProfile = null;
  }

  test(panel:HTMLElement){
    panel.classList.toggle("left");
    panel.classList.toggle("right");
    if(panel.classList.contains("left")){
      this.router.navigate(['register']);
    }else{
      this.router.navigate(['login']);
    }
    
    console.log(panel);
  }
}
