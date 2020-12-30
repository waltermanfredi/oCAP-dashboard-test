import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private issuer = {
    login: environment.apiEndPoint + '/api/auth/login',
    register: environment.apiEndPoint + '/api/auth/register'
  }

  

  constructor() { window["token"]=this;}

  handleData(token){
    localStorage.setItem('auth_token', token);
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken(){
     const token = this.getToken();

     if(token){
       const payload = this.payload(token);
       if(payload){
         /*if (Object.values(this.issuer).indexOf(payload.iss) > -1){
           //Provo il token prelevando le informazioni

           return true;
         }else{
           return false;
         }*/
         return true;
        

       }
     } else {
        return false;
     }
  }

  payload(token) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken(){
    localStorage.removeItem('auth_token');
  }
}
