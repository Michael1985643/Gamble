import { Welcome } from './../welcome/welcome';
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
  constructor(public navCtrl: NavController,private af: AngularFire,private _auth: AuthService, public userService: UserService) {
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
        this.userService.setUser(this._auth.auth$.getAuth()).then(( ) => {
          this.userService.getUser(this._auth.auth$.getAuth().auth.uid).subscribe((appUser ) => {
            this.userService.getSubscription(this._auth.auth$.getAuth().auth.uid).subscribe((subscription ) => {
              appUser.subscription = subscription;
              this.userService.user = appUser;
              if (subscription) {
                this.navCtrl.push(HomePage);
              }
              else {
                this.navCtrl.push(Welcome);
              }
            })
          })
        })
  }

}
