import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ItemToto } from '../pages/itemToto/itemToto';
import { AddToto } from '../pages/add-toto/add-toto';
import { ItemSpecial } from '../pages/item-special/item-special';
import { AddSpecial } from '../pages/add-special/add-special';
import { Login } from '../pages/login/login';
import { Overview } from '../pages/overview/overview';

import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

import {MomentModule} from 'angular2-moment';
import {Ng2OrderModule} from 'ng2-order-pipe';

//services
import { UserService } from '../services/user-service';
import { TotoService } from '../services/toto-service';
import { SpecialService } from '../services/special-service';
import { GambleBaseService } from './../services/gamble-base-service';

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
    ItemToto,
    ItemSpecial,
    AddToto,
    AddSpecial,
    Overview
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    MomentModule,
    Ng2OrderModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    ItemToto,
    ItemSpecial,
    AddToto,
    AddSpecial,
    Overview
  ],
  providers: [
    AuthService,
    UserService,
    GambleBaseService,
    TotoService,
    SpecialService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
