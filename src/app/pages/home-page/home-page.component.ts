import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { PusherService } from 'src/app/services/pusher.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  displayModal = false;
  constructor(private pusher:PusherService, public gameService:GameService) { }

  ngOnInit(): void {
  }

  reload(){
    this.pusher.triggerLiveViewEvent("reload",{});
  }

  
  showModalDialog() {
    this.displayModal = true;
}
}
