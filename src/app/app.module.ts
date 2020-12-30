import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideoNoteItemComponent } from './components/video-note-item/video-note-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AudioNoteItemComponent } from './components/audio-note-item/audio-note-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { VideoNotesPageComponent } from './pages/video-notes-page/video-notes-page.component';
import { VoiceMessagesPageComponent } from './pages/voice-messages-page/voice-messages-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TwitchLoginSdkModule } from 'twitch-login-sdk';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { CanvasConnectionVFXComponent } from './canvas-connection-vfx/canvas-connection-vfx.component';
import {CaptchaModule} from 'primeng/captcha';
import { FontAwesomeModule, FaIconLibrary  } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    VideoNoteItemComponent,
    AudioNoteItemComponent,
    SignupPageComponent,
    SigninPageComponent,
    ProfilePageComponent,
    VideoNotesPageComponent,
    VoiceMessagesPageComponent,
    HomePageComponent,
    CanvasConnectionVFXComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    DialogModule,
    FontAwesomeModule,
    TwitchLoginSdkModule.forRoot({ 
      twitchId:  environment.twitchAppID,
      redirect:  environment.twitchRedirectURL
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ButtonModule,
    InputTextModule,
    CaptchaModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    this.closeAppLoadingSpinner();
  }

  closeAppLoadingSpinner(){
    console.log("LOADED");
    let element:any = document.getElementsByClassName("app-loading")[0];
    element.classList.add("app-loaded");
  }
 }
