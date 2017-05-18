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
  af;
  constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService) {
    this.af = af;
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
     this.af.database.list('/items');
     this.navCtrl.push(HomePage);
     const userObj = this._auth.auth$.getAuth().auth;
     const user = {
       email :  userObj.email,
       displayName : userObj.displayName,
       photoURL: userObj.photoURL,
       uid: userObj.uid
     }
     const setUser = this.af.database.object('users/' + userObj.uid + '/');
     setUser.set(user);


  }

}
