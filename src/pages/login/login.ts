import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { HomePage } from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  items: FirebaseListObservable<any[]>;
  
  constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {
    //this.items = af.database.list('/items');
  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  signInWithGoogle(): void {
    this._auth.signInWithGoogle()
      .then(() => this.onSignInSuccess());
  }

  signOut(): void {
    this._auth.signOut()
  }

  private onSignInSuccess(): void {
    console.log("Display name ",this._auth.displayName());
     this.navCtrl.push(HomePage);
  }

}
