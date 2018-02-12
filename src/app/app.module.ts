import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {LandingPage} from '../pages/landing/landing';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Angular Fire Settings
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

//Initialize Firebase
var config = {
    apiKey: "AIzaSyAh-TiKmzDo2VMU1qMhRyGBsHqZABposIE",
    authDomain: "scifi-project.firebaseapp.com",
    databaseURL: "https://scifi-project.firebaseio.com",
    projectId: "scifi-project",
    storageBucket: "",
    messagingSenderId: "546811352844"
  };
  firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    LandingPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
	  AngularFireAuthModule,
	  AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    LandingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider
  ]
})
export class AppModule {}
