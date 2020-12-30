import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TelegramBotService } from 'src/app/services/telegram-bot.service';
import { environment } from 'src/environments/environment';

// User interface
export class User {
  name: String;
  email: String;
  twitch:any;
}

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  UserProfile: User;

  bot_connected = false;
  token = "";


  liveview;

  constructor(
    public authService: AuthService,
    public telegram: TelegramBotService
  ) {
    this.authService.profileUser().subscribe((data:any) => {
      this.UserProfile = data;
    })

    telegram.onReady(()=>{
      this.bot_connected = telegram.connected;
      if(telegram.connected){
        this.token = telegram.bot.token
      }
    });
  }

  ngOnInit() { }

  updateToken(){
    this.authService.updateBotToken(this.telegram.bot, this.token).toPromise().then((result)=>{
      console.log(result);
    },(error)=>{
      console.error(error);
    })
  }

  updateLiveView(){
    this.authService.updateLiveViewURL().toPromise().then((result:any)=>{
      let urlTemplate = environment.apiEndPoint + "/live-view?user={{USER}}&token={{TOKEN}}";
      urlTemplate = urlTemplate.replace("{{TOKEN}}", result.liveview_token);
      urlTemplate = urlTemplate.replace("{{USER}}", result.id);
      this.liveview = urlTemplate;
    },(error)=>{
      console.error(error);
    })
  }
}
