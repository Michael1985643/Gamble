import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Item } from '../pages/item/item';
import { Login } from '../pages/login/login';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

export const firebaseConfig = {
  apiKey: "AIzaSyBX6jLr_Hr0s_5ig3pSYbzU3bhf6Iy0Kxg",
  authDomain: "gamble-69341.firebaseapp.com",
  databaseURL: "https://gamble-69341.firebaseio.com",
  storageBucket: "gamble-69341.appspot.com",
  messagingSenderId: '787051247564'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Item
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Item
  ],
  providers: [
    AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
