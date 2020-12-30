import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { VideoNotesPageComponent } from './pages/video-notes-page/video-notes-page.component';
import { VoiceMessagesPageComponent } from './pages/voice-messages-page/voice-messages-page.component';
import { AuthGuardLoggedService } from './services/auth-guard-logged.service';
import { AuthGuardNotLoggedService } from './services/auth-guard-not-logged.service';


const routes: Routes = [
  { path: '', component:  HomePageComponent, canActivate: [AuthGuardLoggedService, AuthGuardNotLoggedService] },
  { path: 'home', component:  HomePageComponent, canActivate: [AuthGuardLoggedService] },
  { path: 'register', component:  SignupPageComponent, canActivate: [AuthGuardNotLoggedService] },
  { path: 'login', component:  SigninPageComponent, canActivate: [AuthGuardNotLoggedService]},
  { path: 'telegram-messages/videonotes', component:  VideoNotesPageComponent, canActivate: [AuthGuardLoggedService] },
  { path: 'telegram-messages/voice-messages', component: VoiceMessagesPageComponent, canActivate: [AuthGuardLoggedService] },
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuardLoggedService] },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
