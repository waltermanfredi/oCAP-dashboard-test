import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export class User {
  name: String;
  email: String;
  password: String;
  password_confirmation: String
}

export class TwitchUser {
  login: String;
  email: String;
  token: String;
  id: String
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = environment.apiEndPoint + "/api/";

  public user;

  constructor(private http: HttpClient) { 
    window["auth"] = this;
  }

   // User registration
  register(user: User): Observable<any> {
    return this.http.post(this.baseURL + 'auth/register', user);
  }

  registerTwitch(user: TwitchUser): Observable<any> {
    return this.http.post(this.baseURL + 'auth/register-twitch', user);
  }

  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.baseURL + 'auth/login', user);
  }

  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(this.baseURL + 'auth/user-profile');
  }

  getBot(): Observable<any> {
    return this.http.get(this.baseURL + 'telegram-bot');
  }

  getMessagesBot(bot, filters = {}): Observable<any> {
    return this.http.get(this.baseURL + 'messages/' + bot.id, {
      params: filters
    });
  }

  updateBotToken(bot, token){
    return this.http.post(this.baseURL + 'telegram-bot', {
      token:token,
      bot:bot
    });
  }


  updateLiveViewURL(){
    return this.http.post(this.baseURL + 'liveview',{});
  }

}
