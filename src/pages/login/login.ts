import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { HomePage } from '../home/home';

//services
import { UserService } from '../../services/user-service';

//models
import { User } from '../../models/user.model';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  items: FirebaseListObservable<any[]>;
  af;
  constructor(public navCtrl: NavController,af: AngularFire,private _auth: AuthService, public userService: UserService) {
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
     let userObj = this._auth.auth$.getAuth().auth;
     let user = new User(
          userObj.uid, 
          userObj.displayName, 
          userObj.email, 
          userObj.photoURL,
          "test",
          "test"
          )

     this.userService.setUser(user)
        this.navCtrl.push(HomePage);
  }

}
